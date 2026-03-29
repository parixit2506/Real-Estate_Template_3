import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const IntroScreen = ({ onEnter }) => {
    const screenRef = useRef(null)
    const contentRef = useRef(null)
    const buttonRef = useRef(null)
    const titleRef = useRef(null)
    const subRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 2 } })

        // Responsive tracking for GSAP to match refined Tailwind breakpoints
        const width = window.innerWidth
        let targetTracking = '0.2em'
        if (width >= 1536) targetTracking = '0.7em'
        else if (width >= 1280) targetTracking = '0.6em'
        else if (width >= 1024) targetTracking = '0.4em'
        else if (width >= 768) targetTracking = '0.25em'
        else if (width >= 640) targetTracking = '0.1em'

        // Intro Entrance
        tl.fromTo(titleRef.current,
            { y: 80, opacity: 0, letterSpacing: '0.01em', scale: 0.98 },
            {
                y: 0,
                opacity: 1,
                letterSpacing: targetTracking,
                scale: 1,
                duration: 2.5,
                ease: 'expo.out',
                clearProps: 'letterSpacing' // Let Tailwind handle it after animation
            }
        )
            .fromTo(subRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 2 },
                '-=1.5'
            )
            .fromTo(buttonRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5 },
                '-=1'
            )
    }, [])

    const handleExit = () => {
        const tl = gsap.timeline({
            onComplete: onEnter,
            defaults: { ease: 'power4.inOut', duration: 1.5 }
        })

        tl.to(contentRef.current, {
            y: -100,
            opacity: 0,
            scale: 0.9,
        })
            .to(screenRef.current, {
                yPercent: -100,
                duration: 1.8,
                ease: 'expo.inOut'
            }, '-=1')
    }

    return (
        <div
            ref={screenRef}
            className="fixed inset-0 z-[1000] bg-luxury-black flex items-center justify-center overflow-hidden"
        >
            <div ref={contentRef} className="text-center px-4 w-full max-w-[2560px] mx-auto">
                <div className="mb-4 md:mb-6 overflow-hidden">
                    <h1
                        ref={titleRef}
                        className="text-[clamp(0.9rem,6vw,5rem)] font-display uppercase text-luxury-gold tracking-[0.2em] sm:tracking-[0.1em] md:tracking-[0.25em] lg:tracking-[0.4em] xl:tracking-[0.6em] 2xl:tracking-[0.7em] leading-none"
                    >
                        AuraProperty
                    </h1>
                </div>

                <div className="mb-8 md:mb-16 overflow-hidden">
                    <p
                        ref={subRef}
                        className="text-luxury-off-white/40 uppercase tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.4em] text-[8px] sm:text-[10px] md:text-xs 2xl:text-sm"
                    >
                        Exquisite Global Estates Portfolio
                    </p>
                </div>

                <button
                    ref={buttonRef}
                    onClick={handleExit}
                    className="group relative inline-flex items-center justify-center px-6 py-3 md:px-12 md:py-5 border border-luxury-gold/30 hover:border-luxury-gold transition-luxury"
                >
                    <span className="relative z-10 text-[8px] sm:text-[10px] md:text-xs 2xl:text-sm uppercase tracking-[0.2em] md:tracking-[0.5em] text-luxury-gold font-bold transition-luxury group-hover:text-luxury-off-white">
                        Enter Experience
                    </span>
                    <div className="absolute inset-0 bg-luxury-gold/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                </button>
            </div>

            {/* Background Texture/Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    )
}

export default IntroScreen
