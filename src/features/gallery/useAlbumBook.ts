import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import type { PageFlip } from 'page-flip'
import type { BookOrientation } from './book-model'

interface BookState {
  page: number
  orientation: BookOrientation
  busy: boolean
  ready: boolean
  failed: boolean
}

export function useAlbumBook(templates: RefObject<HTMLDivElement | null>, contentKey: string) {
  const mount = useRef<HTMLDivElement>(null)
  const engine = useRef<PageFlip | null>(null)
  const reducedMotion = useRef(false)
  const [state, setState] = useState<BookState>({
    page: 0,
    orientation: 'portrait',
    busy: false,
    ready: false,
    failed: false,
  })

  useEffect(() => {
    const parent = mount.current
    const source = templates.current
    if (!parent || !source) return
    let disposed = false
    let instance: PageFlip | null = null
    let observer: ResizeObserver | null = null
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.current = preference.matches
    const onPreferenceChange = () => {
      reducedMotion.current = preference.matches
    }
    preference.addEventListener('change', onPreferenceChange)
    // React owns the templates and parent; the engine exclusively owns this child.
    // destroy() removes its root, so never give it a React-managed element.
    const root = document.createElement('div')
    parent.replaceChildren(root)
    const pages = Array.from(source.children, (page) => page.cloneNode(true) as HTMLElement)
    const reset = () =>
      setState({ page: 0, orientation: 'portrait', busy: false, ready: false, failed: false })
    reset()

    const initialize = async () => {
      try {
        const { PageFlip: Book } = await import('page-flip')
        // Decode the small display copies before enabling turns: no blank incoming pages.
        await Promise.all(
          pages.flatMap((page) =>
            Array.from(page.querySelectorAll('img'), (img) => img.decode().catch(() => undefined)),
          ),
        )
        if (disposed) return
        instance = new Book(root, {
          width: 420,
          height: 540,
          size: 'stretch',
          minWidth: 260,
          maxWidth: 420,
          minHeight: 334,
          maxHeight: 540,
          showCover: true,
          usePortrait: true,
          flippingTime: 850,
          maxShadowOpacity: 0.22,
          mobileScrollSupport: true,
          // Own gestures outside the engine: vertical scroll and reduced motion stay reliable.
          useMouseEvents: false,
          showPageCorners: false,
          disableFlipByClick: false,
          autoSize: true,
          drawShadow: true,
        })
        engine.current = instance
        const sync = () => {
          if (!instance || disposed) return
          setState({
            page: instance.getCurrentPageIndex(),
            orientation: instance.getOrientation(),
            busy: instance.getState() !== 'read',
            ready: true,
            failed: false,
          })
        }
        instance.on('init', sync).on('flip', sync).on('changeOrientation', sync)
        // PageFlip emits this event before assigning its internal state.
        instance.on('changeState', ({ data }) => {
          if (!disposed) setState((previous) => ({ ...previous, busy: data !== 'read' }))
        })
        instance.loadFromHTML(pages)
        observer = new ResizeObserver(() => {
          if (!disposed) instance?.update()
        })
        observer.observe(parent)
      } catch {
        if (!disposed) setState((previous) => ({ ...previous, failed: true, busy: false }))
      }
    }
    void initialize()
    return () => {
      disposed = true
      observer?.disconnect()
      preference.removeEventListener('change', onPreferenceChange)
      for (const name of ['init', 'flip', 'changeOrientation', 'changeState']) instance?.off(name)
      instance?.destroy()
      root.remove()
      engine.current = null
    }
  }, [contentKey, templates])

  const goTo = useCallback((page: number) => {
    const book = engine.current
    if (!book || book.getState() !== 'read') return
    if (reducedMotion.current) book.turnToPage(page)
    else book.flip(page, 'bottom')
  }, [])

  return { ...state, mount, goTo }
}
