import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import astroExpressiveCode from 'astro-expressive-code'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'

import { rehypePlugins, remarkPlugins } from './plugins'
import { SITE } from './src/config'

// eslint-disable-next-line node/prefer-global/process
const isCloudflarePages = process.env.CF_PAGES === '1'

const integrations = [
  robotsTxt(),
  unocss({
    // https://unocss.dev/integrations/astro#style-reset
    injectReset: true,
  }),
  astroExpressiveCode(),
  mdx(),
]

// `@astrojs/sitemap` 在 Cloudflare Pages 上目前会因为 `_routes` 未初始化而报
// “Cannot read properties of undefined (reading 'reduce')”，
// 这里在 CF Pages 构建时临时禁用 sitemap，避免构建失败。
if (!isCloudflarePages) {
  integrations.unshift(
    sitemap(),
  )
}

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: SITE.website,
  base: SITE.base,
  integrations,
  markdown: {
    syntaxHighlight: false,
    remarkPlugins,
    rehypePlugins,
  },
  devToolbar: {
    enabled: false,
  },
  experimental: {
    contentLayer: true,
    contentIntellisense: true,
    directRenderScript: true,
  },
  vite: {
    build: { chunkSizeWarningLimit: 1200 },
  },
})
