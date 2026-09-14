import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { registerHooks } from 'node:module'
import test from 'node:test'
import { JSDOM } from 'jsdom'
import { act, createElement, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { useAlbumBook } from '../src/features/gallery/useAlbumBook.ts'

// Vite exposes named exports from the UMD package; Node uses its equivalent ESM bundle.
const engineURL = new URL('../node_modules/page-flip/dist/js/page-flip.module.js', import.meta.url)
  .href
registerHooks({
  resolve(specifier, context, nextResolve) {
    return specifier === 'page-flip'
      ? { url: engineURL, shortCircuit: true }
      : nextResolve(specifier, context)
  },
  load(url, context, nextLoad) {
    return url === engineURL
      ? { format: 'module', source: readFileSync(new URL(url), 'utf8'), shortCircuit: true }
      : nextLoad(url, context)
  },
})

function environment(reducedMotion = false) {
  const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>')
  const frames = new Map()
  const resizeListeners = new Set()
  let frameId = 0
  let clock = 0
  const saved = new Map()
  const add = dom.window.addEventListener.bind(dom.window)
  const remove = dom.window.removeEventListener.bind(dom.window)
  dom.window.addEventListener = (name, fn, ...rest) => {
    if (name === 'resize') resizeListeners.add(fn)
    add(name, fn, ...rest)
  }
  dom.window.removeEventListener = (name, fn, ...rest) => {
    if (name === 'resize') resizeListeners.delete(fn)
    remove(name, fn, ...rest)
  }
  // jsdom supplies real DOM/event behavior; only layout and animation time are simulated.
  Object.defineProperties(dom.window.HTMLElement.prototype, {
    offsetWidth: { get: () => 360 },
    offsetHeight: { get: () => (360 * 540) / 420 },
  })
  dom.window.matchMedia = () => ({
    matches: reducedMotion,
    addEventListener() {},
    removeEventListener() {},
  })
  for (const [key, value] of Object.entries({
    window: dom.window,
    document: dom.window.document,
    navigator: dom.window.navigator,
    HTMLElement: dom.window.HTMLElement,
    IS_REACT_ACT_ENVIRONMENT: true,
    requestAnimationFrame: (callback) => {
      frames.set(++frameId, callback)
      return frameId
    },
    cancelAnimationFrame: (id) => frames.delete(id),
    ResizeObserver: class {
      observe() {}
      disconnect() {}
    },
  })) {
    saved.set(key, Object.getOwnPropertyDescriptor(globalThis, key))
    Object.defineProperty(globalThis, key, { value, configurable: true, writable: true })
  }
  return {
    frames,
    resizeListeners,
    advance() {
      clock += 1000
      const callbacks = [...frames.values()]
      frames.clear()
      for (const callback of callbacks) callback(clock)
    },
    close() {
      dom.window.close()
      for (const [key, descriptor] of saved) {
        if (descriptor) Object.defineProperty(globalThis, key, descriptor)
        else delete globalThis[key]
      }
    },
  }
}

async function mountAlbum(env) {
  let state
  function Harness() {
    const templates = useRef(null)
    state = useAlbumBook(templates, 'six-pages')
    return createElement(
      'div',
      null,
      createElement('div', { ref: state.mount }),
      createElement(
        'div',
        { ref: templates, hidden: true },
        ...Array.from({ length: 6 }, (_, index) =>
          createElement(
            'article',
            {
              key: index,
              'data-density': index === 0 || index === 5 ? 'hard' : 'soft',
            },
            `Page ${index}`,
          ),
        ),
      ),
    )
  }
  const container = document.createElement('div')
  document.body.append(container)
  const root = createRoot(container)
  await act(async () => {
    root.render(createElement(Harness))
  })
  for (let i = 0; i < 100 && !state.ready && !state.failed; i++) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2))
    })
  }
  assert.equal(state.ready, true, 'real engine initializes')
  return {
    get state() {
      return state
    },
    async goTo(page) {
      await act(async () => {
        state.goTo(page)
      })
    },
    async finish() {
      await act(async () => {
        env.advance()
        env.advance()
      })
    },
    async close() {
      await act(async () => {
        root.unmount()
      })
      container.remove()
    },
  }
}

test('album busy state follows the event payload during and after a real animated flip', async () => {
  const env = environment()
  const album = await mountAlbum(env)
  try {
    await album.goTo(1)
    assert.equal(album.state.busy, true, 'controls lock while turning')
    await album.finish()
    assert.equal(album.state.page, 1)
    assert.equal(album.state.busy, false, 'controls unlock when the animation finishes')
  } finally {
    await album.close()
    env.close()
  }
})

test('portrait can navigate backward to a photo and then the front cover', async () => {
  const env = environment()
  const album = await mountAlbum(env)
  try {
    assert.equal(album.state.orientation, 'portrait')
    await album.goTo(3)
    await album.finish()
    assert.equal(album.state.page, 3)
    await album.goTo(1)
    await album.finish()
    assert.equal(album.state.page, 1, 'backward thumbnail jump completes')
    await album.goTo(0)
    await album.finish()
    assert.equal(album.state.page, 0, 'backward cover turn completes')
  } finally {
    await album.close()
    env.close()
  }
})

test('reduced motion turns directly in both directions without animation progression', async () => {
  const env = environment(true)
  const album = await mountAlbum(env)
  try {
    await album.goTo(3)
    assert.equal(album.state.page, 3)
    assert.equal(album.state.busy, false)
    await album.goTo(0)
    assert.equal(album.state.page, 0)
    assert.equal(album.state.busy, false)
  } finally {
    await album.close()
    env.close()
  }
})

for (const bundle of ['page-flip.browser.js', 'page-flip.module.js']) {
  test(`${bundle}: destroy cancels render work and removes resize listeners without mouse events`, async () => {
    const env = environment()
    try {
      const loaded = await import(
        new URL(`../node_modules/page-flip/dist/js/${bundle}`, import.meta.url).href
      )
      const { PageFlip } = loaded.default ?? loaded
      const host = document.createElement('div')
      document.body.append(host)
      const book = new PageFlip(host, { width: 360, height: 463, useMouseEvents: false })
      book.loadFromHTML(Array.from({ length: 4 }, () => document.createElement('article')))
      // Allow the package's one-shot Safari initialization task to finish.
      await new Promise((resolve) => setTimeout(resolve, 5))
      assert.equal(env.frames.size, 1)
      assert.equal(env.resizeListeners.size, 1)
      env.advance()
      book.destroy()
      assert.equal(env.frames.size, 0, 'no pending animation frame after destruction')
      assert.equal(env.resizeListeners.size, 0, 'no retained resize handler')
      env.advance()
      assert.equal(env.frames.size, 0, 'rendering does not restart')
    } finally {
      env.close()
    }
  })
}
