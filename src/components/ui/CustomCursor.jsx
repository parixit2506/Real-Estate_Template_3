import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const CustomCursor = () => {
    const cursorRef = useRef(null)
    const followerRef = useRef(null)
    const [cursorText, setCursorText] = useState('')

    useEffect(() => {
        const cursor = cursorRef.current
        const follower = followerRef.current

        const onMouseMove = (e) => {
            const { clientX, clientY } = e

            // Immediate cursor position
            gsap.to(cursor, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: "power2.out"
            })

            // Smoother follower movement
            gsap.to(follower, {
                x: clientX,
                y: clientY,
                duration: 0.8,
                ease: "power2.out"
            })
        }

        const onMouseDown = () => {
            gsap.to([cursor, follower], { scale: 0.8, duration: 0.3 })
        }

        const onMouseUp = () => {
            gsap.to([cursor, follower], { scale: 1, duration: 0.3 })
        }

        const handleHover = (e) => {
            const target = e.target.closest('a, button, [data-cursor-text]')
            if (target) {
                const text = target.getAttribute('data-cursor-text')
                setCursorText(text || '')

                gsap.to(follower, {
                    scale: 2.5,
                    backgroundColor: "transparent",
                    borderColor: "rgba(201, 169, 97, 0.5)",
                    duration: 0.6,
                    ease: "power2.out"
                })

                if (text) {
                    gsap.to(cursor, { opacity: 0, duration: 0.3 })
                }
            } else {
                setCursorText('')
                gsap.to(follower, {
                    scale: 1,
                    backgroundColor: "transparent",
                    borderColor: "rgba(201, 169, 97, 0.5)",
                    duration: 0.6,
                    ease: "power2.out"
                })
                gsap.to(cursor, { opacity: 1, duration: 0.3 })
            }
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mousedown', onMouseDown)
        window.addEventListener('mouseup', onMouseUp)
        window.addEventListener('mouseover', handleHover)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mousedown', onMouseDown)
            window.removeEventListener('mouseup', onMouseUp)
            window.removeEventListener('mouseover', handleHover)
        }
    }, [])

    return (
        <>
            {/* The Main Dot */}
            <div
                ref={cursorRef}
                className="hidden lg:block fixed top-0 left-0 w-1.5 h-1.5 bg-luxury-gold rounded-full pointer-events-none z-[100000] -translate-x-1/2 -translate-y-1/2"
            />

            {/* The Luxury Follower Ring */}
            <div
                ref={followerRef}
                className="hidden lg:block fixed top-0 left-0 w-10 h-10 border border-luxury-gold/50 rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden"
            >
                {cursorText && (
                    <span className="text-[10px] text-luxury-black font-bold uppercase tracking-tighter animate-in fade-in zoom-in duration-300">
                        {cursorText}
                    </span>
                )}
            </div>
        </>
    )
}

export default CustomCursor
