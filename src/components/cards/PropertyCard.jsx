import { forwardRef } from 'react'
import { Link } from 'react-router-dom'


const PropertyCard = forwardRef(({ property, className = "" }, ref) => {
    return (
        <Link
            to={`/property/${property.id}`}
            ref={ref}

            className={`group relative overflow-hidden bg-luxury-charcoal-light rounded-sm shadow-xl shadow-pure-black/10 transition-luxury hover-lift cursor-pointer will-change-[transform,opacity] block ${className}`}
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-luxury duration-700 group-hover:scale-110 will-change-transform"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pure-black/90 via-pure-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-luxury duration-500"></div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-10">
                    <span className="px-4 py-1.5 bg-pure-black/80 backdrop-blur-md border border-luxury-gold/30 text-luxury-gold text-[10px] uppercase tracking-[0.2em] font-bold rounded-full">
                        {property.status}
                    </span>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 will-change-transform z-10">
                <h3 className="text-xl lg:text-lg xl:text-2xl font-display font-semibold text-pure-white mb-2 group-hover:text-luxury-gold transition-luxury drop-shadow-md">
                    {property.title}
                </h3>
                <div className="flex items-center text-pure-white/90 text-[10px] uppercase tracking-widest mb-3 opacity-90 drop-shadow-md">
                    <svg
                        className="w-3.5 h-3.5 mr-2 text-luxury-gold/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    {property.location}
                </div>
                <p className="text-luxury-gold text-base lg:text-sm xl:text-lg font-semibold tracking-wide">
                    {property.price}
                </p>
            </div>
        </Link>
    )
})

PropertyCard.displayName = 'PropertyCard'

export default PropertyCard
