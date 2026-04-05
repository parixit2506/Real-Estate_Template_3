import { useEffect, useRef, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { Search, X, MapPin, Home, DollarSign } from 'lucide-react'
import { properties } from '../../StaticData/properties'

const SearchOverlay = ({ isOpen, onClose, searchQuery, setSearchQuery }) => {
	const overlayRef = useRef(null)
	const contentRef = useRef(null)
	const inputRef = useRef(null)
	const navigate = useNavigate()

	// Extract unique regions from properties
	const popularRegions = [...new Set(properties.map(p => p.region))].sort()

	// Generate dynamic quick links from property types and locations (excluding New York for variety)
	const quickLinks = properties
		.filter(p => !p.location.toLowerCase().includes('new york'))
		.slice(0, 4)
		.map(p => `${p.location.split(',')[0]} ${p.type}`)

	const wasOpen = useRef(false)

	useEffect(() => {
		if (isOpen) {
			wasOpen.current = true
			document.body.style.overflow = 'hidden'
			if (window.lenis) window.lenis.stop()

			// Focus input after a short delay for animation
			setTimeout(() => {
				inputRef.current?.focus()
			}, 600)

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
			return () => {
				window.removeEventListener('keydown', handleEsc)
				if (window.lenis) window.lenis.start()
			}
		} else if (wasOpen.current) {
			wasOpen.current = false
			document.body.style.overflow = ''
			if (window.lenis) window.lenis.start()

			gsap.to(overlayRef.current, {
				opacity: 0,
				duration: 0.4,
				ease: 'power3.in',
				onComplete: () => {
					gsap.set(overlayRef.current, { visibility: 'hidden' })
					setSearchQuery('') // Clear only when explicitly closing
				}
			})
		}
	}, [isOpen, onClose, setSearchQuery])

	const results = useMemo(() => {
		if (searchQuery.trim().length > 1) {
			return properties.filter(property =>
				property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
				property.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
				property.region.toLowerCase().includes(searchQuery.toLowerCase())
			).slice(0, 5) // Limit results
		} else {
			return []
		}
	}, [searchQuery])

	const handleResultClick = (id) => {
		onClose()
		navigate(`/property/${id}`)
	}

	return (
		<div
			ref={overlayRef}
			data-lenis-prevent
			className="fixed inset-0 z-[10001] invisible opacity-0 bg-luxury-black/98 backdrop-blur-2xl overflow-y-auto scrollbar-hide"
		>
			<div className="min-h-full flex flex-col items-center justify-start pt-[8vh] sm:pt-[15vh] px-4 sm:px-12">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 sm:top-10 sm:right-10 group p-4 z-[10002]"
					title="Close Search"
					aria-label="Close Search"
				>
					<div className="relative w-6 h-6 sm:w-8 h-8 flex justify-center items-center transition-transform duration-500 group-hover:rotate-90">
						<span className="absolute w-6 sm:w-8 h-[2px] bg-white rotate-45"></span>
						<span className="absolute w-6 sm:w-8 h-[2px] bg-white -rotate-45"></span>
					</div>
				</button>

				<div ref={contentRef} className="max-w-3xl w-full pb-20">
					{/* Search Header */}
					<div className="mb-6 sm:mb-12">
						<h2 className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-3 sm:mb-6">Global Search</h2>
						<div className="relative group overflow-hidden">
							<Search className="absolute left-0 top-1/2 -translate-y-1/2 text-luxury-gold group-focus-within:scale-110 transition-transform" size={24} />
							<input
								ref={inputRef}
								type="text"
								placeholder="Search by location, villa name, or type..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full bg-transparent border-b border-white/10 pl-9 sm:pl-12 pr-10 py-3 sm:py-6 text-sm sm:text-2xl md:text-4xl font-display text-white placeholder-white/10 focus:outline-none focus:border-luxury-gold transition-colors tracking-tight"
							/>
							{searchQuery && (
								<button
									onClick={() => {
										setSearchQuery('')
										inputRef.current?.focus()
									}}
									className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-luxury-gold transition-colors p-2"
									title="Clear Search"
									aria-label="Clear Search"
								>
									<X size={20} className="sm:size-6" />
								</button>
							)}
						</div>
					</div>

					{/* Results Section */}
					<div className="space-y-5 sm:space-y-8">
						{results.length > 0 ? (
							<div className="space-y-4">
								<h3 className="text-white/20 uppercase tracking-widest text-[10px] font-bold">Suggested Properties</h3>
								<div className="grid gap-3">
									{results.map((property) => (
										<button
											key={property.id}
											onClick={() => handleResultClick(property.id)}
											className="group w-full flex items-center gap-4 sm:gap-6 p-3 sm:p-4 rounded-xl hover:bg-white/5 transition-all duration-300 text-left border border-transparent hover:border-white/10"
										>
											<div className="w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-lg">
												<img
													src={property.image}
													alt={property.title}
													className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
												/>
											</div>
											<div className="flex-1">
												<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-1.5 sm:mb-1">
													<h4 className="text-white font-display text-base sm:text-xl group-hover:text-luxury-gold transition-colors leading-tight">{property.title}</h4>
													<span className="text-luxury-gold font-medium text-sm sm:text-base">{property.price}</span>
												</div>
												<div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-sm text-white/40">
													<span className="flex items-center gap-1.5 whitespace-nowrap"><MapPin size={10} className="sm:size-3" strokeWidth={1.5} /> {property.location}</span>
													<span className="flex items-center gap-1.5 whitespace-nowrap"><Home size={10} className="sm:size-3" strokeWidth={1.5} /> {property.type}</span>
												</div>
											</div>
										</button>
									))}
								</div>
							</div>
						) : searchQuery.length > 1 ? (
							<div className="py-12 text-center px-4">
								<p className="text-white/40 text-lg italic font-light break-words">
									No properties found for <span className="text-white/60 break-all">"{searchQuery}"</span>
								</p>
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 pt-4 sm:pt-8">
								<div>
									<h3 className="text-luxury-gold uppercase tracking-[0.2em] text-[10px] font-bold mb-4 sm:mb-6">Quick Links</h3>
									<div className="flex flex-col gap-4">
										{quickLinks.map((link) => (
											<button
												key={link}
												onClick={() => setSearchQuery(link.split(' ')[0])}
												className="text-white/60 hover:text-white transition-colors text-base sm:text-lg font-light text-left flex items-center gap-3 group"
											>
												<span className="w-1.5 h-1.5 rounded-full bg-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity" />
												{link}
											</button>
										))}
									</div>
								</div>
								<div>
									<h3 className="text-luxury-gold uppercase tracking-[0.2em] text-[10px] font-bold mb-4 sm:mb-6">Popular Regions</h3>
									<div className="flex flex-wrap gap-2">
										{popularRegions.map((region) => (
											<button
												key={region}
												onClick={() => setSearchQuery(region)}
												className="px-3 py-1.5 sm:px-4 sm:py-2 border border-white/5 bg-white/5 hover:border-luxury-gold hover:text-luxury-gold text-white/60 text-[10px] sm:text-xs tracking-widest uppercase transition-all"
											>
												{region}
											</button>
										))}
									</div>
								</div>
							</div>
						)}
					</div>

					{/* Footer Info */}
					<div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/5 flex justify-between items-center text-white/20 text-[8px] sm:text-[10px] uppercase tracking-widest font-bold">
						<span className="hidden lg:block">Press ESC to close</span>
						<span>Luxe Global Portfolio v2.0</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchOverlay
