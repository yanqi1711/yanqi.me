import type { Features, Site, Ui } from './types'

export const SITE: Site = {
  website: 'https://yanqi.me/',
  base: '/',
  title: 'Yan Qi',
  description:
    'My Personal Website',
  author: 'Yan Qi',
  lang: 'en',
  ogLocale: 'en_US',
}

export const UI: Ui = {
  internalNavs: [
    {
      path: '/blog',
      title: 'Blog',
      displayMode: 'alwaysText',
      text: 'Blog',
      // icon: 'i-ri-article-line',
    },
    {
      path: '/projects',
      title: 'Projects',
      displayMode: 'alwaysText',
      text: 'Projects',
      // icon: 'i-ri-lightbulb-line',
    },
    {
      path: '/changelog',
      title: 'Changelog',
      displayMode: 'iconToTextOnMobile',
      text: 'Changelog',
      icon: 'i-ri-draft-line',
    },
  ],
  socialLinks: [
    {
      link: 'https://github.com/yanqi1711',
      title: 'YanQi on Github',
      displayMode: 'alwaysIcon',
      icon: 'i-uil-github-alt',
    },
    {
      link: 'https://x.com/yanqi1713',
      title: `${SITE.author} on Twitter`,
      displayMode: 'alwaysIcon',
      icon: 'i-ri-twitter-x-fill',
    },
    {
      link: 'https://pan.yanqi.me',
      title: `Network disk`,
      displayMode: 'alwaysIcon',
      icon: 'i-material-symbols:cloud',
    },
  ],
  navBarLayout: {
    left: [],
    right: [
      'internalNavs',
      'socialLinks',
      // 'searchButton',
      'themeButton',
      'rssLink',
    ],
    mergeOnMobile: true,
  },
  tabbedLayoutTabs: [
    { title: 'Changelog', path: '/changelog' },
    // { title: 'AstroStreams', path: '/streams' },
  ],
  groupView: {
    maxGroupColumns: 3,
    showGroupItemColorOnHover: true,
  },
  githubView: {
    monorepos: [
      'withastro/astro',
      'withastro/starlight',
      'lin-stephanie/astro-loaders',
    ],
    mainLogoOverrides: [
      [/starlight/, 'https://starlight.astro.build/favicon.svg'],
    ],
    subLogoMatches: [
      [/theme/, 'i-unjs-theme-colors'],
      [/github/, 'https://github.githubassets.com/favicons/favicon.svg'],
      [/tweet/, 'i-logos-twitter'],
      [/bluesky/, 'i-logos-bluesky'],
    ],
  },
  externalLink: {
    newTab: false,
    cursorType: '',
    showNewTabIcon: false,
  },

  maxGroupColumns: 3,
  showGroupItemColorOnHover: true,
  postMetaStyle: 'minimal',
}

/**
 * Configures whether to enable special features:
 *  - Set to `false` or `[false, {...}]` to disable the feature.
 *  - Set to `[true, {...}]` to enable and configure the feature.
 */
export const FEATURES: Features = {
  share: [
    true,
    {
      twitter: [true, '@ste7lin'],
      mastodon: [true, '@ste7lin@fairy.id'],
      facebook: false,
      pinterest: false,
      reddit: false,
      telegram: false,
      whatsapp: false,
      email: false,
    },
  ],
  toc: [
    true,
    {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
      displayPosition: 'left',
      displayMode: 'hover',
    },
  ],
  ogImage: [
    true,
    {
      authorOrBrand: `${SITE.title}`,
      fallbackTitle: `${SITE.description}`,
      fallbackBgType: 'plum',
    },
  ],
}
