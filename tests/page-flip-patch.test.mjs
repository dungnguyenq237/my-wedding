import assert from 'node:assert/strict'
import { mkdtempSync, cpSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { patchPageFlip } from '../scripts/patch-page-flip.mjs'

function fixture(run) {
  const directory = mkdtempSync(join(tmpdir(), 'page-flip-patch-'))
  try {
    cpSync(new URL('../node_modules/page-flip/', import.meta.url), directory, { recursive: true })
    run(directory)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
}

test('lifecycle patch is safe to rerun after postinstall', () =>
  fixture((directory) => {
    const bundle = join(directory, 'dist/js/page-flip.browser.js')
    const before = readFileSync(bundle, 'utf8')
    patchPageFlip(directory)
    patchPageFlip(directory)
    assert.equal(readFileSync(bundle, 'utf8'), before)
  }))

test('lifecycle patch rejects an unexpected dependency version', () =>
  fixture((directory) => {
    writeFileSync(join(directory, 'package.json'), JSON.stringify({ version: '2.0.8' }))
    assert.throws(() => patchPageFlip(directory), /requires 2\.0\.7/)
  }))

test('lifecycle patch rejects modified bundles before touching the other bundle', () =>
  fixture((directory) => {
    const first = join(directory, 'dist/js/page-flip.browser.js')
    const second = join(directory, 'dist/js/page-flip.module.js')
    const before = readFileSync(first, 'utf8')
    writeFileSync(second, readFileSync(second, 'utf8') + '\n// unexpected change\n')
    assert.throws(() => patchPageFlip(directory), /Unrecognized PageFlip bundle/)
    assert.equal(readFileSync(first, 'utf8'), before)
  }))
