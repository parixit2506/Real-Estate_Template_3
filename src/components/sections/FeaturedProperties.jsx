import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { properties as propertiesData } from '../../StaticData/properties'
import PropertyCard from '../cards/PropertyCard'

gsap.registerPlugin(ScrollTrigger)

const FeaturedProperties = () => {
    const cardsRef = useRef([])

    useEffect(() => {
        cardsRef.current.forEach((card, index) => {
            if (!card) return
            gsap.fromTo(
                card,
                {
                    scale: 0.9,
                    opacity: 0,
                    y: 60,
                },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        end: 'top 60%',
                        toggleActions: 'play none none reverse',
                    },
                    delay: index * 0.1,
                }
            )
        })
    }, [])

    return (
        <section id="properties" className="section-padding bg-luxury-charcoal">
            <div className="container-luxury">
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-luxury-gold uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                        Our Collection
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-luxury-off-white">
                        Featured <span className="text-gradient-gold italic pr-2">Properties</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {propertiesData.slice(0, 6).map((property, index) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            ref={(el) => (cardsRef.current[index] = el)}
                        />
                    ))}
                </div>

                <div className="mt-12 sm:mt-20 text-center">
                    <Link
                        to="/listing"
                        className="inline-block px-10 py-5 bg-transparent border border-luxury-gold text-luxury-gold font-semibold text-sm tracking-[0.2em] uppercase transition-luxury hover:bg-luxury-gold hover:text-luxury-black hover:shadow-2xl hover:shadow-luxury-gold/20"
                    >
                        Explore All Properties
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default FeaturedProperties
