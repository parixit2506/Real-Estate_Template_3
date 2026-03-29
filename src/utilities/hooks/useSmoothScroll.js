import { useCallback } from 'react'

export const useSmoothScroll = () => {
    const scrollToId = useCallback((id) => {
        const element = document.getElementById(id)
        if (element) {
            if (window.lenis) {
                window.lenis.scrollTo(element, {
                    offset: -100,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                })
            } else {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }, [])

    return { scrollToId }
}
