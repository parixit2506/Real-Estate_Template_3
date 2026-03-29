import { useEffect, useRef, useState } from 'react'
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react'
import gsap from 'gsap'

const BookingModal = ({ isOpen, onClose, propertyTitle }) => {
    const overlayRef = useRef(null)
    const modalRef = useRef(null)
    const formRef = useRef(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [shouldRender, setShouldRender] = useState(isOpen)

    if (isOpen && !shouldRender) {
        setShouldRender(true)
        setIsSubmitted(false)
    }

    useEffect(() => {
        if (isOpen) {


            const tl = gsap.timeline()

            // Overlay fade in
            tl.to(overlayRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
                pointerEvents: 'auto'
            })

            // Modal slide up and fade in
            tl.fromTo(modalRef.current,
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
                '-=0.3'
            )

            // Form elements stagger
            if (formRef.current) {
                tl.fromTo(formRef.current.children,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
                    '-=0.4'
                )
            }
        } else {
            const tl = gsap.timeline()

            tl.to(modalRef.current, {
                y: 20,
                opacity: 0,
                scale: 0.95,
                duration: 0.4,
                ease: 'power2.in'
            })

            tl.to(overlayRef.current, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in',
                pointerEvents: 'none',
                onComplete: () => setShouldRender(false)
            }, '-=0.2')
        }
    }, [isOpen])



    if (!shouldRender) return null

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8 opacity-0 pointer-events-none"
        >
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-luxury-black/90 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                ref={modalRef}
                className="relative w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] bg-luxury-charcoal border border-white/10 shadow-2xl overflow-y-auto scrollbar-hide"
            >
                {/* Decorative top strip */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent opacity-50" />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-luxury-gold transition-colors z-10"
                >
                    <X size={22} className="md:w-6 md:h-6" strokeWidth={1} />
                </button>

                <div className="p-5 md:p-12">
                    {!isSubmitted ? (
                        <>
                            <div className="mb-6 md:mb-10 text-center">
                                <span className="text-luxury-gold text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">Inquire Now</span>
                                <h2 className="text-2xl md:text-4xl font-display text-white mt-2 md:mt-3 mb-2 md:mb-4">Request Private Tour</h2>
                                <p className="text-luxury-beige/60 text-xs md:text-sm max-w-md mx-auto">
                                    Schedule a viewing for <span className="text-luxury-off-white font-medium">{propertyTitle}</span> with our property specialists.
                                </p>
                            </div>

                            <form ref={formRef} onSubmit={(e) => {
                                e.preventDefault()
                                const formData = new FormData(e.target)
                                const inquiry = {
                                    id: Date.now(),
                                    date: new Date().toISOString(),
                                    name: formData.get('name'),
                                    email: formData.get('email'),
                                    phone: formData.get('phone'),
                                    preferredDate: formData.get('preferredDate'),
                                    message: formData.get('message'),
                                    property: propertyTitle,
                                    type: 'Property Inquiry',
                                    status: 'New'
                                }

                                const existing = JSON.parse(localStorage.getItem('inquiries') || '[]')
                                localStorage.setItem('inquiries', JSON.stringify([inquiry, ...existing]))

                                // Simulate API call for UI feedback
                                const btn = e.target.querySelector('button[type="submit"]')
                                const originalText = btn.innerText
                                btn.innerText = 'SENDING...'

                                setTimeout(() => {
                                    setIsSubmitted(true)
                                    btn.innerText = originalText
                                }, 1500)
                            }} className="space-y-4 md:space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-luxury-gold ml-1">Full Name</label>
                                        <div className="relative group">
                                            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-luxury-gold transition-colors" />
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                className="w-full bg-luxury-black/50 border border-white/10 px-10 py-3 md:py-4 text-sm text-luxury-off-white placeholder:text-white/20 focus:outline-none focus:border-luxury-gold/50 transition-all hover:border-white/20"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-luxury-gold ml-1">Email Address</label>
                                        <div className="relative group">
                                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-luxury-gold transition-colors" />
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                className="w-full bg-luxury-black/50 border border-white/10 px-10 py-3 md:py-4 text-sm text-luxury-off-white placeholder:text-white/20 focus:outline-none focus:border-luxury-gold/50 transition-all hover:border-white/20"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-luxury-gold ml-1">Phone Number</label>
                                        <div className="relative group">
                                            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-luxury-gold transition-colors" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="w-full bg-luxury-black/50 border border-white/10 px-10 py-3 md:py-4 text-sm text-luxury-off-white placeholder:text-white/20 focus:outline-none focus:border-luxury-gold/50 transition-all hover:border-white/20"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-luxury-gold ml-1">Preferred Date</label>
                                        <div className="relative group">
                                            <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-luxury-gold transition-colors" />
                                            <input
                                                type="date"
                                                name="preferredDate"
                                                className="w-full bg-luxury-black/50 border border-white/10 px-10 py-3 md:py-4 text-sm text-luxury-off-white placeholder:text-white/20 focus:outline-none focus:border-luxury-gold/50 transition-all hover:border-white/20 [color-scheme:dark]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5 md:space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-luxury-gold ml-1">Message (Optional)</label>
                                    <div className="relative group">
                                        <MessageSquare size={16} className="absolute left-4 top-6 text-white/30 group-focus-within:text-luxury-gold transition-colors" />
                                        <textarea
                                            rows={3}
                                            name="message"
                                            className="w-full bg-luxury-black/50 border border-white/10 px-10 py-3 md:py-4 text-sm text-luxury-off-white placeholder:text-white/20 focus:outline-none focus:border-luxury-gold/50 transition-all hover:border-white/20 resize-none"
                                            placeholder="I would like to know more about..."
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-luxury-gold text-luxury-black py-3.5 md:py-4 uppercase tracking-[0.2em] font-bold text-[10px] md:text-xs hover:bg-white transition-colors duration-300 mt-2"
                                >
                                    Confirm Request
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="py-12 text-center flex flex-col items-center justify-center animate-in fade-in duration-700">
                            <div className="w-20 h-20 rounded-full border border-luxury-gold/20 flex items-center justify-center mb-6">
                                <span className="text-4xl">✨</span>
                            </div>
                            <h3 className="text-3xl font-display text-white mb-4">Request Received</h3>
                            <p className="text-luxury-beige/60 text-sm max-w-sm mx-auto mb-8">
                                Thank you for your interest. One of our elite agents will contact you shortly to confirm your private tour.
                            </p>
                            <button
                                onClick={onClose}
                                className="px-12 py-4 border border-white/10 hover:border-luxury-gold text-luxury-gold uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300"
                            >
                                Close Window
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BookingModal
