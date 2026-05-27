export interface Photo {
  /** Image path relative to public/ directory, e.g. '/photos/p-2024-01-15-12-00-00-000-1.jpg' */
  src: string
  /** Alt text for accessibility */
  alt?: string
}

/**
 * Photos are displayed newest-first.
 *
 * To add photos:
 * 1. Put the image into public/photos/
 * 2. Rename to antfu's format: p-YYYY-MM-DD-HH-MM-SS-000-N.jpg
 * 3. Add an entry below
 */
export const photos: Photo[] = [
  { src: '/photos/p-2026-05-27-21-16-04-000-1.jpg', alt: '' },
  { src: '/photos/p-2026-05-27-21-16-03-000-1.jpg', alt: '' },
  { src: '/photos/p-2026-05-27-21-16-02-000-1.jpg', alt: '' },
  { src: '/photos/p-2026-05-27-21-11-46-000-1.jpg', alt: '' },
  { src: '/photos/p-2026-05-27-21-10-00-000-1.jpg', alt: '' },
  { src: '/photos/p-2018-11-23-16-17-53-000-1.jpg', alt: '' },
]
