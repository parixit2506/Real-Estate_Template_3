import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

// Custom Luxury Marker Icon
const luxuryIcon = new L.DivIcon({
    className: 'custom-luxury-marker',
    html: `<div class="w-8 h-8 bg-luxury-gold/20 border-2 border-luxury-gold rounded-full flex items-center justify-center animate-pulse">
             <div class="w-2 h-2 bg-luxury-gold rounded-full shadow-[0_0_10px_#C9A961]"></div>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
})

// Auto-zooming/centering logic based on filtered properties
const MapController = ({ properties }) => {
    const map = useMap()

    useEffect(() => {
        if (properties.length > 0) {
            const bounds = L.latLngBounds(properties.map(p => [p.coordinates.lat, p.coordinates.lng]))

            // Dynamic padding based on screen width
            const isSmallScreen = window.innerWidth < 768
            const padding = isSmallScreen ? [30, 30] : [80, 80]

            map.fitBounds(bounds, {
                padding: padding,
                maxZoom: 12,
                animate: true,
                duration: 1.5
            })
        }
    }, [properties, map])

    return null
}

const LuxuryMapView = ({ properties }) => {
    const containerRef = useRef(null)

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, scale: 0.99 },
            { opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out' }
        )
    }, [])

    return (
        <div
            ref={containerRef}
            className="w-full h-[50vh] sm:h-[60vh] lg:h-[75vh] min-h-[400px] lg:min-h-[600px] rounded-sm overflow-hidden border border-white/5 shadow-2xl relative transition-all duration-700"
        >
            <MapContainer
                center={[20, 0]}
                zoom={2}
                scrollWheelZoom={true}
                className="w-full h-full z-10"
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                <MapController properties={properties} />

                {properties.map((property) => (
                    <Marker
                        key={property.id}
                        position={[property.coordinates.lat, property.coordinates.lng]}
                        icon={luxuryIcon}
                    >
                        <Popup className="luxury-popup" keepInView={true}>
                            <div className="p-3 w-[220px] sm:w-[260px] bg-luxury-black text-luxury-off-white border-luxury-gold/30">
                                <div className="relative group overflow-hidden mb-4">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-full h-24 sm:h-28 object-cover rounded-sm transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-60"></div>
                                </div>

                                <h4 className="text-base sm:text-lg font-display mb-1 leading-tight tracking-tight">{property.title}</h4>
                                <p className="text-[9px] uppercase tracking-[0.2em] text-luxury-gold mb-4 opacity-80">{property.location}</p>

                                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                                    <span className="font-semibold text-sm sm:text-base text-luxury-off-white">{property.price}</span>
                                    <Link
                                        to={`/property/${property.id}`}
                                        className="text-[9px] uppercase tracking-[0.25em] text-luxury-gold hover:text-white transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        Details
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </Link>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Map Overlay Decor */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-[20] flex flex-col space-y-1.5 pointer-events-none select-none">
                <div className="flex items-center gap-3">
                    <div className="w-8 sm:w-12 h-[1px] bg-luxury-gold opacity-50"></div>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-luxury-gold font-bold">Global Portfolio</span>
                </div>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-white/30 ml-11 sm:ml-15">Geographic View Mode</span>
            </div>

            {/* Vignette effect for more luxury feel */}
            <div className="absolute inset-0 pointer-events-none z-[15] shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
        </div>
    )
}

export default LuxuryMapView
