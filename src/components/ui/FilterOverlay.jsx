import { useEffect, useRef } from 'react'
import gsap from 'gsap'


const FilterOverlay = ({ isOpen, onClose, filters, onFilterChange }) => {
    const overlayRef = useRef(null)
    const contentRef = useRef(null)

    const regions = ['All', 'Americas', 'Europe', 'Asia', 'Middle East']
    const types = ['All', 'Villa', 'Penthouse', 'Chalet', 'Loft', 'Mansion']
    const statuses = [
        { label: 'All', value: 'All' },
        { label: 'Buy', value: 'For Sale' },
        { label: 'Rent', value: 'For Rent' }
    ]
    const amenities = [
        'Infinity Pool',
        'Private Beach Access',
        'Spa & Sauna',
        'Home Theater',
        'Fitness Center',
        'Wine Cellar'
    ]

    const priceRanges = ['All', '$0 - $5M', '$5M - $10M', '$10M - $20M', '$20M+']


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'

            const tl = gsap.timeline()
            tl.to(overlayRef.current, {
                opacity: 1,
                visibility: 'visible',
                duration: 0.5,
                ease: 'power3.out'
            })
            tl.fromTo(contentRef.current.children,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
                '-=0.3'
            )

            const handleEsc = (e) => {
                if (e.key === 'Escape') onClose()
            }
            window.addEventListener('keydown', handleEsc)
            return () => window.removeEventListener('keydown', handleEsc)
        } else {
            document.body.style.overflow = ''

            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.4,
                ease: 'power3.in',
                onComplete: () => {
                    gsap.set(overlayRef.current, { visibility: 'hidden' })
                }
            })
        }
    }, [isOpen, onClose])

    const handleFilterClick = (category, value) => {
        onFilterChange({ ...filters, [category]: value })
    }

    const toggleAmenity = (amenity) => {
        const newAmenities = filters.amenities.includes(amenity)
            ? filters.amenities.filter(a => a !== amenity)
            : [...filters.amenities, amenity]
        onFilterChange({ ...filters, amenities: newAmenities })
    }

    const clearFilters = () => {
        onFilterChange({
            region: 'All',
            type: 'All',
            status: 'All',
            amenities: [],
            priceRange: 'All',
            rating: 'Any',
            searchLocation: ''
        })
    }

    const handleInputChange = (e) => {
        // No sound for typing to avoid audio spam
        onFilterChange({ ...filters, searchLocation: e.target.value })
    }

    return (
        <div
            ref={overlayRef}
            data-lenis-prevent="true"
            className="fixed inset-0 z-[10000] invisible opacity-0 bg-luxury-black/98 backdrop-blur-2xl overflow-y-auto overscroll-contain"
        >
            <div className="min-h-screen flex items-start sm:items-center justify-center py-12 px-6 sm:p-12 md:p-20">
                <button
                    onClick={() => {
                        onClose()
                    }}
                    className="fixed top-6 right-6 sm:top-10 sm:right-10 text-luxury-gold hover:text-white transition-all duration-500 uppercase tracking-[0.3em] text-[10px] sm:text-xs font-bold p-4 z-50 flex items-center gap-2 group"
                >
                    <span className="hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
                    <span className="text-lg sm:text-xs">✕</span>
                    <span className="hidden sm:inline-block ml-1 opacity-40 group-hover:opacity-100">(ESC)</span>
                </button>

                <div ref={contentRef} className="container-luxury max-w-4xl w-full relative pt-12 sm:pt-0">
                    <div className="mb-10 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-white mb-2 leading-tight">Find Your Estate</h2>
                        <p className="text-luxury-beige/60 uppercase tracking-[0.25em] text-[10px] sm:text-xs">Refine your search across our global portfolio</p>
                    </div>

                    {/* Location Search */}
                    <div className="mb-10 sm:mb-16">
                        <h3 className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4 sm:mb-6">Location</h3>
                        <input
                            type="text"
                            placeholder="Search by city, state, or country..."
                            value={filters.searchLocation}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-white/10 py-3 sm:py-4 text-lg sm:text-xl md:text-2xl font-display text-white placeholder-white/20 focus:outline-none focus:border-luxury-gold transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16">
                        <div className="space-y-10 sm:space-y-12">
                            {/* Property Status Filter */}
                            <section>
                                <h3 className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4 sm:mb-6">Property Status</h3>
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    {statuses.map(s => (
                                        <button
                                            key={s.value}
                                            onClick={() => handleFilterClick('status', s.value)}
                                            className={`px-6 sm:px-8 py-2 border transition-all duration-500 text-[10px] sm:text-xs tracking-widest uppercase ${filters.status === s.value
                                                ? 'bg-luxury-gold border-luxury-gold text-luxury-black font-bold'
                                                : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                                                }`}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* Price Range Filter */}
                            <section>
                                <h3 className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4 sm:mb-6">Price Range</h3>
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    {priceRanges.map(range => (
                                        <button
                                            key={range}
                                            onClick={() => handleFilterClick('priceRange', range)}
                                            className={`px-5 sm:px-6 py-2 border transition-all duration-500 text-[10px] sm:text-xs tracking-widest uppercase ${filters.priceRange === range
                                                ? 'bg-luxury-gold border-luxury-gold text-luxury-black font-bold'
                                                : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                                                }`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* Region Filter */}
                            <section>
                                <h3 className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4 sm:mb-6">Region</h3>
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    {regions.map(region => (
                                        <button
                                            key={region}
                                            onClick={() => handleFilterClick('region', region)}
                                            className={`px-5 sm:px-6 py-2 border transition-all duration-500 text-[10px] sm:text-xs tracking-widest uppercase ${filters.region === region
                                                ? 'bg-luxury-gold border-luxury-gold text-luxury-black font-bold'
                                                : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                                                }`}
                                        >
                                            {region}
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className="space-y-10 sm:space-y-12">
                            {/* Property Type Filter */}
                            <section>
                                <h3 className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4 sm:mb-6">Property Type</h3>
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    {types.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => handleFilterClick('type', type)}
                                            className={`px-5 sm:px-6 py-2 border transition-all duration-500 text-[10px] sm:text-xs tracking-widest uppercase ${filters.type === type
                                                ? 'bg-luxury-gold border-luxury-gold text-luxury-black font-bold'
                                                : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* Amenities Filter */}
                            <section>
                                <h3 className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4 sm:mb-6">Amenities</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-x-4">
                                    {amenities.map(amenity => (
                                        <button
                                            key={amenity}
                                            onClick={() => toggleAmenity(amenity)}
                                            className={`flex items-center space-x-3 text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-300 text-left ${filters.amenities.includes(amenity)
                                                ? 'text-luxury-gold font-bold'
                                                : 'text-white/40 hover:text-white'
                                                }`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full ${filters.amenities.includes(amenity) ? 'bg-luxury-gold' : 'bg-white/10'
                                                }`} />
                                            <span>{amenity}</span>
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <div className="pt-8 sm:pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
                                <button
                                    onClick={clearFilters}
                                    className="text-white/30 hover:text-luxury-gold transition-luxury uppercase tracking-widest text-[10px] font-medium active:scale-95"
                                >
                                    Clear All Filters
                                </button>
                                <button
                                    onClick={() => {
                                        onClose()
                                    }}
                                    className="w-full sm:w-auto px-12 py-4 bg-luxury-gold text-luxury-black font-bold uppercase tracking-[0.2em] text-xs transition-all duration-500 hover:bg-white active:scale-[0.98]"
                                >
                                    Show Results
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterOverlay
