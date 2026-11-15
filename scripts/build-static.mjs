import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const payloadDir = path.resolve('src/app/(payload)')
const tempDir = path.resolve('src/app/_payload_temp')

console.log('==> Populando banco SQLite de dev com notícias e dados institucionais...')
execSync('npm run seed', { stdio: 'inherit' })

let moved = false
try {
  if (fs.existsSync(payloadDir)) {
    fs.renameSync(payloadDir, tempDir)
    moved = true
  }

  console.log('==> Gerando build estático (output: export)...')
  execSync('next build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      NEXT_STATIC_EXPORT: 'true',
    },
  })

  const outDir = path.resolve('out')
  if (fs.existsSync(outDir)) {
    fs.writeFileSync(path.join(outDir, '.nojekyll'), '')
    console.log('==> Arquivo out/.nojekyll gerado com sucesso.')
  }
} finally {
  if (moved && fs.existsSync(tempDir)) {
    fs.renameSync(tempDir, payloadDir)
    console.log('==> Rotas de desenvolvimento de (payload) restauradas.')
  }
}
