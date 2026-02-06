import { execSync } from 'node:child_process'

const major = Number.parseInt(process.versions.node.split('.')[0] || '0', 10)

// Cloudflare Pages 当前默认使用 Node 18，pagefind 的 CLI 依赖的 meow@14
// 要求 Node >= 20。为避免生产构建失败，这里在 Cloudflare 环境
//（或 Node 版本 < 20）下跳过 pagefind 构建，只影响站内搜索功能。
if (process.env.CF_PAGES === '1' || major < 20) {
  console.log(
    '[pagefind] Skip indexing on Cloudflare Pages / Node < 20 (search disabled for this build).',
  )
  process.exit(0)
}

try {
  execSync('pagefind --site dist && del-cli "dist/pagefind/*ui*"', {
    stdio: 'inherit',
    shell: true,
  })
} catch (error) {
  console.error('[pagefind] Indexing failed.')
  process.exit(1)
}

