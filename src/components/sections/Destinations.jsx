import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
    {
        id: 9,
        name: 'AMSTERDAM',
        region: 'Netherlands',
        image: '/destinations/Destinations-1.png',
    },
    {
        id: 10,
        name: 'FLORENCE',
        region: 'Italy',
        image: '/destinations/Destinations-2.png',
    },
    {
        id: 11,
        name: 'SYDNEY',
        region: 'Australia',
        image: '/destinations/Destinations-3.png',
    },
    {
        id: 12,
        name: 'MALDIVES',
        region: 'Maldives',
        image: '/destinations/Destinations-4.png',
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
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const handleScroll = (e) => {
        const container = e.target
        const maxScroll = container.scrollWidth - container.clientWidth
        const progress = (container.scrollLeft / maxScroll) * 100
        setScrollProgress(progress)

        // Check arrow visibility
        setCanScrollLeft(container.scrollLeft > 20)
        setCanScrollRight(container.scrollLeft < maxScroll - 20)

        // Only sync activeId after entrance animation is done to avoid jitter
        if (isReady && window.innerWidth < 1024) {
            const children = Array.from(container.children)
            const containerCenter = container.scrollLeft + container.clientWidth / 2

            let closestItem = null
            let minDistance = Infinity

            children.forEach((child, index) => {
                const itemCenter = child.offsetLeft + child.clientWidth / 2
                const distance = Math.abs(containerCenter - itemCenter)
                if (distance < minDistance) {
                    minDistance = distance
                    closestItem = destinations[index]
                }
            })

            if (closestItem && closestItem.id !== activeId) {
                setActiveId(closestItem.id)
            }
        }
    }

    const scroll = (direction) => {
        if (carouselRef.current) {
            const container = carouselRef.current
            const scrollAmount = window.innerWidth < 1024 ? container.clientWidth * 0.8 : 500
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    const handleCardClick = (destination, target) => {
        if (activeId === destination.id) {
            // Already active, navigate to listing with filter
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

            // Calculate precise scroll to center the item
            if (carouselRef.current && (window.innerWidth < 1024 || destinations.length > 8)) {
                const container = carouselRef.current
                const card = target.closest('.destination-card')
                if (card) {
                    const scrollLeft = card.offsetLeft - (container.clientWidth / 2) + (card.clientWidth / 2)
                    container.scrollTo({
                        left: scrollLeft,
                        behavior: 'smooth'
                    })
                }
            }
        }
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    onEnter: () => {
                        setIsReady(false)
                        setActiveId(null)
                        setTimeout(() => {
                            setActiveId(1)
                            setIsReady(true)
                        }, 600)
                    },
                    onEnterBack: () => {
                        setIsReady(false)
                        setActiveId(null)
                        setTimeout(() => {
                            setActiveId(1)
                            setIsReady(true)
                        }, 600)
                    }
                }
            })

            tl.from('.section-title-fade', {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
            })
                .from('.destination-card', {
                    x: 60,
                    autoAlpha: 0,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: 'power3.out',
                    clearProps: 'all'
                }, '-=0.6')
        }, sectionRef)

        // Refresh ScrollTrigger to account for dynamic changes
        ScrollTrigger.refresh()

        return () => ctx.revert()
    }, [])

    return (
        <section id="destinations" ref={sectionRef} className="section-padding bg-luxury-black border-y border-luxury-gold/5 overflow-hidden">
            <div className="section-title-wrap text-center mb-12 md:mb-20 px-4 max-w-4xl mx-auto relative">
                <div className="mb-0">
                    <span className="section-title-fade text-luxury-gold uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                        Boundless Horizons
                    </span>
                    <h2 className="section-title-fade text-4xl md:text-5xl lg:text-6xl text-luxury-off-white">
                        Curated <span className="text-gradient-gold italic pr-2">Destinations</span>
                    </h2>
                </div>
            </div>

            <div className="w-full h-[450px] sm:h-[500px] lg:h-[500px] px-0 relative">
                <div
                    ref={carouselRef}
                    onScroll={handleScroll}
                    className={`flex flex-row gap-10 lg:gap-1.5 xl:gap-2 h-full w-full max-w-[1800px] mx-auto overflow-x-auto snap-x snap-mandatory scrollbar-hide px-0 lg:px-10 xl:px-20 ${destinations.length > 8 ? 'lg:overflow-x-auto' : 'lg:overflow-visible'}`}
                >
                    {destinations.map((destination) => {
                        const isActive = activeId === destination.id
                        return (
                            <div
                                key={destination.id}
                                className={`destination-card relative flex-shrink-0 w-full lg:w-auto overflow-hidden rounded-sm cursor-pointer transition-all duration-700 ease-luxury snap-center bg-luxury-black shadow-xl shadow-luxury-black/30
                                    ${destinations.length > 8
                                        ? (isActive ? 'lg:flex-[0_0_450px]' : 'lg:flex-[0_0_150px]')
                                        : (isActive ? 'lg:flex-[3.5]' : 'lg:flex-1')
                                    } h-full ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}
                                `}
                                onClick={(e) => handleCardClick(destination, e.target)}
                                onMouseEnter={() => window.innerWidth >= 1024 && setActiveId(destination.id)}
                            >
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className={`absolute inset-0 h-full w-full lg:w-[450px] lg:max-w-none object-cover transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
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
                                    {destination.id < 10 ? `0${destination.id}` : destination.id}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Scroll Indicator & Navigation - Tablet & Mobile/Desktop with scroll */}
            <div className={`mt-12 px-4 ${destinations.length > 8 ? '' : 'lg:hidden'}`}>
                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-8">
                        {/* Desktop Only Arrows - Left */}
                        {destinations.length > 8 && (
                            <button
                                onClick={() => scroll('left')}
                                disabled={!canScrollLeft}
                                className={`hidden lg:flex p-3.5 rounded-full border border-luxury-gold/20 transition-all duration-300 ${canScrollLeft ? 'opacity-100 hover:bg-luxury-gold hover:text-pure-black cursor-pointer' : 'opacity-30 cursor-not-allowed'} text-luxury-gold`}
                                aria-label="Previous Destinations"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}

                        <div className="flex flex-col items-center gap-3">
                            <span className="text-[10px] text-luxury-gold tracking-[0.2em] uppercase opacity-80">
                                {destinations.length > 8 ? 'Scroll to Explore More' : 'Swipe to Explore'}
                            </span>
                            <div className="w-32 sm:w-48 h-[2px] bg-white/10 relative overflow-hidden">
                                <div
                                    className="absolute inset-y-0 left-0 bg-luxury-gold transition-all duration-300 ease-out"
                                    style={{ width: `${scrollProgress}%` }}
                                />
                            </div>
                        </div>

                        {/* Desktop Only Arrows - Right */}
                        {destinations.length > 8 && (
                            <button
                                onClick={() => scroll('right')}
                                disabled={!canScrollRight}
                                className={`hidden lg:flex p-3.5 rounded-full border border-luxury-gold/20 transition-all duration-300 ${canScrollRight ? 'opacity-100 hover:bg-luxury-gold hover:text-pure-black cursor-pointer' : 'opacity-30 cursor-not-allowed'} text-luxury-gold`}
                                aria-label="Next Destinations"
                            >
                                <ChevronRight size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Destinations
