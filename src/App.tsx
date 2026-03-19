import { TypingTerminal } from './components/TypingTerminal'
import { Section } from './components/Section'
import { CopyCommand } from './components/CopyCommand'
import { GithubIcon, ArrowRightIcon, ShieldIcon } from './components/Icons'

const prompts = [
  'Will my budget last this month?',
  'Spent $50 at Walmart today',
  'Which category is killing me?',
  'Move $200 from Checking to Savings',
  'Spending trends for the last 6 months',
  'Budget vs actual this month',
]

const categories = [
  {
    name: 'Read',
    count: 7,
    tools: 'accounts · budget · transactions · categories · payees · balances · summary',
  },
  {
    name: 'Analyze',
    count: 4,
    tools: 'budget vs actual · projections · trends · spending breakdown',
  },
  {
    name: 'Write',
    count: 7,
    tools: 'create · update · delete · transfer · budget amounts · recategorize · bank sync',
  },
]

const differentiators = [
  'Works in any language - "last month", "este mes", "il mese scorso"',
  'Natural language dates - no date pickers, just say when',
  'Say names, not IDs - "Checking" or "Groceries", not UUIDs',
  'Formatted tables, not raw JSON',
  'Built on @actual-app/api 26.x',
]

function App() {
  return (
    <div className="min-h-screen bg-[#0d0d10] text-[#f4f4f6]">
      {/* Skip nav for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-[#141417] focus:text-[#f4f4f6] focus:px-4 focus:py-2 focus:rounded focus:outline focus:outline-2 focus:outline-emerald-500"
      >
        Skip to main content
      </a>

      {/* Nav */}
      <header>
        <nav className="fixed top-0 w-full z-50 bg-[#0d0d10]/80 backdrop-blur-md border-b border-white/[0.09]">
          <div className="max-w-[680px] mx-auto px-6 h-12 flex items-center justify-between">
            <span className="font-mono text-sm text-[#a1a1a8] font-medium truncate max-w-[200px]">
              actual-budget-mcp
            </span>
            <div className="flex items-center gap-5">
              <a
                href="https://github.com/henfrydls/actual-budget-mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#7e7e85] hover:text-[#a1a1a8] transition-colors duration-200 cursor-pointer min-h-[44px]"
                aria-label="View on GitHub (opens in new tab)"
              >
                <GithubIcon className="w-4 h-4" />
                <span className="font-mono text-xs hidden sm:inline">GitHub</span>
              </a>
              <a
                href="https://www.npmjs.com/package/actual-budget-mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#7e7e85] hover:text-[#a1a1a8] transition-colors duration-200 cursor-pointer min-h-[44px] flex items-center"
                aria-label="View on npm (opens in new tab)"
              >
                npm
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main id="main-content">
        {/* Hero */}
        <section className="min-h-[calc(100vh-3rem)] flex flex-col items-center justify-center px-6 pt-14">
          <div className="max-w-[680px] w-full">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center mb-3 leading-[1.1]">
              Ask your budget anything.
            </h1>
            <p className="text-center text-[#a1a1a8] text-lg mb-10 max-w-md mx-auto">
              Connect Claude to your Actual Budget. Ask questions. Get real answers from your real data.
            </p>

            <TypingTerminal />

            {/* Trust line */}
            <div className="flex items-center justify-center gap-2 mt-8 text-[#7e7e85] text-sm">
              <ShieldIcon className="w-3.5 h-3.5" />
              <span>Runs locally. Your financial data never leaves your machine.</span>
            </div>

            {/* Install */}
            <div className="mt-6 max-w-xl mx-auto">
              <CopyCommand command="claude mcp add actual-budget -- npx -y actual-budget-mcp" />
            </div>
          </div>
        </section>

        {/* How it works -MOVED UP before Just Ask */}
        <Section className="pt-16 sm:pt-20 pb-8">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-10">
            How it works.
          </h2>
          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Install in one command',
                desc: 'One line. No config files, no cloud accounts, no API keys to manage.',
              },
              {
                step: '02',
                title: 'Point it at your Actual Budget',
                desc: 'Set your server URL and password. Your data stays on your machine. Nothing is sent anywhere.',
              },
              {
                step: '03',
                title: 'Ask Claude anything about your finances',
                desc: 'Query accounts, analyze trends, create transactions, reallocate budgets, without leaving the conversation.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <span className="font-mono text-xs text-emerald-500/50 mt-1 shrink-0">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-[#a1a1a8] font-medium mb-1">{item.title}</h3>
                  <p className="text-[#7e7e85] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Architecture diagram -responsive */}
          <div
            className="mt-14 font-mono text-xs text-center"
            role="img"
            aria-label="Architecture: Claude connects to actual-budget-mcp, which connects to your local Actual Budget instance. All connections are local."
          >
            <div className="flex flex-col items-center gap-2 sm:inline-flex sm:flex-row sm:gap-3 text-[#7e7e85]">
              <span className="border border-white/[0.09] rounded px-3 py-1.5 bg-[#141417]">
                Claude
              </span>
              <span className="text-emerald-500/50 hidden sm:inline">———</span>
              <span className="text-emerald-500/50 sm:hidden">↓</span>
              <span className="border border-emerald-500/25 rounded px-3 py-1.5 bg-emerald-500/[0.06] text-emerald-400/70">
                actual-budget-mcp
              </span>
              <span className="text-emerald-500/50 hidden sm:inline">———</span>
              <span className="text-emerald-500/50 sm:hidden">↓</span>
              <span className="border border-white/[0.09] rounded px-3 py-1.5 bg-[#141417]">
                Actual Budget
              </span>
            </div>
            <p className="text-[#5a5a62] mt-3">Local connection only. No cloud. No intermediaries.</p>
          </div>
        </Section>

        {/* Just Ask -NOW after How it works */}
        <Section className="pt-10 sm:pt-14 pb-8">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-10">Just ask.</h2>
          <div className="flex flex-wrap gap-2.5">
            {prompts.map((prompt) => (
              <div
                key={prompt}
                className="flex items-center gap-2.5 font-mono text-sm text-[#7e7e85] bg-[#141417] border border-white/[0.09] rounded-full px-4 py-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 shrink-0" />
                {prompt}
              </div>
            ))}
          </div>
          <p className="mt-8 text-[#7e7e85] text-sm leading-relaxed max-w-lg">
            Because "am I overspending on food?" shouldn't require three filters and a custom date range to answer.
          </p>
        </Section>

        {/* Capabilities */}
        <Section className="pt-10 sm:pt-14 pb-8">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
            Read, analyze, and edit.
          </h2>
          <p className="text-[#7e7e85] mb-10 text-sm">
            18 tools across 3 categories. Everything you need without leaving the conversation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-14">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="border border-white/[0.09] rounded-lg p-5 bg-[#141417]"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="font-mono text-sm font-medium text-[#a1a1a8]">{cat.name}</span>
                  <span className="font-mono text-[11px] bg-emerald-500/10 text-emerald-400/80 px-1.5 py-0.5 rounded">
                    {cat.count}
                  </span>
                </div>
                <p className="font-mono text-[11px] text-[#7e7e85] leading-relaxed">{cat.tools}</p>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-medium text-[#a1a1a8] mb-4">What makes it different</h3>
          <div className="space-y-2.5">
            {differentiators.map((d) => (
              <div key={d} className="flex items-start gap-3">
                <span className="w-1 h-1 rounded-full bg-emerald-500/50 shrink-0 mt-2" />
                <span className="text-sm text-[#7e7e85] leading-relaxed">{d}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Install */}
        <Section className="pt-10 sm:pt-14 pb-8">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
            Get started in 10 seconds.
          </h2>

          {/* Prereqs as checklist -MOVED from hero */}
          <div className="mb-6 space-y-1.5">
            <p className="text-[#7e7e85] text-sm font-mono flex items-center gap-2">
              <span className="text-emerald-500/60">✓</span> Actual Budget running with the server enabled
            </p>
            <p className="text-[#7e7e85] text-sm font-mono flex items-center gap-2">
              <span className="text-emerald-500/60">✓</span> Claude Code installed
            </p>
          </div>

          <div className="space-y-3">
            <CopyCommand
              label="Claude Code"
              command="claude mcp add actual-budget -- npx -y actual-budget-mcp"
            />
            <CopyCommand
              label="npx"
              command="npx -y actual-budget-mcp"
            />
          </div>

          <p className="text-[#5a5a62] text-xs font-mono mt-4">
            Then set ACTUAL_SERVER_URL and ACTUAL_PASSWORD as environment variables.
          </p>

          <div className="flex gap-6 mt-8">
            <a
              href="https://github.com/henfrydls/actual-budget-mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-sm text-[#7e7e85] hover:text-[#a1a1a8] transition-colors duration-200 cursor-pointer min-h-[44px]"
              aria-label="View on GitHub (opens in new tab)"
            >
              GitHub <ArrowRightIcon />
            </a>
            <a
              href="https://www.npmjs.com/package/actual-budget-mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-sm text-[#7e7e85] hover:text-[#a1a1a8] transition-colors duration-200 cursor-pointer min-h-[44px]"
              aria-label="View on npm (opens in new tab)"
            >
              npm <ArrowRightIcon />
            </a>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="max-w-[680px] mx-auto px-6 py-12 border-t border-white/[0.09]">
        <p className="font-mono text-xs text-[#5a5a62]">
          Published by{' '}
          <span className="text-[#7e7e85]">DLSLabs</span>
          {' · '}
          Created by{' '}
          <a
            href="https://github.com/henfrydls"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7e7e85] hover:text-[#a1a1a8] transition-colors duration-200 cursor-pointer"
            aria-label="henfrydls on GitHub (opens in new tab)"
          >
            @henfrydls
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
