import type { ContentCollectionKey } from 'astro:content'
import { getCollection } from 'astro:content'

/**
 * Retrieves filtered posts from the specified content collection.
 * In production, it filters out draft posts.
 *
 * @async
 * @param {ContentCollectionKey} contentCollectionType
 *  The type of the content collection to filter.
 * @returns {Promise<CollectionEntry<ContentCollectionKey>[]>}
 *  A promise that resolves to the filtered posts.
 */
export async function getFilteredPosts(
  contentCollectionType: ContentCollectionKey,
): Promise<any[]> {
  return await getCollection(contentCollectionType, ({ data }: any) => {
    return import.meta.env.PROD ? !data.draft : true
  }) as any
}

/**
 * Sorts an array of posts by their publication date in descending order.
 *
 * @param {CollectionEntry<ContentCollectionKey>[]} posts - An array of posts to sort.
 * @returns {CollectionEntry<ContentCollectionKey>[]} - The sorted array of posts.
 */
export function getSortedPosts(
  posts: any[],
): any[] {
  return posts.sort(
    (a: any, b: any) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  )
}
