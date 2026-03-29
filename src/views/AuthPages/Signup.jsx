import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { Eye, EyeOff, User, Building2 } from 'lucide-react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const Signup = () => {
    const [userType, setUserType] = useState('guest')
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const formRef = useRef(null)
    const titleRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline()
        tl.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
        )
        tl.fromTo(formRef.current.children,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out'
            },
            "-=0.5"
        )
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            navigate('/')
        }, 1500)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-luxury-black">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-luxury-gold/5 rounded-full blur-[80px] md:blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-luxury-charcoal-light/30 rounded-full blur-[80px] md:blur-[100px]" />
            </div>

            <div className="h-24 md:h-32 lg:h-36 shrink-0" />

            <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10 -mt-10 md:-mt-16 lg:-mt-20 py-20 pb-32">
                <div className="w-full max-w-md lg:max-w-[400px]">
                    <div className="text-center mb-10">
                        <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl mb-4 py-2 text-gradient-gold font-display leading-tight">
                            Join the Elite
                        </h1>
                        <p className="text-white/60 font-light tracking-wide text-sm md:text-base">
                            Experience the pinnacle of property management
                        </p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                        {/* Account Type Toggle */}
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 block text-center">Account Selection</label>
                            <div className="relative p-1 bg-luxury-charcoal-light/50 rounded-sm flex items-center border border-white/10 overflow-hidden">
                                <motion.div
                                    className="absolute inset-y-1 bg-luxury-gold rounded-[2px] w-[49%]"
                                    initial={false}
                                    animate={{
                                        x: userType === 'guest' ? '0%' : '104%'
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setUserType('guest')}
                                    className={`relative flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors z-10 flex items-center justify-center gap-2 ${userType === 'guest' ? "text-luxury-black" : "text-white/40"}`}
                                >
                                    <User size={12} />
                                    Guest
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUserType('vendor')}
                                    className={`relative flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors z-10 flex items-center justify-center gap-2 ${userType === 'vendor' ? "text-luxury-black" : "text-white/40"}`}
                                >
                                    <Building2 size={12} />
                                    Vendor
                                </button>
                            </div>
                        </div>

                        {/* Name Field */}
                        <div className="group relative">
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white placeholder-transparent focus:border-luxury-gold outline-none transition-all duration-300 peer text-sm md:text-base"
                                placeholder={userType === 'guest' ? "Full Name" : "Vendor Name"}
                            />
                            <label className="absolute left-4 top-4 text-white/40 text-sm transition-all duration-300 pointer-events-none
              peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-luxury-gold
              peer-valid:-top-3 peer-valid:text-xs peer-valid:text-luxury-gold">
                                {userType === 'guest' ? "Full Name" : "Vendor Name"}
                            </label>
                        </div>

                        {/* Email Field */}
                        <div className="group relative">
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white placeholder-transparent focus:border-luxury-gold outline-none transition-all duration-300 peer text-sm md:text-base"
                                placeholder="Email Address"
                            />
                            <label className="absolute left-4 top-4 text-white/40 text-sm transition-all duration-300 pointer-events-none
              peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-luxury-gold
              peer-valid:-top-3 peer-valid:text-xs peer-valid:text-luxury-gold">
                                Email Address
                            </label>
                        </div>

                        {/* Password Field */}
                        <div className="group relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white placeholder-transparent focus:border-luxury-gold outline-none transition-all duration-300 peer pr-12 text-sm md:text-base"
                                placeholder="Password"
                            />
                            <label className="absolute left-4 top-4 text-white/40 text-sm transition-all duration-300 pointer-events-none
              peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-luxury-gold
              peer-valid:-top-3 peer-valid:text-xs peer-valid:text-luxury-gold">
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-luxury-gold text-luxury-black font-bold py-4 tracking-[0.2em] uppercase hover:bg-white transition-all duration-500 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed text-[10px] md:text-xs"
                        >
                            {isLoading ? (
                                <span className="animate-pulse">Creating Account...</span>
                            ) : (
                                <>
                                    {userType === 'guest' ? 'Create Guest Account' : 'Register Vendor'}
                                </>
                            )}
                        </button>

                        <div className="text-center mt-10 pt-8 border-t border-white/5">
                            <p className="text-white/40 text-xs md:text-sm">
                                Already have an account?{' '}
                                <Link to="/login" className="text-luxury-gold hover:text-white ml-1 transition-colors underline underline-offset-4">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
