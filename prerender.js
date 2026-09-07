// Injects the server-rendered markup into dist/index.html after the build.
//
// Without this the page served six words of text: a title, a description, and
// an empty root div. Search engines that index HTML rather than executing
// JavaScript had nothing to read, which matches what the analytics showed:
// visits from DuckDuckGo and Bing, never from Google, over six months.
import { readFileSync, writeFileSync } from 'node:fs'
import { render } from './dist-ssr/entry-server.js'

const file = 'dist/index.html'
const marker = '<div id="root"></div>'
const template = readFileSync(file, 'utf8')

if (!template.includes(marker)) {
  console.error(`prerender: ${marker} not found in ${file}, refusing to write`)
  process.exit(1)
}

const markup = render()
writeFileSync(file, template.replace(marker, `<div id="root">${markup}</div>`))
console.log(`prerender: injected ${markup.length} characters of markup`)
