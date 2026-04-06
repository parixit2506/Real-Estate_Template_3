import { useEffect, useRef } from 'react'

const IntroScreen = ({ onEnter }) => {
    const screenRef = useRef(null)
    const contentRef = useRef(null)
    const buttonRef = useRef(null)
    const titleRef = useRef(null)
    const subRef = useRef(null)

    // Using pure CSS Animations for the critical path entry to boost Lighthouse scores
    // This removes GSAP blocking from the first paint entirely.
    useEffect(() => {
        // Animation handled by Tailwind/CSS classes on render
    }, [])

    const handleExit = async () => {
        // Dynamic import GSAP only when it's time to exit for the fancy transition
        const { default: gsap } = await import('gsap')
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
                        className="text-[clamp(0.9rem,6vw,5rem)] font-display uppercase text-luxury-gold tracking-[0.2em] sm:tracking-[0.1em] md:tracking-[0.25em] lg:tracking-[0.4em] xl:tracking-[0.6em] 2xl:tracking-[0.7em] leading-none animate-intro-title"
                    >
                        AuraProperty
                    </h1>
                </div>

                <div className="mb-8 md:mb-16 overflow-hidden">
                    <p
                        ref={subRef}
                        className="text-luxury-off-white/40 uppercase tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.4em] text-[8px] sm:text-[10px] md:text-xs 2xl:text-sm animate-intro-fade"
                    >
                        Exquisite Global Estates Portfolio
                    </p>
                </div>

                <button
                    ref={buttonRef}
                    onClick={handleExit}
                    className="group relative inline-flex items-center justify-center px-6 py-3 md:px-12 md:py-5 border border-luxury-gold/30 hover:border-luxury-gold transition-luxury animate-intro-up"
                >
                    <span className="relative z-10 text-[8px] sm:text-[10px] md:text-xs 2xl:text-sm uppercase tracking-[0.2em] md:tracking-[0.5em] text-luxury-gold font-bold transition-luxury group-hover:text-luxury-off-white">
                        Enter Experience
                    </span>
                    <div className="absolute inset-0 bg-luxury-gold/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                </button>
            </div>

            {/* Background Texture/Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-luxury-gold/5 mix-blend-overlay" />
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />
        </div>
    )
}

export default IntroScreen
