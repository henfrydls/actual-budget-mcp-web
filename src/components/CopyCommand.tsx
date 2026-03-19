import { useState } from 'react'
import { CopyIcon, CheckIcon } from './Icons'

interface CopyCommandProps {
  command: string
  label?: string
}

export function CopyCommand({ command, label }: CopyCommandProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="group w-full font-mono text-sm bg-[#141417] border border-white/[0.09] rounded-lg px-5 py-3 flex items-center gap-3 cursor-pointer hover:border-white/[0.15] transition-colors duration-200 text-left"
      aria-label={`Copy command: ${command}`}
    >
      {label && (
        <span className="text-[#5a5a62] text-xs shrink-0">{label}</span>
      )}
      <span className="text-[#5a5a62] shrink-0">$</span>
      <span className="text-[#a1a1a8] flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{command}</span>
      <span className="text-[#5a5a62] group-hover:text-[#7e7e85] transition-colors duration-200 shrink-0">
        {copied ? (
          <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <CopyIcon />
        )}
      </span>
    </button>
  )
}
