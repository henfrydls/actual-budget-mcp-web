import { useState, useEffect, useRef } from 'react'

interface Message {
  role: 'user' | 'claude'
  content: string
  isTable?: boolean
}

const conversation: Message[] = [
  {
    role: 'user',
    content: 'Based on my spending so far, will I end up over or under budget this month?',
  },
  {
    role: 'claude',
    isTable: true,
    content: `Category      Budget    Spent    Projected   Status
────────────  ────────  ───────  ─────────   ──────
Groceries     $600      $412     $578        ✓ On track
Dining Out    $200      $187     $262        ✗ Over by $62
Transport     $150      $89      $125        ✓ Under
Shopping      $300      $245     $343        ✗ Over by $43
─────────────────────────────────────────────────────
Overall       $1,250    $933     $1,308      ⚠ $58 over`,
  },
  { role: 'user', content: 'Move $60 from Transport to Dining Out' },
  {
    role: 'claude',
    content:
      '✓ Done. Transport: $150 → $90. Dining Out: $200 → $260. Your projected overage drops from $58 to $2.',
  },
  { role: 'user', content: 'What day of the week do I spend the most?' },
  {
    role: 'claude',
    content:
      'Saturdays, averaging $127/week vs $45 on weekdays. Most of it is Dining Out and Shopping. Last 3 months show the same pattern.',
  },
]

const staticContent = conversation
  .map((msg) => (msg.role === 'user' ? `> ${msg.content}` : msg.content))
  .join('\n\n')

export function TypingTerminal() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const [paused, setPaused] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (paused) return

    if (visibleMessages >= conversation.length) {
      const t = setTimeout(() => {
        setVisibleMessages(0)
        setCurrentText('')
        setIsTyping(true)
      }, 4000)
      return () => clearTimeout(t)
    }

    const msg = conversation[visibleMessages]
    const fullText = msg.content

    if (msg.role === 'user') {
      let i = 0
      setCurrentText('')
      setIsTyping(true)
      const interval = setInterval(() => {
        i++
        setCurrentText(fullText.slice(0, i))
        if (i >= fullText.length) {
          clearInterval(interval)
          setTimeout(() => {
            setVisibleMessages((v) => v + 1)
            setCurrentText('')
          }, 700)
        }
      }, 30)
      return () => clearInterval(interval)
    } else {
      // Claude: type progressively, faster than user
      let i = 0
      setIsTyping(false)
      setCurrentText('')
      let intervalId: number | null = null
      let advanceId: number | null = null

      const startId = window.setTimeout(() => {
        intervalId = window.setInterval(() => {
          i += 3
          if (i >= fullText.length) {
            setCurrentText(fullText)
            if (intervalId) window.clearInterval(intervalId)
            advanceId = window.setTimeout(() => {
              setVisibleMessages((v) => v + 1)
              setCurrentText('')
            }, 1500)
          } else {
            setCurrentText(fullText.slice(0, i))
          }
        }, 10)
      }, 500)

      return () => {
        window.clearTimeout(startId)
        if (intervalId) window.clearInterval(intervalId)
        if (advanceId) window.clearTimeout(advanceId)
      }
    }
  }, [visibleMessages, paused])

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 530)
    const onVis = () => { if (document.hidden) clearInterval(interval) }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [currentText, visibleMessages])

  const completedMessages = conversation.slice(0, visibleMessages)
  const currentMessage =
    visibleMessages < conversation.length ? conversation[visibleMessages] : null

  const renderMessage = (msg: Message, text: string, typing: boolean) => {
    if (msg.role === 'user') {
      return (
        <div className="flex gap-2.5">
          <span className="font-mono text-xs text-emerald-500/60 mt-0.5 shrink-0 select-none">{'>'}</span>
          <span className="font-mono text-[12px] sm:text-[13px] text-[#a1a1a8] leading-relaxed">
            {text}
            {typing && (
              <span className="ml-0.5 text-emerald-400" style={{ opacity: showCursor ? 1 : 0 }}>▎</span>
            )}
          </span>
        </div>
      )
    }
    return (
      <div className="ml-5 animate-fade-in-up">
        {msg.isTable ? (
          <pre className="font-mono text-[11px] leading-[1.7] whitespace-pre overflow-x-auto">
            {text.split('\n').map((line, i) => {
              const isWarning = line.includes('✗') || line.includes('Over')
              const isAlert = line.includes('⚠')
              const isGood = line.includes('✓')
              const isSeparator = line.startsWith('──')
              const color = isAlert
                ? 'text-amber-400/90'
                : isWarning
                ? 'text-amber-400/60'
                : isGood
                ? 'text-emerald-400/80'
                : isSeparator
                ? 'text-emerald-400/30'
                : 'text-emerald-400/60'
              return (
                <span key={i} className={color}>
                  {line}
                  {'\n'}
                </span>
              )
            })}
          </pre>
        ) : (
          <p className="font-mono text-[12px] sm:text-[13px] text-[#7e7e85] leading-relaxed">{text}</p>
        )}
      </div>
    )
  }

  return (
    <div className="w-full max-w-[780px] mx-auto">
      {/* Screen reader version */}
      <div className="sr-only"><pre>{staticContent}</pre></div>

      <div className="terminal-container rounded-xl border border-white/[0.09] bg-[#141417] overflow-hidden relative" aria-hidden="true">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.09] bg-[#111114]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.15]" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.15]" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.15]" />
          </div>
          <span className="font-mono text-[11px] text-[#5a5a62] ml-2">claude · actual-budget-mcp</span>
        </div>

        {/* Content */}
        <div ref={terminalRef} className="p-5 space-y-4 h-[360px] overflow-y-auto">
          {completedMessages.map((msg, i) => (
            <div key={i}>{renderMessage(msg, msg.content, false)}</div>
          ))}

          {currentMessage && currentText && (
            <div>{renderMessage(currentMessage, currentText, isTyping)}</div>
          )}

          {!currentMessage && !currentText && visibleMessages === 0 && (
            <div className="flex gap-2.5">
              <span className="font-mono text-xs text-emerald-500/60 mt-0.5 select-none">{'>'}</span>
              <span className="font-mono text-[13px] text-emerald-400" style={{ opacity: showCursor ? 1 : 0 }}>▎</span>
            </div>
          )}
        </div>

        {/* Pause/Play */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => {
              if (paused) {
                setPaused(false)
              } else {
                setPaused(true)
              }
            }}
            className="font-mono text-[10px] text-[#5a5a62] hover:text-[#a1a1a8] transition-colors duration-200 cursor-pointer bg-[#111114] border border-white/[0.09] rounded px-2.5 py-1 hover:border-white/[0.15]"
            aria-label={paused ? 'Play terminal animation' : 'Pause terminal animation'}
          >
            {paused ? '▶' : '⏸'}
          </button>
        </div>
      </div>
    </div>
  )
}
