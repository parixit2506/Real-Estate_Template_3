import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Breadcrumb from './Breadcrumb'

const PageHero = ({
    title,
    subtitle,
    description,
    backgroundImage,
    breadcrumbItems = [],
    showScrollIndicator = true,
    height = '70vh'
}) => {
    const heroRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background Image Animation
            gsap.from('.hero-bg-image', {
                scale: 1.1,
                opacity: 0,
                duration: 2,
                ease: 'power3.out'
            })

            // Content Entrance
            gsap.from('.hero-content-node', {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.3
            })

            // Scroll Line Animation
            if (showScrollIndicator) {
                gsap.to('.hero-scroll-line', {
                    yPercent: 100,
                    duration: 1.5,
                    repeat: -1,
                    ease: 'power2.inOut',
                })
            }
        }, heroRef)

        return () => ctx.revert()
    }, [showScrollIndicator])

    return (
        <div ref={heroRef} className="relative overflow-hidden bg-luxury-black" style={{ height }}>
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage}
                    alt={title}
                    className="hero-bg-image w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-pure-black/80 via-pure-black/40 to-pure-black" />
            </div>

            {/* Content Section */}
            <div className="relative z-10 w-full h-full flex items-center justify-center text-center px-4">
                <div className="max-w-4xl" ref={contentRef}>
                    {/* Breadcrumb Layer */}
                    {breadcrumbItems.length > 0 && (
                        <div className="hero-content-node mb-12 flex justify-center">
                            <Breadcrumb items={breadcrumbItems} variant="light" />
                        </div>
                    )}

                    {/* Subtitle / Eyebrow */}
                    {subtitle && (
                        <span className="hero-content-node text-luxury-gold text-xs font-bold tracking-[0.3em] uppercase mb-6 block">
                            {subtitle}
                        </span>
                    )}

                    {/* Main Title */}
                    <h1 className="hero-content-node text-4xl sm:text-5xl md:text-7xl font-display font-light text-pure-white mb-6 leading-tight drop-shadow-xl">
                        {title}
                    </h1>

                    {/* Description */}
                    {description && (
                        <p className="hero-content-node text-pure-white/90 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Scroll Indicator */}
            {showScrollIndicator && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 animate-fade-in pointer-events-none" style={{ animationDelay: '1.8s', animationFillMode: 'forwards' }}>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-luxury-gold/80 to-transparent relative overflow-hidden">
                        <div className="hero-scroll-line absolute top-0 left-0 w-full h-full bg-pure-white origin-top" />
                    </div>
                    <span className="text-[10px] text-luxury-gold tracking-[0.3em] uppercase font-medium drop-shadow-md">Scroll</span>
                </div>
            )}
        </div>
    )
}

export default PageHero
