import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSmoothScroll } from '../../utilities/hooks/useSmoothScroll'


gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const headlineRef = useRef(null)
    const subtitleRef = useRef(null)
    const ctaRef = useRef(null)
    const imageRef = useRef(null)
    const { scrollToId } = useSmoothScroll()

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.fromTo(
            headlineRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2 }
        )
            .fromTo(
                subtitleRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                '-=0.8'
            )
            .fromTo(
                ctaRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.6'
            )
            .fromTo(
                imageRef.current,
                { scale: 1.4, opacity: 0 },
                { scale: 1.2, opacity: 1, duration: 1.4 },
                '-=1.2'
            )

        // Parallax Effect - Starting from a slight negative offset to cover the top
        gsap.to(imageRef.current, {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
                trigger: "#home", // Use the section as trigger
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        })
    }, [])

    return (
        <section id="home" className="relative h-screen flex items-center justify-center bg-pure-black overflow-hidden">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={imageRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover scale-[1.2] will-change-transform"
                >
                    <source src="/assets/110923-689949643.mp4" type="video/mp4" />
                </video>
                {/* Dark Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-pure-black/60 via-pure-black/40 to-pure-black/70 pointer-events-none"></div>
                <div className="absolute inset-0 bg-pure-black/20 pointer-events-none"></div>
            </div>

            <div className="container-luxury relative z-10 px-6 sm:px-12 lg:px-20">
                <div className="max-w-5xl xl:max-w-none mx-auto text-center space-y-6 lg:space-y-8 will-change-transform">
                    {/* Text Content */}
                    <h1
                        ref={headlineRef}
                        className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-pure-white leading-[1.1] sm:leading-tight lg:whitespace-nowrap will-change-[transform,opacity]"
                    >
                        <span className="text-4xl md:text-7xl lg:text-7xl xl:text-8xl">Discover Your</span> <br className="lg:hidden" /> <span className="text-gradient-gold text-3xl md:text-6xl lg:text-7xl xl:text-8xl">Dream Estate</span>
                    </h1>

                    <p
                        ref={subtitleRef}
                        className="text-base md:text-xl lg:text-2xl text-pure-white/90 max-w-2xl mx-auto leading-relaxed font-light will-change-[transform,opacity]"
                    >
                        Curated collection of the world&apos;s most exclusive properties.
                        Where luxury meets lifestyle.
                    </p>

                    <div ref={ctaRef} className="will-change-[transform,opacity] pt-2 lg:pt-4">
                        <a
                            href="#properties"
                            onClick={(e) => {
                                e.preventDefault()
                                scrollToId('properties')
                            }}
                            className="inline-block px-8 py-4 sm:px-10 sm:py-5 bg-luxury-gold text-luxury-black font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase transition-luxury hover:bg-luxury-gold-light hover:shadow-2xl hover:shadow-luxury-gold/40 hover:-translate-y-1"
                        >
                            View Collection
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero