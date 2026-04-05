import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFilters } from '../../context/FilterContext'

gsap.registerPlugin(ScrollTrigger)

const destinations = [
    {
        id: 1,
        name: 'LONDON',
        region: 'United Kingdom',
        image: '/destinations/Destinations-1.png',
    },
    {
        id: 2,
        name: 'DUBAI',
        region: 'UAE',
        image: '/destinations/Destinations-2.png',
    },
    {
        id: 3,
        name: 'NEW YORK',
        region: 'USA',
        image: '/destinations/Destinations-3.png',
    },
    {
        id: 4,
        name: 'PARIS',
        region: 'France',
        image: '/destinations/Destinations-4.png',
    },
    {
        id: 5,
        name: 'TOKYO',
        region: 'Japan',
        image: '/destinations/Destinations-5.png',
    },
    {
        id: 6,
        name: 'LOS ANGELES',
        region: 'USA',
        image: '/destinations/Destinations-6.png',
    },
    {
        id: 7,
        name: 'MIAMI',
        region: 'USA',
        image: '/destinations/Destinations-7.png',
    },
    {
        id: 8,
        name: 'SINGAPORE',
        region: 'Asia',
        image: '/destinations/Destinations-8.png',
    },
]

const Destinations = () => {
    const navigate = useNavigate()
    const { applyFilters } = useFilters()
    const sectionRef = useRef(null)
    const carouselRef = useRef(null)
    const [activeId, setActiveId] = useState(null) // Initially null for smooth entrance
    const [scrollProgress, setScrollProgress] = useState(0)
    const [isReady, setIsReady] = useState(false) // Gate for scroll calculations

    const handleScroll = (e) => {
        const container = e.target
        const scrollWidth = container.scrollWidth - container.clientWidth
        const progress = (container.scrollLeft / scrollWidth) * 100
        setScrollProgress(progress)

        // Only sync activeId after entrance animation is done to avoid jitter
        if (isReady && window.innerWidth < 1024) {
            const itemWidth = container.scrollWidth / destinations.length
            const index = Math.round(container.scrollLeft / itemWidth)
            if (destinations[index] && destinations[index].id !== activeId) {
                setActiveId(destinations[index].id)
            }
        }
    }

    const handleCardClick = (destination) => {
        if (activeId === destination.id) {
            // Already active, navigate to listing with filter
            // We clear other filters to ensure the destination properties are shown
            applyFilters({
                region: 'All',
                type: 'All',
                status: 'All',
                amenities: [],
                priceRange: 'All',
                rating: 'Any',
                searchLocation: destination.name
            })
            navigate('/listing')
        } else {
            // Set active
            setActiveId(destination.id)

            // If on mobile/tablet carousel, scroll to the clicked item
            if (window.innerWidth < 1024 && carouselRef.current) {
                const index = destinations.findIndex(d => d.id === destination.id)
                const container = carouselRef.current
                const itemWidth = container.scrollWidth / destinations.length
                container.scrollTo({
                    left: index * itemWidth,
                    behavior: 'smooth'
                })
            }
        }
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                    onEnter: () => {
                        // Reset and delay activation every time we enter from top
                        setIsReady(false)
                        setActiveId(null)
                        setTimeout(() => {
                            setActiveId(1)
                            setIsReady(true)
                        }, 600)
                    },
                    onEnterBack: () => {
                        // Also trigger when scrolling back up into the section
                        setIsReady(false)
                        setActiveId(null)
                        setTimeout(() => {
                            setActiveId(1)
                            setIsReady(true)
                        }, 600)
                    }
                }
            })

            tl.from('.section-title', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            })
                .from('.destination-card', {
                    x: 100,
                    autoAlpha: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power3.out',
                    clearProps: 'all'
                }, '-=0.8')
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="destinations" ref={sectionRef} className="section-padding bg-luxury-black border-y border-luxury-gold/5 overflow-hidden">
            <div className="text-center mb-16 md:mb-24 px-4">
                <span className="text-luxury-gold uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                    Boundless Horizons
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl text-luxury-off-white">
                    Curated <span className="text-gradient-gold italic pr-2">Destinations</span>
                </h2>
            </div>

            <div className="w-full h-[450px] sm:h-[500px] lg:h-[500px] px-0 md:px-0">
                <div
                    ref={carouselRef}
                    onScroll={handleScroll}
                    className="flex flex-row lg:flex-row gap-4 lg:gap-1.5 xl:gap-2 h-full w-full max-w-[1800px] mx-auto overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-hide px-4 lg:px-10 xl:px-20"
                >
                    {destinations.map((destination) => {
                        const isActive = activeId === destination.id
                        return (
                            <div
                                key={destination.id}
                                className={`destination-card relative flex-shrink-0 w-[85vw] sm:w-[90vw] lg:w-auto overflow-hidden rounded-sm cursor-pointer transition-all duration-700 ease-luxury snap-center bg-pure-black shadow-2xl shadow-pure-black/60
                                    ${isActive ? 'lg:flex-[3.5] h-full opacity-100' : 'lg:flex-1 h-full opacity-70 hover:opacity-100'}
                                `}
                                onClick={() => handleCardClick(destination)}
                                onMouseEnter={() => window.innerWidth >= 1024 && setActiveId(destination.id)}
                            >
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full lg:w-auto lg:min-w-[35vw] max-w-none object-cover transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                                    loading="lazy"
                                />

                                {/* Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t from-pure-black/90 via-pure-black/20 to-transparent transition-opacity duration-500
                                    ${isActive ? 'opacity-80' : 'opacity-40'}
                                `} />

                                {/* Content */}
                                <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 lg:bottom-6 lg:left-6 xl:bottom-10 xl:left-10 z-10 min-w-[240px] sm:min-w-[300px] lg:min-w-[280px] xl:min-w-[360px] pr-14">
                                    <div className={`transition-all duration-500 ease-out ${isActive ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-8'}`}>
                                        <h3 className="text-xl sm:text-3xl lg:text-3xl xl:text-4xl font-display text-pure-white mb-2 md:mb-4 whitespace-nowrap">
                                            {destination.name}
                                        </h3>
                                        <p className="text-pure-white/90 text-sm lg:text-sm xl:text-sm mb-6 max-w-md hidden sm:block">
                                            Experience the epitome of luxury in {destination.region}. A curated selection of the finest estates.
                                        </p>
                                    </div>
                                </div>

                                {/* Numbering always visible */}
                                <div className={`absolute bottom-4 right-4 sm:bottom-8 sm:right-8 lg:bottom-6 lg:right-6 xl:bottom-10 xl:right-10 text-pure-white font-display text-base md:text-xl xl:text-2xl transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                                    0{destination.id}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Scroll Indicator - Tablet & Mobile */}
            <div className="mt-8 px-4 lg:hidden">
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[10px] text-luxury-gold tracking-[0.2em] uppercase opacity-60">
                        Swipe to Explore
                    </span>
                    <div className="w-32 sm:w-48 h-[2px] bg-white/10 relative overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 bg-luxury-gold transition-all duration-300 ease-out"
                            style={{ width: `${scrollProgress}%` }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Destinations
