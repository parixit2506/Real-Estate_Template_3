import { useEffect, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { properties as propertiesData } from '../../StaticData/properties'
import PropertyCard from '../../components/cards/PropertyCard'
import LuxuryMapView from '../../components/ui/LuxuryMapView'
import Contact from '../../components/sections/Contact'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFilters } from '../../context/FilterContext'
import Breadcrumb from '../../components/ui/Breadcrumb'

gsap.registerPlugin(ScrollTrigger)

const ITEMS_PER_PAGE = 6

const PropertyListing = () => {
    const { filters, setIsFilterOpen } = useFilters()
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'map'
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
    const [isAnimating, setIsAnimating] = useState(false)


    const gridRef = useRef(null)
    const headerRef = useRef(null)
    const loadMoreBtnRef = useRef(null)
    const toggleRef = useRef(null)
    const [prevFilters, setPrevFilters] = useState(filters)

    if (filters !== prevFilters) {
        setPrevFilters(filters)
        setVisibleCount(ITEMS_PER_PAGE)
    }

    // Apply filtering
    // Apply filtering
    const filteredProperties = useMemo(() => {
        return propertiesData.filter(property => {
            // Region, Type, Status Logic
            const matchRegion = filters.region === 'All' || property.region === filters.region
            const matchType = filters.type === 'All' || property.type === filters.type
            const matchStatus = filters.status === 'All' || property.status === filters.status

            // Amenities Logic
            const matchAmenities = filters.amenities.length === 0 ||
                filters.amenities.every(amenity => property.features.includes(amenity))

            // Price Logic
            const price = parseInt(property.price.replace(/[^0-9]/g, ''))
            let matchPrice = true
            if (filters.priceRange !== 'All') {
                if (filters.priceRange === '$0 - $5M') matchPrice = price < 5000000
                else if (filters.priceRange === '$5M - $10M') matchPrice = price >= 5000000 && price < 10000000
                else if (filters.priceRange === '$10M - $20M') matchPrice = price >= 10000000 && price < 20000000
                else if (filters.priceRange === '$20M+') matchPrice = price >= 20000000
            }

            // Rating Logic
            let matchRating = true
            if (filters.rating !== 'Any') {
                const minRating = parseFloat(filters.rating.replace('+', ''))
                matchRating = (property.rating || 0) >= minRating
            }

            // Location Search Logic
            const matchLocation = filters.searchLocation === '' ||
                property.location.toLowerCase().includes(filters.searchLocation.toLowerCase()) ||
                property.title.toLowerCase().includes(filters.searchLocation.toLowerCase())

            return matchRegion && matchType && matchStatus && matchAmenities && matchPrice && matchRating && matchLocation
        })
    }, [filters])



    // Initial and filtered entrance animations
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

        tl.fromTo(
            headerRef.current.children,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, stagger: 0.15 }
        )
            .fromTo(
                toggleRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                '-=1'
            )

        if (gridRef.current) {
            tl.fromTo(
                gridRef.current.children,
                {
                    opacity: 0,
                    y: 100,
                    rotationX: -15,
                    transformOrigin: 'top center'
                },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 1.2,
                    stagger: 0.08,
                },
                '-=1.2'
            )
                .fromTo(
                    loadMoreBtnRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    '-=0.8'
                )
        }
    }, [filteredProperties, viewMode])

    const handleLoadMore = () => {
        setIsAnimating(true)
        const nextBatchStart = visibleCount
        const nextBatchEnd = visibleCount + ITEMS_PER_PAGE
        setVisibleCount(nextBatchEnd)

        // Animate new items
        setTimeout(() => {
            const nextItems = Array.from(gridRef.current.children).slice(nextBatchStart)
            gsap.fromTo(
                nextItems,
                {
                    opacity: 0,
                    y: 60,
                    rotationX: -10,
                    transformOrigin: 'top center'
                },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power3.out',
                    onComplete: () => setIsAnimating(false)
                }
            )
        }, 10)
    }

    const displayedProperties = filteredProperties.slice(0, visibleCount)
    const hasMore = visibleCount < filteredProperties.length

    // Comprehensive ScrollTrigger refresh for view changes, filtering, and pagination
    useEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh()
        }, 100)
        return () => clearTimeout(timer)
    }, [viewMode, filteredProperties, visibleCount])

    return (
        <div className="bg-luxury-black min-h-screen text-luxury-off-white">
            {/* Minimalist Header */}
            <div className="pt-24 sm:pt-32 pb-12 sm:pb-16 section-padding border-b border-white/5" ref={headerRef}>
                <div className="container-luxury">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Breadcrumb items={[{ label: 'Properties', path: '/listing' }]} />
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-display mb-6 sm:mb-8 leading-tight">
                        Exclusive Collection
                    </h1>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-16">
                        <p className="text-luxury-beige-light text-base sm:text-lg max-w-2xl leading-relaxed opacity-80">
                            Explore our world-class portfolio of architectural masterpieces and prestigious estates across the globe.
                        </p>

                        {/* View Toggle */}
                        <div ref={toggleRef} className="flex items-center p-1 bg-luxury-charcoal rounded-full border border-white/10 w-fit">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 whitespace-nowrap ${viewMode === 'grid' ? 'bg-luxury-gold text-luxury-black' : 'text-white/40 hover:text-white'}`}
                            >
                                Grid View
                            </button>
                            <button
                                onClick={() => setViewMode('map')}
                                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 whitespace-nowrap ${viewMode === 'map' ? 'bg-luxury-gold text-luxury-black' : 'text-white/40 hover:text-white'}`}
                            >
                                Map View
                            </button>
                            <div className="w-px h-5 sm:h-6 bg-white/10 mx-1 sm:mx-2"></div>
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 text-luxury-gold hover:text-white hover:bg-white/10 relative whitespace-nowrap"
                            >
                                Filters
                                {(filters.region !== 'All' ||
                                    filters.type !== 'All' ||
                                    filters.status !== 'All' ||
                                    filters.amenities.length > 0 ||
                                    filters.priceRange !== 'All' ||
                                    filters.rating !== 'Any' ||
                                    filters.searchLocation !== '') && (
                                        <span className="absolute top-1.5 sm:top-2 right-2 sm:right-4 w-1.5 h-1.5 bg-luxury-gold rounded-full animate-pulse"></span>
                                    )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="section-padding py-12 sm:py-20 lg:py-24 pb-24 sm:pb-32">
                <div className="container-luxury">
                    {filteredProperties.length > 0 ? (
                        <div className="flex flex-col gap-16 lg:gap-24">
                            {/* Map View - Conditional Display with Map-specific padding */}
                            {viewMode === 'map' && (
                                <div className="h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[400px] w-full border border-white/5 rounded-sm overflow-hidden shadow-2xl">
                                    <LuxuryMapView properties={filteredProperties} />
                                </div>
                            )}

                            {/* Properties Grid Area */}
                            <div>
                                {viewMode === 'map' && (
                                    <div className="mb-12 border-b border-white/5 pb-8 flex items-end justify-between">
                                        <div>
                                            <h2 className="text-2xl sm:text-3xl font-display text-white">Matching Estates</h2>
                                            <p className="text-luxury-beige/40 uppercase tracking-[0.2em] text-[10px] sm:text-xs mt-2">Showing {displayedProperties.length} of {filteredProperties.length} properties</p>
                                        </div>
                                    </div>
                                )}

                                <div
                                    ref={gridRef}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
                                >
                                    {displayedProperties.map((property) => (
                                        <PropertyCard
                                            key={property.id}
                                            property={property}
                                        />
                                    ))}
                                </div>

                                {hasMore && (
                                    <div className="mt-16 sm:mt-24 text-center">
                                        <button
                                            ref={loadMoreBtnRef}
                                            onClick={handleLoadMore}
                                            disabled={isAnimating}
                                            className={`group relative inline-flex items-center gap-4 px-8 sm:px-12 py-4 sm:py-5 bg-transparent border border-luxury-gold text-luxury-gold font-semibold text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase transition-all duration-500 hover:bg-luxury-gold hover:text-luxury-black ${isAnimating ? 'opacity-50 cursor-wait' : ''} active:scale-[0.98] w-full sm:w-auto justify-center`}
                                        >
                                            <span className="relative z-10 font-bold">Load More Estates</span>
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-500 group-hover:translate-y-1 ${isAnimating ? 'animate-bounce' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="py-20 sm:py-32 text-center">
                            <h3 className="text-xl sm:text-2xl font-display text-white mb-4 sm:mb-6">No properties match your selection</h3>
                            <p className="text-luxury-beige/40 uppercase tracking-[0.2em] text-[10px] sm:text-xs">Adjust your filters to explore alternative estates</p>
                        </div>
                    )}
                </div>
            </div>

            <Contact />
        </div>
    )
}

export default PropertyListing
