import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ArrowLeft, Save, User, Mail, Phone, MapPin, Camera, Info } from 'lucide-react'

const EditProfile = () => {
    const navigate = useNavigate()
    const formRef = useRef(null)
    const headerRef = useRef(null)

    const [formData, setFormData] = useState({
        name: "Dev Luxury",
        email: "dev@luxuryestates.com",
        phone: "+1 (555) 123-4567",
        location: "Beverly Hills, CA",
        bio: "Curating the world's most exceptional real estate portfolios for high-net-worth individuals and developers.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    })

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

        tl.fromTo(
            headerRef.current.children,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 }
        ).fromTo(
            formRef.current.children,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.08 },
            "-=0.8"
        )
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Mock save logic
        gsap.to(formRef.current, { opacity: 0.5, pointerEvents: 'none', duration: 0.3 })
        setTimeout(() => {
            navigate('/profile')
        }, 1000)
    }

    return (
        <div className="bg-luxury-black min-h-screen text-luxury-off-white">
            <div className="pt-24 pb-12 md:pt-40 md:pb-20 lg:pt-32 lg:pb-16 px-6 md:px-12 lg:px-20 flex justify-center">
                <div className="max-w-4xl lg:max-w-3xl xl:max-w-4xl w-full">
                    {/* Header */}
                    <div ref={headerRef} className="mb-10 lg:mb-12 xl:mb-16">
                        <Link
                            to="/profile"
                            className="inline-flex items-center gap-2 text-luxury-gold hover:text-white transition-luxury mb-6 lg:mb-8 group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-luxury" />
                            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">Back to Profile</span>
                        </Link>
                        <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-display-md font-display mb-4">Edit Profile</h1>
                        <p className="text-luxury-beige/40 uppercase tracking-[0.2em] text-[10px] sm:text-xs">Curate your personal identity and professional presence</p>
                    </div>

                    {/* Form */}
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-8 xl:gap-10 bg-luxury-charcoal/20 border border-white/5 p-6 sm:p-10 md:p-16 lg:p-12 xl:p-16 backdrop-blur-sm relative overflow-hidden"
                    >
                        {/* Decorative line */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-luxury-gold/50"></div>

                        {/* Name */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-bold">
                                <User size={12} /> Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-white/5 border-b border-white/10 py-3 md:py-4 px-2 focus:border-luxury-gold outline-none transition-luxury text-white font-light tracking-wide text-sm md:text-base lg:text-base xl:text-lg"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-bold">
                                <Mail size={12} /> Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white/5 border-b border-white/10 py-3 md:py-4 px-2 focus:border-luxury-gold outline-none transition-luxury text-white font-light tracking-wide text-sm md:text-base lg:text-base xl:text-lg"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-bold">
                                <Phone size={12} /> Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-white/5 border-b border-white/10 py-3 md:py-4 px-2 focus:border-luxury-gold outline-none transition-luxury text-white font-light tracking-wide text-sm md:text-base lg:text-base xl:text-lg"
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-bold">
                                <MapPin size={12} /> Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full bg-white/5 border-b border-white/10 py-3 md:py-4 px-2 focus:border-luxury-gold outline-none transition-luxury text-white font-light tracking-wide text-sm md:text-base lg:text-base xl:text-lg"
                            />
                        </div>

                        {/* Avatar URL */}
                        <div className="md:col-span-2 space-y-4">
                            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-bold">
                                <Camera size={12} /> Avatar URL
                            </label>
                            <input
                                type="text"
                                name="avatar"
                                value={formData.avatar}
                                onChange={handleChange}
                                className="w-full bg-white/5 border-b border-white/10 py-3 md:py-4 px-2 focus:border-luxury-gold outline-none transition-luxury text-white font-light tracking-wide text-sm md:text-base lg:text-base xl:text-lg"
                            />
                        </div>

                        {/* Bio */}
                        <div className="md:col-span-2 space-y-4">
                            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-bold">
                                <Info size={12} /> Professional Bio
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows="4"
                                className="w-full bg-white/5 border-b border-white/10 py-3 md:py-4 px-2 focus:border-luxury-gold outline-none transition-luxury text-white font-light tracking-wide text-sm md:text-base lg:text-base xl:text-lg resize-none"
                            ></textarea>
                        </div>

                        {/* Buttons */}
                        <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 md:gap-6 pt-6 md:pt-8">
                            <button
                                type="submit"
                                className="flex-1 flex items-center justify-center gap-3 bg-luxury-gold text-luxury-black font-bold uppercase tracking-[0.3em] text-[10px] py-4 lg:py-4.5 xl:py-5 hover:bg-white transition-luxury shadow-lg active:scale-95"
                            >
                                <Save size={14} /> Save Transitions
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/profile')}
                                className="flex-1 border border-white/10 text-white font-bold uppercase tracking-[0.3em] text-[10px] py-4 lg:py-4.5 xl:py-5 hover:bg-white/5 transition-luxury active:scale-95"
                            >
                                Discard Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
