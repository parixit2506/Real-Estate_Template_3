import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ArrowLeft, Upload, Check, ChevronRight, X, Plus } from 'lucide-react'

const AddProperty = () => {
    const navigate = useNavigate()
    const headerRef = useRef(null)
    const formRef = useRef(null)

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [step, setStep] = useState(1)
    const [selectedImages, setSelectedImages] = useState([])
    const fileInputRef = useRef(null)

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        location: '',
        type: 'Villa',
        status: 'For Sale',
        sqft: '',
        beds: '',
        baths: '',
        description: '',
        region: 'Europe'
    })

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files)
        if (files.length === 0) return

        const newImages = files.map(file => ({
            file,
            id: Math.random().toString(36).substr(2, 9),
            preview: URL.createObjectURL(file)
        }))

        setSelectedImages(prev => [...prev, ...newImages])
    }

    const removeImage = (id) => {
        setSelectedImages(prev => {
            const filtered = prev.filter(img => img.id !== id)
            // Cleanup object URLs to avoid memory leaks
            const removed = prev.find(img => img.id === id)
            if (removed) URL.revokeObjectURL(removed.preview)
            return filtered
        })
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

        tl.fromTo(
            headerRef.current.children,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 }
        )
            .fromTo(
                formRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=0.8"
            )
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Mock submission delay
        setTimeout(() => {
            setIsSubmitting(false)
            setStep(3) // Move to success step
        }, 2000)
    }

    return (
        <div className="bg-luxury-black min-h-screen text-luxury-off-white">
            <div className="pt-24 pb-20 md:pt-32 md:pb-40 px-6 md:px-12 lg:px-20 flex justify-center">
                <div className="max-w-4xl w-full">

                    <div ref={headerRef} className="mb-12 md:mb-16">
                        <Link
                            to="/profile"
                            className="inline-flex items-center gap-2 text-luxury-gold hover:text-white transition-luxury uppercase tracking-widest text-[9px] md:text-[10px] font-bold mb-6 md:mb-8"
                        >
                            <ArrowLeft size={14} /> Back to Profile
                        </Link>
                        <h1 className="text-3xl sm:text-4xl md:text-display-md font-display mb-4">List Your Masterpiece</h1>
                        <p className="text-luxury-beige/60 text-base md:text-lg max-w-2xl leading-relaxed">
                            Complete the details below to showcase your property in our exclusive collection.
                        </p>
                    </div>

                    <div ref={formRef} className="bg-luxury-charcoal/50 border border-white/5 backdrop-blur-md p-6 sm:p-8 md:p-12 relative overflow-hidden">
                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                            <div
                                className="h-full bg-luxury-gold transition-all duration-700 ease-smooth"
                                style={{ width: `${(step / 3) * 100}%` }}
                            />
                        </div>

                        {step === 1 && (
                            <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <h2 className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-bold">Step 1: Basic Information</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-luxury-beige/40 font-bold">Property Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="e.g. The Sapphire Estate"
                                            className="w-full bg-luxury-black/50 border border-white/10 p-3.5 md:p-4 font-display text-sm md:text-base text-white focus:border-luxury-gold outline-none transition-luxury"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-luxury-beige/40 font-bold">Asking Price</label>
                                        <input
                                            type="text"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            placeholder="e.g. $12,500,000"
                                            className="w-full bg-luxury-black/50 border border-white/10 p-3.5 md:p-4 font-display text-sm md:text-base text-white focus:border-luxury-gold outline-none transition-luxury"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-luxury-beige/40 font-bold">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Beverly Hills, CA"
                                            className="w-full bg-luxury-black/50 border border-white/10 p-3.5 md:p-4 font-display text-sm md:text-base text-white focus:border-luxury-gold outline-none transition-luxury"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-luxury-beige/40 font-bold">Property Type</label>
                                        <div className="relative">
                                            <select
                                                name="type"
                                                value={formData.type}
                                                onChange={handleInputChange}
                                                className="w-full bg-luxury-black/50 border border-white/10 p-3.5 md:p-4 font-display text-sm md:text-base text-white focus:border-luxury-gold outline-none transition-luxury appearance-none"
                                            >
                                                <option value="Villa">Villa</option>
                                                <option value="Penthouse">Penthouse</option>
                                                <option value="Mansion">Mansion</option>
                                                <option value="Estate">Estate</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-luxury-beige/40">
                                                <ChevronRight size={14} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    className="flex items-center justify-center gap-3 w-full sm:w-fit px-10 py-4 md:py-5 bg-luxury-gold text-luxury-black font-bold uppercase tracking-[0.2em] text-[10px] mt-6 md:mt-10 hover:bg-white transition-luxury"
                                >
                                    Continue to Details <ChevronRight size={14} />
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <h2 className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-bold">Step 2: Technical Specifications</h2>

                                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-luxury-beige/40 font-bold">Bedrooms</label>
                                        <input type="number" name="beds" value={formData.beds} onChange={handleInputChange} className="w-full bg-luxury-black/50 border border-white/10 p-3.5 md:p-4 font-display text-sm md:text-base text-white focus:border-luxury-gold outline-none transition-luxury" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-luxury-beige/40 font-bold">Bathrooms</label>
                                        <input type="number" name="baths" value={formData.baths} onChange={handleInputChange} className="w-full bg-luxury-black/50 border border-white/10 p-3.5 md:p-4 font-display text-sm md:text-base text-white focus:border-luxury-gold outline-none transition-luxury" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-luxury-beige/40 font-bold">Living Area (SQ FT)</label>
                                        <input type="number" name="sqft" value={formData.sqft} onChange={handleInputChange} className="w-full bg-luxury-black/50 border border-white/10 p-3.5 md:p-4 font-display text-sm md:text-base text-white focus:border-luxury-gold outline-none transition-luxury" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-luxury-beige/40 font-bold">Architectural Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full bg-luxury-black/50 border border-white/10 p-4 font-display text-sm md:text-base text-white focus:border-luxury-gold outline-none transition-luxury resize-none"
                                        placeholder="Describe the unique characteristics of the property..."
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-widest text-luxury-beige/40 font-bold">Gallery Upload</label>

                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />

                                    {/* Image Previews */}
                                    {selectedImages.length > 0 && (
                                        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mb-6">
                                            {selectedImages.map((img) => (
                                                <div key={img.id} className="relative aspect-square group">
                                                    <img
                                                        src={img.preview}
                                                        alt="preview"
                                                        className="w-full h-full object-cover border border-white/10"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(img.id)}
                                                        className="absolute -top-1 -right-1 xs:-top-2 xs:-right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-lg z-10"
                                                    >
                                                        <X size={12} strokeWidth={3} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={triggerFileInput}
                                                className="aspect-square border border-dashed border-luxury-gold/30 flex items-center justify-center hover:bg-luxury-gold/5 transition-luxury group"
                                            >
                                                <Plus size={20} className="text-luxury-gold/50 group-hover:text-luxury-gold transition-luxury" />
                                            </button>
                                        </div>
                                    )}

                                    {selectedImages.length === 0 && (
                                        <div
                                            onClick={triggerFileInput}
                                            className="border-2 border-dashed border-white/10 rounded-sm p-8 md:p-12 text-center hover:border-luxury-gold/40 transition-luxury group cursor-pointer bg-luxury-black/20"
                                        >
                                            <Upload className="mx-auto mb-4 text-luxury-beige/40 group-hover:text-luxury-gold transition-luxury" size={32} />
                                            <p className="text-[10px] md:text-xs uppercase tracking-widest text-luxury-beige/60">Click to Select or Drag Images</p>
                                            <span className="text-[8px] text-white/20 mt-2 block">Maximum 25MB per image • JPG, PNG, RAW</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-6 md:pt-10">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="order-2 sm:order-1 px-10 py-4 md:py-5 border border-white/10 text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/5 transition-luxury w-full sm:w-auto"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="order-1 sm:order-2 flex-1 px-10 py-4 md:py-5 bg-luxury-gold text-luxury-black font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-luxury disabled:opacity-50 disabled:cursor-wait w-full"
                                    >
                                        {isSubmitting ? 'Verifying Details...' : 'Submit to Collection'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {step === 3 && (
                            <div className="py-8 md:py-12 text-center animate-in fade-in zoom-in-95 duration-700">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-2xl shadow-luxury-gold/20">
                                    <Check className="text-luxury-black" size={30} strokeWidth={3} />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-display mb-4">Submission Successful</h2>
                                <p className="text-luxury-beige/60 max-w-sm mx-auto mb-8 md:mb-10 text-sm leading-relaxed px-4">
                                    Your property has been submitted for review. Our curation team will contact you shortly to finalize the listing.
                                </p>
                                <div className="flex flex-col gap-4 max-w-xs mx-auto px-6 w-full">
                                    <button
                                        onClick={() => navigate('/profile')}
                                        className="px-8 py-4 bg-luxury-gold text-luxury-black font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-luxury shadow-lg"
                                    >
                                        View Dashboard
                                    </button>
                                    <button
                                        onClick={() => setStep(1)}
                                        className="px-8 py-4 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-luxury"
                                    >
                                        List Another Property
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProperty
