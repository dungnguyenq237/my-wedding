import { useEffect, useState } from 'react'

export function useWebGLSupport() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    setIsSupported(Boolean(context))
  }, [])

  return isSupported
}
