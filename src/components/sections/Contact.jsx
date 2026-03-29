import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
    const sectionRef = useRef(null)
    const formRef = useRef(null)
    const infoRef = useRef(null)

    useEffect(() => {
        // Fade-in animation for the whole section
        gsap.fromTo(
            [infoRef.current, formRef.current],
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.3,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            }
        )

        // Refresh triggers to ensure correct positions after layout shifts
        ScrollTrigger.refresh()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="section-padding bg-luxury-charcoal"
        >
            <div className="container-luxury">
                {/* Standardized Header */}
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-luxury-gold uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                        Get In Touch
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-luxury-off-white">
                        Let's Start Your <span className="text-gradient-gold italic pr-2">Journey Home</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left: Contact Info */}
                    <div ref={infoRef} className="space-y-12 lg:space-y-10 will-change-transform">
                        <div className="space-y-5 lg:space-y-4">
                            <p className="text-luxury-beige-light leading-relaxed max-w-xl lg:max-w-md text-sm sm:text-base will-change-[transform,opacity]">
                                Whether you're looking to acquire a masterpiece or list your exclusive
                                estate, our global advisors are here to assist you with unparalleled expertise.
                            </p>
                        </div>

                        <div className="space-y-8 lg:space-y-6 pt-6 lg:pt-8 xl:pt-10 will-change-[transform,opacity]">
                            <div className="flex items-start space-x-5 lg:space-x-4 group">
                                <div className="w-11 h-11 border border-luxury-gold/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-luxury-gold transition-luxury">
                                    <span className="text-luxury-gold text-xs">A</span>
                                </div>
                                <div className="space-y-1.5 lg:space-y-1">
                                    <h5 className="text-luxury-off-white text-[10px] sm:text-xs font-semibold uppercase tracking-widest">Office</h5>
                                    <p className="text-luxury-beige-light text-sm sm:text-base lg:text-sm leading-relaxed max-w-[200px] sm:max-w-none">
                                        789 Luxury Avenue, Mayfair<br />London, W1K 3AU, UK
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-5 lg:space-x-4 group">
                                <div className="w-11 h-11 border border-luxury-gold/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-luxury-gold transition-luxury">
                                    <span className="text-luxury-gold text-xs">P</span>
                                </div>
                                <div className="space-y-1.5 lg:space-y-1">
                                    <h5 className="text-luxury-off-white text-[10px] sm:text-xs font-semibold uppercase tracking-widest">Phone</h5>
                                    <p className="text-luxury-beige-light text-sm sm:text-base lg:text-sm tracking-wide">
                                        +44 (0) 20 7946 0123
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-5 lg:space-x-4 group">
                                <div className="w-11 h-11 border border-luxury-gold/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-luxury-gold transition-luxury">
                                    <span className="text-luxury-gold text-xs">E</span>
                                </div>
                                <div className="space-y-1.5 lg:space-y-1">
                                    <h5 className="text-luxury-off-white text-[10px] sm:text-xs font-semibold uppercase tracking-widest">Email</h5>
                                    <p className="text-luxury-beige-light text-sm sm:text-base lg:text-sm tracking-wide lowercase">
                                        concierge@luxe.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div ref={formRef} className="bg-luxury-black/30 p-6 sm:p-10 md:p-12 rounded-sm border border-luxury-charcoal-light backdrop-blur-sm will-change-transform">
                        <form className="space-y-6 lg:space-y-8" onSubmit={(e) => {
                            e.preventDefault()
                            const formData = new FormData(e.target)
                            const inquiry = {
                                id: Date.now(),
                                date: new Date().toISOString(),
                                name: formData.get('name'),
                                email: formData.get('email'),
                                message: formData.get('message'),
                                type: 'Contact',
                                status: 'New'
                            }

                            const existing = JSON.parse(localStorage.getItem('inquiries') || '[]')
                            localStorage.setItem('inquiries', JSON.stringify([inquiry, ...existing]))

                            // Visual feedback
                            const btn = e.target.querySelector('button[type="submit"]')
                            const originalText = btn.innerText
                            btn.innerText = 'SENT'
                            btn.disabled = true
                            setTimeout(() => {
                                btn.innerText = originalText
                                btn.disabled = false
                                e.target.reset()
                            }, 2000)
                        }}>
                            <div className="space-y-3">
                                <label htmlFor="name" className="block text-[10px] uppercase tracking-widest text-luxury-gold font-semibold">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Alexander Knight"
                                    className="w-full bg-transparent border-b border-luxury-charcoal-light py-3 text-sm sm:text-base text-luxury-off-white placeholder:text-white/30 focus:outline-none focus:border-luxury-gold transition-luxury"
                                />
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-luxury-gold font-semibold">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    placeholder="alexander@example.com"
                                    className="w-full bg-transparent border-b border-luxury-charcoal-light py-3 text-sm sm:text-base text-luxury-off-white placeholder:text-white/30 focus:outline-none focus:border-luxury-gold transition-luxury"
                                />
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="message" className="block text-[10px] uppercase tracking-widest text-luxury-gold font-semibold">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows="4"
                                    placeholder="I am interested in the Ocean View Villa..."
                                    className="w-full bg-transparent border-b border-luxury-charcoal-light py-3 text-sm sm:text-base text-luxury-off-white placeholder:text-white/30 focus:outline-none focus:border-luxury-gold transition-luxury resize-none"
                                ></textarea>
                            </div>

                            <div className="pt-4 lg:pt-6">
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-luxury-gold text-luxury-black font-semibold text-xs uppercase tracking-[0.2em] hover:bg-luxury-gold-light hover:shadow-xl hover:shadow-luxury-gold/20 transition-luxury active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed will-change-[transform,opacity,box-shadow]"
                                >
                                    Send Inquiry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
