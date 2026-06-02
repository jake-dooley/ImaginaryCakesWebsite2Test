'use client'
import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    let ctx
    let cancelled = false

    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      const el = ref.current
      if (!el) return

      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { y: options.y ?? 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: options.duration ?? 0.9,
            delay: options.delay ?? 0,
            ease: options.ease ?? 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: options.start ?? 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }

    init()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}

export function useStaggerReveal(selector, options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    let ctx
    let cancelled = false

    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      const el = ref.current
      if (!el) return

      ctx = gsap.context(() => {
        gsap.fromTo(
          selector,
          { y: options.y ?? 40, opacity: 0, scale: options.scale ?? 1 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: options.duration ?? 0.8,
            stagger: options.stagger ?? 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: options.start ?? 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }, el)
    }

    init()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}
