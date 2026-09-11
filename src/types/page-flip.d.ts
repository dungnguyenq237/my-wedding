// The pinned 2.0.7 package ships TS sources but no declaration entrypoint.
// Declare only the public API used by our adapter, verified against those sources.
declare module 'page-flip' {
  export class PageFlip {
    constructor(
      element: HTMLElement,
      settings: {
        width: number
        height: number
        size: 'stretch'
        minWidth: number
        maxWidth: number
        minHeight: number
        maxHeight: number
        showCover: boolean
        usePortrait: boolean
        flippingTime: number
        maxShadowOpacity: number
        mobileScrollSupport: boolean
        useMouseEvents: boolean
        showPageCorners: boolean
        disableFlipByClick: boolean
        autoSize: boolean
        drawShadow: boolean
      },
    )
    on(
      name: 'init' | 'flip' | 'changeOrientation' | 'changeState',
      callback: (event: { data: unknown }) => void,
    ): this
    off(name: string): void
    loadFromHTML(pages: HTMLElement[]): void
    getCurrentPageIndex(): number
    getOrientation(): 'portrait' | 'landscape'
    getState(): 'user_fold' | 'fold_corner' | 'flipping' | 'read'
    flip(page: number, corner?: 'top' | 'bottom'): void
    turnToPage(page: number): void
    update(): void
    destroy(): void
  }
}
