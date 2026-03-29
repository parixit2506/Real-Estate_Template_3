import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const formRef = useRef(null)
    const titleRef = useRef(null)

    // Animation on mount
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

        // Simulate login delay
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
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-luxury-gold/5 rounded-full blur-[80px] md:blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-luxury-charcoal-light/30 rounded-full blur-[80px] md:blur-[100px]" />
            </div>

            {/* Navbar Spacer */}
            <div className="h-24 md:h-32 lg:h-36 shrink-0" />

            <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10 -mt-10 md:-mt-16 lg:-mt-20">
                <div className="w-full max-w-md lg:max-w-[380px] xl:max-w-[400px]">
                    <div className="text-center mb-8 md:mb-12">
                        <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl mb-4 text-gradient-gold font-display">
                            Welcome Back
                        </h1>
                        <p className="text-white/60 font-light tracking-wide text-sm md:text-base">
                            Access your exclusive property portfolio
                        </p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        {/* Email Field */}
                        <div className="group relative">
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3.5 md:py-4 text-white placeholder-transparent focus:border-luxury-gold outline-none transition-all duration-300 peer text-sm md:text-base"
                                placeholder="Email Address"
                            />
                            <label className="absolute left-4 top-3.5 md:top-4 text-white/40 text-sm transition-all duration-300 pointer-events-none
              peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 md:peer-placeholder-shown:top-4
              peer-focus:-top-3 peer-focus:text-xs peer-focus:text-luxury-gold
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
                                className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3.5 md:py-4 text-white placeholder-transparent focus:border-luxury-gold outline-none transition-all duration-300 peer pr-12 text-sm md:text-base"
                                placeholder="Password"
                            />
                            <label className="absolute left-4 top-3.5 md:top-4 text-white/40 text-sm transition-all duration-300 pointer-events-none
              peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 md:peer-placeholder-shown:top-4
              peer-focus:-top-3 peer-focus:text-xs peer-focus:text-luxury-gold
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

                        <div className="flex justify-between items-center text-[10px] md:text-xs tracking-widest uppercase">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="accent-luxury-gold w-3 h-3 cursor-pointer" />
                                <span className="text-white/60 group-hover:text-white transition-colors">Remember me</span>
                            </label>
                            <Link to="#" className="text-luxury-gold hover:text-white transition-colors">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-luxury-gold text-luxury-black font-bold py-3.5 md:py-4 tracking-[0.2em] uppercase hover:bg-white transition-all duration-500 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed text-[10px] md:text-xs"
                        >
                            {isLoading ? (
                                <span className="animate-pulse">Signing In...</span>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] md:text-xs uppercase tracking-widest">
                                <span className="bg-luxury-black px-4 text-white/40">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button type="button" className="border border-white/10 py-3 hover:bg-white/5 transition-colors text-white/80 hover:text-white flex items-center justify-center gap-2 group">
                                <svg className="w-4 h-4 md:w-5 md:h-5 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                                </svg>
                            </button>
                            <button type="button" className="border border-white/10 py-3 hover:bg-white/5 transition-colors text-white/80 hover:text-white flex items-center justify-center gap-2 group">
                                <svg className="w-4 h-4 md:w-5 md:h-5 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.24.75-.46 1.42-.89 2.14-.54.91-1.28 1.4-1.63 1.94zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                            </button>
                        </div>

                        <div className="text-center mt-10 pt-8 border-t border-white/5">
                            <p className="text-white/40 text-xs md:text-sm">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-luxury-gold hover:text-white ml-1 transition-colors underline underline-offset-4">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
