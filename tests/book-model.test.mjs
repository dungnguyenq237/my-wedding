import test from 'node:test'
import assert from 'node:assert/strict'
import {
  bookPageCount,
  navigationTarget,
  photoPageIndex,
  visiblePhotoIndexes,
} from '../src/features/gallery/book-model.ts'

test('book reserves hard covers and pads an odd photo count before closing cover', () => {
  assert.equal(bookPageCount(4), 6)
  assert.equal(bookPageCount(3), 6)
  assert.equal(photoPageIndex(0), 1)
  assert.equal(photoPageIndex(3), 4)
})
test('portrait navigation visits every page and cannot wrap through covers', () => {
  assert.equal(navigationTarget(0, -1, 6, 'portrait'), 0)
  assert.equal(navigationTarget(0, 1, 6, 'portrait'), 1)
  assert.equal(navigationTarget(4, 1, 6, 'portrait'), 5)
  assert.equal(navigationTarget(5, 1, 6, 'portrait'), 5)
})
test('landscape navigation follows two-page spreads and separate covers', () => {
  assert.equal(navigationTarget(0, 1, 6, 'landscape'), 1)
  assert.equal(navigationTarget(1, 1, 6, 'landscape'), 3)
  assert.equal(navigationTarget(3, 1, 6, 'landscape'), 5)
  assert.equal(navigationTarget(5, -1, 6, 'landscape'), 3)
  assert.equal(navigationTarget(3, -1, 6, 'landscape'), 1)
  assert.equal(navigationTarget(1, -1, 6, 'landscape'), 0)
})
test('thumbnail selection represents visible photos, excluding covers and filler', () => {
  assert.deepEqual(visiblePhotoIndexes(0, 4, 'landscape'), [])
  assert.deepEqual(visiblePhotoIndexes(1, 4, 'landscape'), [0, 1])
  assert.deepEqual(visiblePhotoIndexes(3, 3, 'landscape'), [2])
  assert.deepEqual(visiblePhotoIndexes(2, 4, 'portrait'), [1])
  assert.deepEqual(visiblePhotoIndexes(5, 4, 'landscape'), [])
})
