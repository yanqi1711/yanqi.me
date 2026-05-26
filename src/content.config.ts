import { feedLoader } from '@ascorbic/feed-loader'
import { file, glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { pageSchema, postSchema, projectsSchema, streamsSchema } from './content/schema'

const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/pages' }),
  schema: pageSchema,
})

const home = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/home' }),
  schema: pageSchema,
})

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: postSchema,
})

const projects = defineCollection({
  loader: file('./src/content/projects/data.json'),
  schema: projectsSchema,
})

const record = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/record' }),
  schema: postSchema,
})

const streams = defineCollection({
  loader: file('./src/content/streams/data.json'),
  schema: streamsSchema,
})

const feeds = defineCollection({
  loader: feedLoader({
    url: 'https://astro.build/rss.xml',
  }),
})

export const collections = { pages, home, blog, projects, record, streams, feeds }
