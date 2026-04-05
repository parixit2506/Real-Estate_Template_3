import { Link } from 'react-router-dom'
import PropertyCard from '../cards/PropertyCard'
import { properties as propertiesData } from '../../StaticData/properties'

const RelatedProperties = ({ currentId }) => {
    // Filter out the current property and take up to 3 others
    const related = propertiesData
        .filter((p) => p.id !== parseInt(currentId))
        .slice(0, 3)

    return (
        <section className="section-padding py-16 md:py-24 bg-luxury-black border-t border-white/5">
            <div className="container-luxury">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="text-luxury-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4">
                            Recommendation
                        </h2>
                        <h3 className="text-display-sm text-luxury-off-white font-display">
                            Other Exclusive Estates
                        </h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {related.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                        />
                    ))}
                </div>

                {/* Bottom View All Button */}
                <div className="flex justify-center">
                    <Link
                        to="/listing"
                        className="px-8 md:px-12 py-5 bg-transparent border border-white/10 text-luxury-gold uppercase tracking-[0.1em] md:tracking-[0.3em] text-[10px] md:text-xs font-bold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-500 text-center"
                    >
                        Explore Full Collection
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default RelatedProperties
