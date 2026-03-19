# actual-budget-mcp-web

Landing page for [actual-budget-mcp](https://github.com/henfrydls/actual-budget-mcp), the MCP server that lets you manage your Actual Budget through natural conversation with Claude.

## What's in the page

- Animated terminal demo showing real budget queries, projections, and transactions
- "How it works" walkthrough with architecture diagram
- Tool breakdown: 18 tools across Read, Analyze, and Write categories
- One-click install command copy
- Dark minimal design, WCAG accessible, responsive

## Stack

| Tool | Version |
|------|---------|
| React | 19 |
| TypeScript | 5.x |
| Tailwind CSS | 4 |
| Vite | 8 |

Fonts: IBM Plex Sans + JetBrains Mono via Google Fonts.

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
```

The dev server runs at `http://localhost:5173`. Production output goes to `dist/`.

## Docker

```bash
# Build image
docker build -t actual-budget-mcp-web .

# Run on port 8080
docker run -p 8080:80 actual-budget-mcp-web
```

The image uses a multi-stage build (Node for build, nginx:alpine for serving). Final image is ~25MB.

## Project structure

```
src/
  App.tsx                   # Main page layout and sections
  index.css                 # Global styles, animations, CSS variables
  main.tsx                  # Entry point
  components/
    TypingTerminal.tsx      # Animated terminal with typing effect
    CopyCommand.tsx         # Click-to-copy install command
    Section.tsx             # Scroll-reveal section wrapper
    Icons.tsx               # Inline SVG icons
  hooks/
    useReveal.ts            # IntersectionObserver scroll animation
public/
  favicon.svg               # SVG favicon
```

## CI

GitHub Actions runs automatically on every push to `main` and on pull requests:

- **Build check** - verifies the project compiles without errors
- **Meta tag validation** - confirms title, description, and Open Graph tags are present
- **Lighthouse audit** - scores performance (>70), accessibility (>85), best practices (>80), and SEO (>80)

## Design decisions

- **Dark theme** (#0d0d10 background) with a 4-level text hierarchy for contrast
- **Terminal as hero** instead of static screenshots, showing real budget interactions
- **No external JS dependencies** beyond React and Tailwind
- **Amber accent** for over-budget warnings in the terminal table, green for on-track
- **Pause button** on the terminal animation for WCAG 2.2.2 compliance
- **Skip navigation** link and semantic landmarks for screen reader support

## Related

- [actual-budget-mcp](https://github.com/henfrydls/actual-budget-mcp) - The MCP server this page promotes
- [Actual Budget](https://actualbudget.org/) - The open-source budgeting app

## License

MIT - [DLSLabs](https://github.com/henfrydls)
