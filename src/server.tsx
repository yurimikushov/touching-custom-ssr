import express from 'express'
import { renderToString } from 'react-dom/server'
import fs from 'fs'
import path from 'path'
import App from './App'

const DEFAULT_PORT = 3_000
const PORT = process.env.PORT ?? DEFAULT_PORT

const app = express()

app.use('/static', express.static(path.join(__dirname, 'static')))

app.get('*', (req, res) => {
  const content = renderToString(<App />)

  const template = fs
    .readFileSync(path.join(__dirname, 'static', 'index.html'), 'utf8')
    .toString()
    .replace('<div id="root"></div>', `<div id="root">${content}</div>`)

  res.setHeader('Content-Type', 'text/html')
  res.end(template)
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
