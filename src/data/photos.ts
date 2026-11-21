export interface Photo {
  /** Image path relative to public/ directory, e.g. '/photos/p-2024-01-15-12-00-00-000-1.jpg' */
  src: string
  /** Alt text for accessibility */
  alt?: string
}

export const photos: Photo[] = [
  { src: '/photos/p-2026-11-09-19-08-09-000-1.jpg', alt: '手持尼康相机拍照的人' },
  { src: '/photos/p-2026-05-28-20-20-54-000-1.jpg', alt: '' },
  { src: '/photos/p-2026-05-28-20-20-58-000-1.jpg', alt: '' },
  { src: '/photos/p-2026-05-28-20-21-02-000-1.jpg', alt: '' },
  { src: '/photos/p-2026-05-27-21-11-46-000-1.jpg', alt: '' },
  { src: '/photos/p-2026-05-27-21-10-00-000-1.jpg', alt: '' },
  { src: '/photos/p-2018-11-23-16-17-53-000-1.jpg', alt: '' },
]
