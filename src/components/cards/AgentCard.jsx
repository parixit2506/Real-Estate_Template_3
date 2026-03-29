import { useState, useRef, useEffect } from 'react'
import { Mail, Phone, Instagram, Linkedin, Globe } from 'lucide-react'
import gsap from 'gsap'

const AgentCard = ({ agent }) => {
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef(null)
    const imageRef = useRef(null)

    useEffect(() => {
        const card = cardRef.current
        const image = imageRef.current

        const handleMouseMove = (e) => {
            if (!isHovered) return

            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            const centerX = rect.width / 2
            const centerY = rect.height / 2

            const rotateX = ((y - centerY) / centerY) * -5
            const rotateY = ((x - centerX) / centerX) * 5

            gsap.to(card, {
                rotateX,
                rotateY,
                duration: 0.5,
                ease: 'power2.out',
                transformPerspective: 1000
            })

            gsap.to(image, {
                scale: 1.1,
                duration: 0.5,
                ease: 'power2.out'
            })
        }

        const handleMouseLeave = () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out'
            })

            gsap.to(image, {
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            })
        }

        if (card) {
            card.addEventListener('mousemove', handleMouseMove)
            card.addEventListener('mouseleave', handleMouseLeave)
        }

        return () => {
            if (card) {
                card.removeEventListener('mousemove', handleMouseMove)
                card.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    }, [isHovered])

    return (
        <div
            ref={cardRef}
            className="group relative bg-luxury-charcoal border border-white/5 overflow-hidden transition-all duration-700"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Image Section */}
            <div className="relative h-[400px] overflow-hidden bg-luxury-black">
                <img
                    ref={imageRef}
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover transition-all duration-700"
                    onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.name)}&size=400&background=C9A961&color=0A0A0A&bold=true&format=svg`
                    }}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-t from-pure-black/90 via-pure-black/40 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-700"
                />

                {/* Specialty Badge */}
                <div className="absolute top-6 left-6 bg-luxury-gold px-4 py-2 shadow-lg">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-pure-black">
                        {agent.specialty}
                    </p>
                </div>

                {/* Stats Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-luxury-gold mb-1 drop-shadow-md">Total Sales</p>
                        <p className="text-2xl font-display text-pure-white drop-shadow-md">{agent.sales}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-luxury-gold mb-1 drop-shadow-md">Properties Sold</p>
                        <p className="text-2xl font-display text-pure-white drop-shadow-md">{agent.properties}</p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 bg-luxury-charcoal/90 backdrop-blur-md">
                {/* Name & Title */}
                <div className="mb-6 border-b border-luxury-gold/10 pb-6">
                    <h3 className="text-2xl font-display text-luxury-off-white mb-2 group-hover:text-luxury-gold transition-colors duration-300">
                        {agent.name}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-luxury-beige font-medium">
                        {agent.title}
                    </p>
                </div>

                {/* Bio */}
                <p className="text-sm leading-relaxed text-luxury-off-white/70 mb-6 line-clamp-3">
                    {agent.bio}
                </p>

                {/* Languages */}
                <div className="mb-6">
                    <p className="text-[10px] uppercase tracking-widest text-luxury-gold mb-2">Languages</p>
                    <div className="flex flex-wrap gap-2">
                        {agent.languages.map((lang, i) => (
                            <span
                                key={i}
                                className="text-xs px-3 py-1 bg-luxury-black border border-luxury-gold/10 text-luxury-off-white/80"
                            >
                                {lang}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Specialties */}
                <div className="mb-6 min-h-[80px]">
                    <p className="text-[10px] uppercase tracking-widest text-luxury-gold mb-2">Expertise</p>
                    <div className="flex flex-wrap gap-2">
                        {agent.specialties.slice(0, 3).map((specialty, i) => (
                            <span
                                key={i}
                                className="text-[10px] px-2 py-1 bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20"
                            >
                                {specialty}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6 pt-6 border-t border-white/5">
                    <a
                        href={`mailto:${agent.email}`}
                        className="flex items-center gap-3 text-sm text-luxury-off-white/70 hover:text-luxury-gold transition-colors group/link"
                    >
                        <Mail size={16} className="text-luxury-gold" />
                        <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                            {agent.email}
                        </span>
                    </a>
                    <a
                        href={`tel:${agent.phone}`}
                        className="flex items-center gap-3 text-sm text-luxury-off-white/70 hover:text-luxury-gold transition-colors group/link"
                    >
                        <Phone size={16} className="text-luxury-gold" />
                        <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                            {agent.phone}
                        </span>
                    </a>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 pt-4 border-t border-white/5">
                    {agent.social.instagram && (
                        <a
                            href={`https://instagram.com/${agent.social.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-luxury-gold/10 hover:bg-luxury-gold text-luxury-gold hover:text-pure-black transition-all duration-300 group/social border border-luxury-gold/20"
                        >
                            <Instagram size={18} className="group-hover/social:scale-110 transition-transform" />
                        </a>
                    )}
                    {agent.social.linkedin && (
                        <a
                            href={`https://linkedin.com/in/${agent.social.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-luxury-gold/10 hover:bg-luxury-gold text-luxury-gold hover:text-pure-black transition-all duration-300 group/social border border-luxury-gold/20"
                        >
                            <Linkedin size={18} className="group-hover/social:scale-110 transition-transform" />
                        </a>
                    )}
                </div>

                {/* CTA Button */}
                <button className="w-full mt-6 py-4 bg-transparent border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-pure-black transition-all duration-500 text-xs uppercase tracking-[0.3em] font-bold group/btn">
                    <span className="group-hover/btn:tracking-[0.4em] transition-all duration-300">
                        Schedule Consultation
                    </span>
                </button>
            </div>
        </div>
    )
}

export default AgentCard
