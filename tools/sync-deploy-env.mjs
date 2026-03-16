import { chmodSync, copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentFile = fileURLToPath(import.meta.url)
const rootDir = dirname(dirname(currentFile))
const deployDir = join(rootDir, 'deploy')

const aliases = new Map([
  ['dev', 'dev'],
  ['development', 'dev'],
  ['test', 'test'],
  ['testing', 'test'],
  ['prod', 'prod'],
  ['production', 'prod']
])

const requestedEnv = (
  process.env.OMNI_ENV ||
  process.env.APP_ENV ||
  process.env.NODE_ENV ||
  'dev'
).trim().toLowerCase()

const resolvedEnv = aliases.get(requestedEnv)

if (!resolvedEnv) {
  console.error(
    `[env:sync] Unsupported environment "${requestedEnv}". Use dev, test, or prod via OMNI_ENV, APP_ENV, or NODE_ENV.`
  )
  process.exit(1)
}

const sourceFile = join(deployDir, `.env.${resolvedEnv}`)
const targetFile = join(deployDir, '.env')

if (!existsSync(sourceFile)) {
  console.error(`[env:sync] Missing source file: ${sourceFile}`)
  process.exit(1)
}

copyFileSync(sourceFile, targetFile)

for (const dir of ['data', 'postgres_data', 'redis_data']) {
  mkdirSync(join(deployDir, dir), { recursive: true })
}

try {
  chmodSync(targetFile, 0o600)
} catch {
  // Ignore chmod failures on platforms that do not support POSIX permissions.
}

console.log(`[env:sync] ${sourceFile} -> ${targetFile}`)
