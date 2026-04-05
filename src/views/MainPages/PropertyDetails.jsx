import { useParams, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, Check, Calendar, Car, Ruler, Scan, Bed, Bath, MapPin, DollarSign } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { properties } from '../../StaticData/properties'
import { agents } from '../../StaticData/agents'
import RelatedProperties from '../../components/ui/RelatedProperties'
import Contact from '../../components/sections/Contact'
import BookingModal from '../../components/ui/BookingModal'
import Breadcrumb from '../../components/ui/Breadcrumb'

gsap.registerPlugin(ScrollTrigger)

const PropertyDetails = () => {
    const { id } = useParams()
    const property = properties.find((p) => p.id === parseInt(id))

    const heroRef = useRef(null)
    const contentRef = useRef(null)
    const statsRef = useRef(null)

    const [isBookingOpen, setIsBookingOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Ensure gallery properties exist or fallback to main image
    // Ensure gallery properties exist and include the main image
    const images = property ? [property.image, ...(property.gallery || [])].filter(Boolean) : []

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    // Helper to get next images for preview
    const getNextImage = (offset) => images[(currentImageIndex + offset) % images.length]

    // Auto-slider for hero images
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [images.length])

    useEffect(() => {
        if (!property) return

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        // Initial Entrance (Background scale)
        tl.fromTo(
            heroRef.current,
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5 }
        )

        // Reveal animations for content on scroll
        gsap.fromTo(
            contentRef.current.children,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 85%",
                }
            }
        )

        gsap.fromTo(
            statsRef.current.children,
            { x: 30, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 85%",
                }
            }
        )

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    }, [id, property])

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-luxury-black text-luxury-off-white">
                <div className="text-center">
                    <h1 className="text-4xl font-display mb-6">Property Not Found</h1>
                    <Link to="/listing" className="text-luxury-gold hover:underline uppercase tracking-widest text-sm">
                        Back to Collection
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-luxury-black text-luxury-off-white">
            {/* Hero Section */}
            <div className="relative h-screen w-full overflow-hidden">
                {/* Background Image with Crossfade Transition */}
                <div className="absolute inset-0 w-full h-full" ref={heroRef}>
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <img
                                src={img}
                                alt={`${property.title} - view ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-pure-black/40" />
                            {/* Top Gradient for Header Visibility */}
                            <div className="absolute inset-0 bg-gradient-to-b from-pure-black/60 via-pure-black/20 to-transparent h-1/3" />
                        </div>
                    ))}
                </div>

                {/* Main Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-20 z-10 pointer-events-none">
                    <div className="max-w-4xl pointer-events-auto ml-0 md:ml-20">
                        <div className="flex flex-col mb-4">
                            <h1 className="text-4xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-[7.5rem] font-display text-pure-white mb-2 leading-tight drop-shadow-lg">
                                {property.title}
                            </h1>
                            <div className="flex items-center gap-2 text-pure-white/80 mb-4 md:mb-6 drop-shadow-md">
                                <MapPin size={16} className="text-luxury-gold" />
                                <span className="text-base md:text-lg font-light tracking-wide">{property.location}</span>
                            </div>
                        </div>
                        <p className="text-base md:text-xl text-pure-white/90 max-w-2xl mb-6 md:mb-8 leading-relaxed font-light drop-shadow-md">
                            {property.description}
                        </p>
                        <button
                            onClick={() => setIsBookingOpen(true)}
                            className="bg-luxury-gold text-pure-black px-8 md:px-10 lg:px-11 xl:px-12 py-3 md:py-4 lg:py-[18px] xl:py-5 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs xl:text-sm hover:bg-pure-white hover:text-pure-black transition-colors duration-300 pointer-events-auto shadow-2xl"
                        >
                            Make Enquiry
                        </button>
                    </div>
                </div>

                {/* Navigation Controls (Bottom Right) */}
                <div className="absolute bottom-8 md:bottom-12 right-6 md:right-20 z-20 hidden xl:flex flex-col gap-4 items-end">

                    {/* Thumbnails Row */}
                    <div className="flex gap-4 md:gap-8">
                        {/* Preview 1 */}
                        <div className="hidden md:block group cursor-pointer" onClick={nextImage}>
                            <p className="text-[10px] uppercase tracking-widest text-pure-white/50 mb-2 group-hover:text-pure-white transition-colors">Next</p>
                            <div className="w-72 h-44 overflow-hidden border border-pure-white/20 relative">
                                <img
                                    src={getNextImage(1)}
                                    alt="Next preview"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        </div>

                        {/* Preview 2 */}
                        <div className="hidden md:block group cursor-pointer" onClick={() => setCurrentImageIndex((currentImageIndex + 2) % images.length)}>
                            <p className="text-[10px] uppercase tracking-widest text-pure-white/50 mb-2 group-hover:text-pure-white transition-colors">Upcoming</p>
                            <div className="w-72 h-44 overflow-hidden border border-pure-white/20 relative">
                                <img
                                    src={getNextImage(2)}
                                    alt="Upcoming preview"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Directional Buttons */}
                    <div className="flex items-center gap-6 mt-2">
                        <button
                            onClick={prevImage}
                            className="flex items-center gap-2 text-pure-white/70 hover:text-luxury-gold transition-colors group uppercase text-[10px] md:text-xs tracking-widest font-medium"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> Prev
                        </button>
                        <button
                            onClick={nextImage}
                            className="flex items-center gap-2 text-pure-white/70 hover:text-luxury-gold transition-colors group uppercase text-[10px] md:text-xs tracking-widest font-medium"
                        >
                            Next <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>

                </div>

                {/* Pagination Counter (Bottom Left) */}
                <div className="absolute bottom-8 md:bottom-12 left-6 md:right-auto md:left-20 z-20 hidden xl:block">
                    <div className="flex items-center gap-2 bg-pure-black/30 backdrop-blur-md px-3 py-1 md:px-4 md:py-2 rounded-full border border-pure-white/10">
                        <span className="text-luxury-gold font-bold font-display text-base md:text-lg">
                            {String(currentImageIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="text-pure-white/30 text-[10px] md:text-xs">/</span>
                        <span className="text-pure-white/50 font-display text-xs md:text-sm">
                            {String(images.length).padStart(2, '0')}
                        </span>
                    </div>
                </div>

            </div>

            {/* Introductory Content */}
            <div className="section-padding py-16 md:py-24">
                <div className="container-luxury grid grid-cols-1 xl:grid-cols-3 gap-16">
                    <div className="xl:col-span-2" ref={contentRef}>
                        {/* Breadcrumb */}
                        <div className="mb-8">
                            <Breadcrumb items={[
                                { label: 'Properties', path: '/listing' },
                                { label: property.title, path: `/property/${property.id}` }
                            ]} />
                        </div>

                        <div className="mb-8">
                            <h2 className="text-luxury-gold uppercase tracking-widest text-xs font-semibold mb-6">
                                The Masterpiece
                            </h2>
                            <p className="text-xl md:text-2xl leading-relaxed font-display text-luxury-off-white/90 max-w-3xl">
                                {property.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-y-6 gap-x-4 mt-8 pt-8 border-t border-white/5">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-luxury-gold mb-2">Investment</p>
                                <p className="text-lg md:text-xl font-display text-white">{property.price}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-luxury-gold mb-2">Property Type</p>
                                <p className="text-base md:text-lg font-display text-white">{property.type}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-luxury-gold mb-2">Listing Status</p>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse"></span>
                                    <p className="text-base md:text-lg font-display text-white">{property.status}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-luxury-gold mb-2">Region</p>
                                <p className="text-base md:text-lg font-display text-white">{property.region}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-luxury-gold mb-2">Client Rating</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-luxury-gold">★</span>
                                    <p className="text-base md:text-lg font-display text-white">{property.rating} <span className="text-[10px] md:text-sm text-white/30">/ 5.0</span></p>
                                </div>
                            </div>
                        </div>


                        {/* Features & Highlights */}
                        <div className="mt-12 pt-12 border-t border-white/5">
                            <h3 className="text-luxury-gold uppercase tracking-widest text-xs font-semibold mb-8 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-luxury-gold"></span>
                                Features & Highlights
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {property.features?.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-4 bg-white/5 p-4 border border-white/5 hover:border-luxury-gold/30 transition-colors group">
                                        <div className="w-6 h-6 rounded-full bg-luxury-gold/10 flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors">
                                            <Check size={12} className="text-luxury-gold" />
                                        </div>
                                        <span className="text-luxury-off-white font-display text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Premium Amenities */}
                        {property.amenities && (
                            <div className="mt-12 pt-12 border-t border-white/5">
                                <h3 className="text-luxury-gold uppercase tracking-widest text-xs font-semibold mb-8 flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-luxury-gold"></span>
                                    Premium Amenities
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                    {property.amenities.map((amenity, index) => (
                                        <div key={index} className="bg-luxury-black border border-white/10 p-4 md:p-6 flex items-center justify-center text-center hover:bg-white/5 transition-colors aspect-square md:aspect-video group">
                                            <span className="text-luxury-off-white font-display text-[10px] md:text-xs uppercase tracking-wider group-hover:text-luxury-gold transition-colors leading-relaxed">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}


                    </div>
                    <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-8 md:gap-12 xl:gap-0 self-start">
                        {/* Agent Card Sidebar */}
                        {agents.find(a => a.id === property.agentId) && (
                            <div className="bg-luxury-charcoal/80 p-8 border border-white/5 backdrop-blur-md mb-0 xl:mb-12 max-w-md xl:max-w-none mx-auto xl:mx-0 w-full self-start h-auto shadow-xl shadow-pure-black/5">
                                <div className="mb-6 relative group cursor-pointer overflow-hidden">
                                    <img
                                        src={agents.find(a => a.id === property.agentId).image}
                                        alt={agents.find(a => a.id === property.agentId).name}
                                        className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-pure-black/80 to-transparent opacity-80" />
                                    <div className="absolute bottom-4 left-4">
                                        <p className="text-[10px] text-luxury-gold tracking-widest uppercase mb-1 drop-shadow-md">Presented By</p>
                                        <p className="text-pure-white font-display text-lg drop-shadow-md">{agents.find(a => a.id === property.agentId).name}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <a
                                        href={`mailto:${agents.find(a => a.id === property.agentId).email}`}
                                        className="flex items-center justify-between w-full p-4 border border-white/10 hover:bg-luxury-gold hover:text-pure-black hover:border-luxury-gold transition-all duration-300 group"
                                    >
                                        <span className="text-xs uppercase tracking-widest font-semibold transition-colors">Email Agent</span>
                                        <Mail size={16} className="text-luxury-gold group-hover:text-pure-black transition-colors" />
                                    </a>
                                    <a
                                        href={`tel:${agents.find(a => a.id === property.agentId).phone}`}
                                        className="flex items-center justify-between w-full p-4 border border-white/10 hover:bg-luxury-gold hover:text-pure-black hover:border-luxury-gold transition-all duration-300 group"
                                    >
                                        <span className="text-xs uppercase tracking-widest font-semibold transition-colors">Call Agent</span>
                                        <Phone size={16} className="text-luxury-gold group-hover:text-pure-black transition-colors" />
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Property Details Grid Sidebar */}
                        <div className="bg-luxury-charcoal/80 p-8 border border-white/5 backdrop-blur-md max-w-md xl:max-w-none mx-auto xl:mx-0 w-full h-auto self-start shadow-xl shadow-pure-black/5">
                            <h3 className="text-luxury-gold uppercase tracking-widest text-[10px] font-bold mb-8 flex items-center gap-3">
                                <span className="w-6 h-[1px] bg-luxury-gold"></span>
                                Property Specifications
                            </h3>
                            <div className="grid grid-cols-2 gap-y-6 md:gap-y-8 gap-x-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-luxury-beige/50">
                                        <Calendar size={12} />
                                        <p className="text-[9px] uppercase tracking-widest">Year Built</p>
                                    </div>
                                    <p className="text-base font-display text-white">{property.yearBuilt || 'N/A'}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-luxury-beige/50">
                                        <Bed size={12} />
                                        <p className="text-[9px] uppercase tracking-widest">Beds</p>
                                    </div>
                                    <p className="text-base font-display text-white">{property.beds || 'N/A'}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-luxury-beige/50">
                                        <Bath size={12} />
                                        <p className="text-[9px] uppercase tracking-widest">Baths</p>
                                    </div>
                                    <p className="text-base font-display text-white">{property.baths || 'N/A'}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-luxury-beige/50">
                                        <Ruler size={12} />
                                        <p className="text-[9px] uppercase tracking-widest">Lot Size</p>
                                    </div>
                                    <p className="text-base font-display text-white">{property.lotSize || 'N/A'}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-luxury-beige/50">
                                        <Car size={12} />
                                        <p className="text-[9px] uppercase tracking-widest">Parking</p>
                                    </div>
                                    <p className="text-base font-display text-white">{property.parking || 'N/A'}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-luxury-beige/50">
                                        <Scan size={12} />
                                        <p className="text-[9px] uppercase tracking-widest">Area</p>
                                    </div>
                                    <p className="text-base font-display text-white">{property.sqft} <span className="text-[10px] text-white/40">sqft</span></p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



            {/* CTA Section */}
            <div className="section-padding py-16 md:py-24 bg-luxury-black">
                <div className="container-luxury text-center">
                    <h2 className="text-3xl md:text-display-md mb-6 md:mb-8">Begin Your Journey</h2>
                    <p className="text-luxury-beige-light max-w-xl mx-auto mb-8 md:mb-12 text-sm md:text-base">
                        Experience the ultimate in international luxury living. Our specialized advisors are ready to arrange your private viewing.
                    </p>
                    <button
                        onClick={() => setIsBookingOpen(true)}
                        className="px-8 md:px-16 py-4 md:py-6 bg-luxury-gold text-pure-black font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs transition-luxury hover:bg-luxury-off-white hover:text-luxury-black hover:shadow-2xl hover:shadow-luxury-gold/30"
                    >
                        Request Private Tour
                    </button>
                </div>
            </div>

            <RelatedProperties currentId={id} />
            <Contact />

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                propertyTitle={property.title}
            />
        </div>
    )
}

export default PropertyDetails
