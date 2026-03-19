# actual-budget-mcp-web

Landing page for [actual-budget-mcp](https://github.com/henfrydls/actual-budget-mcp).

## Stack

- React + TypeScript
- Tailwind CSS v4
- Vite

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Docker

```bash
docker build -t actual-budget-mcp-web .
docker run -p 8080:80 actual-budget-mcp-web
```

## CI

GitHub Actions runs on every push to `main`:

- Build verification
- HTML/meta tag validation
- Lighthouse audit (performance, accessibility, SEO, best practices)

## License

MIT - DLSLabs
