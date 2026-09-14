export type BookOrientation = 'portrait' | 'landscape'

export function bookPageCount(photos: number): number {
  return photos + (photos % 2) + 2
}

export function photoPageIndex(photo: number): number {
  return photo + 1
}

export function navigationTarget(
  page: number,
  direction: 1 | -1,
  total: number,
  orientation: BookOrientation,
): number {
  const step = orientation === 'portrait' || page === 0 ? 1 : 2
  return Math.max(0, Math.min(total - 1, page + direction * step))
}

export function visiblePhotoIndexes(
  page: number,
  photos: number,
  orientation: BookOrientation,
): number[] {
  if (page === 0 || page > photos) return []
  const first = orientation === 'landscape' && page % 2 === 0 ? page - 1 : page
  return Array.from(
    { length: orientation === 'landscape' ? 2 : 1 },
    (_, offset) => first + offset - 1,
  ).filter((index) => index >= 0 && index < photos)
}
