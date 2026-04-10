import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { Search, MapPin, User, Zap, X, Moon, Sun } from 'lucide-react'
import { properties } from '../StaticData/properties'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useSmoothScroll } from '../utilities/hooks/useSmoothScroll'

const Navbar = ({ onSearchOpen, hasEntered, searchQuery, setSearchQuery }) => {
    const { isRTL } = useLanguage()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isInlineSearchOpen, setIsInlineSearchOpen] = useState(false)
    const [suggestions, setSuggestions] = useState([])
    const { isDarkMode, toggleTheme } = useTheme()
    const { scrollToId } = useSmoothScroll()

    const hasAutoOpened = useRef(false)

    const menuRef = useRef(null)
    const overlayRef = useRef(null)
    const searchContainerRef = useRef(null)
    const searchInputRef = useRef(null)
    const linksRef = useRef([])
    const location = useLocation()
    const navigate = useNavigate()

    const handleInlineSearchChange = (e) => {
        const value = e.target.value
        setSearchQuery(value)

        if (value.trim().length > 1) {
            const filtered = properties.filter(p =>
                p.title.toLowerCase().includes(value.toLowerCase()) ||
                p.location.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 4)
            setSuggestions(filtered)
        } else {
            setSuggestions([])
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchQuery.trim().length > 0) {
            onSearchOpen()
            setIsInlineSearchOpen(false)
            setSuggestions([])
        }
    }

    const handleSuggestionClick = (id) => {
        navigate(`/property/${id}`)
        setIsInlineSearchOpen(false)
        setSuggestions([])
        setSearchQuery('')
    }

    // Auto-expand search on home page landing
    useEffect(() => {
        if (hasEntered && location.pathname === '/' && !isInlineSearchOpen && !hasAutoOpened.current) {
            // Only auto-expand on screens larger than 450px
            if (window.innerWidth <= 450) return

            const timer = setTimeout(() => {
                setIsInlineSearchOpen(true)
                hasAutoOpened.current = true
            }, 700)
            return () => clearTimeout(timer)
        }
    }, [location.pathname, hasEntered, isInlineSearchOpen])

    // Focus input when search bar opens
    useEffect(() => {
        if (isInlineSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }, [isInlineSearchOpen])

    // Handle click outside to close search
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsInlineSearchOpen(false)
            }
        }
        if (isInlineSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isInlineSearchOpen])

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev)
    }, [])

    // Reset menu when route changes
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMenuOpen(false)
    }, [location.pathname])

    // Lock scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
            if (window.lenis) window.lenis.stop()
        } else {
            document.body.style.overflow = 'unset'
            if (window.lenis) window.lenis.start()
        }
        return () => {
            document.body.style.overflow = 'unset'
            if (window.lenis) window.lenis.start()
        }
    }, [isMenuOpen])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (isMenuOpen) {
                // Open animation
                const tl = gsap.timeline()

                tl.to(overlayRef.current, {
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    pointerEvents: 'auto'
                })

                const validLinks = linksRef.current.filter(Boolean)
                if (validLinks.length > 0) {
                    tl.fromTo(validLinks,
                        {
                            y: 50,
                            opacity: 0,
                            rotateX: -20
                        },
                        {
                            y: 0,
                            opacity: 1,
                            rotateX: 0,
                            letterSpacing: "-0.025em",
                            duration: 1,
                            stagger: 0.1, // Reduced stagger slightly for snappier feel
                            ease: 'power3.out',
                            clearProps: 'transform' // clean up only transform for hover effects
                        },
                        "-=0.4"
                    )
                }

            } else {
                // Close animation
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.inOut',
                    pointerEvents: 'none'
                })
            }
        }, overlayRef)

        return () => ctx.revert()
    }, [isMenuOpen])



    const toggleInlineSearch = () => {
        if (window.innerWidth <= 450) {
            onSearchOpen()
        } else {
            setIsInlineSearchOpen(!isInlineSearchOpen)
        }
    }

    const menuItems = [
        { label: 'HOME', path: '/' },
        { label: 'PROPERTIES', path: '/listing' },
        { label: 'DESTINATIONS', path: '/#destinations' },
        { label: 'AGENTS', path: '/agents' },
        { label: 'PACKAGES', path: '/#representation-packages' },
        { label: 'ABOUT', path: '/about' },
        { label: 'BLOG', path: '/blog' },
        { label: 'FAQS', path: '/faq' },
        { label: 'PROFILE', path: '/profile' },
        { label: 'CONTACT', path: '/#contact' },
    ]

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 flex justify-between items-center max-w-[2560px] left-1/2 -translate-x-1/2 ${(isScrolled && !isMenuOpen)
                ? 'px-4 py-3 sm:px-6 sm:py-4 md:px-12 md:py-4 lg:px-12 xl:px-20 bg-luxury-black/90 backdrop-blur-lg text-luxury-off-white shadow-xl shadow-pure-black/10'
                : `px-4 py-4 sm:px-6 sm:py-6 md:px-12 md:py-8 lg:px-12 lg:py-10 xl:px-20 bg-transparent ${isMenuOpen ? 'text-pure-white' : 'text-pure-white'}`
                }`}>

                {/* Left: Logo */}
                <Link to="/" className="inline-block hover:opacity-80 transition-all duration-300">
                    <div className="relative w-24 xs:w-32 sm:w-40 h-10 sm:h-12">
                        <img
                            src={isDarkMode ? "/For Dark Theme.svg" : "/For Light Theme.svg"}
                            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                            alt="Logo"
                        />
                    </div>
                </Link>

                {/* Right: Search & Menu Trigger */}
                <div className={`flex items-center gap-1 xs:gap-3 sm:gap-4 md:gap-8 transition-all ${(!isScrolled && !isMenuOpen) ? 'mix-blend-difference' : ''}`}>
                    <div
                        ref={searchContainerRef}
                        className={`relative flex items-center h-8 sm:h-10 transition-all duration-700 ease-in-out rounded-full ${isInlineSearchOpen || (isScrolled && !isMenuOpen) ? 'text-luxury-off-white' : ''} ${isInlineSearchOpen
                            ? `w-[calc(100vw-8rem)] xs:w-48 sm:w-64 md:w-72 border px-3 sm:px-4 shadow-2xl ${isScrolled && !isMenuOpen ? 'bg-luxury-black border-luxury-gold/30' : 'bg-luxury-black/95 border-luxury-gold/60'}`
                            : 'w-8 sm:w-10 bg-transparent border-transparent'
                            }`}
                    >
                        <button
                            onClick={toggleInlineSearch}
                            className={`flex items-center justify-center min-w-[40px] sm:min-w-[44px] h-full transition-all duration-300 ${isInlineSearchOpen ? 'text-luxury-gold' : 'hover:text-luxury-gold hover:scale-110'
                                }`}
                            aria-label="Toggle Search"
                        >
                            <Search size={18} className="sm:w-[22px] sm:h-[22px]" strokeWidth={1.5} />
                        </button>

                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={handleInlineSearchChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Search estates..."
                            className={`flex-1 bg-transparent border-none outline-none text-xs sm:text-sm font-normal tracking-wide placeholder:opacity-50 transition-all duration-700 ${isInlineSearchOpen ? 'opacity-100 pointer-events-auto ml-2' : 'opacity-0 pointer-events-none w-0'
                                } text-luxury-off-white placeholder:text-luxury-off-white/50 pr-6`}
                        />

                        {isInlineSearchOpen && searchQuery && (
                            <button
                                onClick={() => {
                                    setSearchQuery('')
                                    searchInputRef.current?.focus()
                                    setSuggestions([])
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors p-2 hover:text-luxury-gold text-luxury-off-white/40"
                                title="Clear Search"
                                aria-label="Clear Search"
                            >
                                <X size={14} className="sm:size-5" strokeWidth={2} />
                            </button>
                        )}

                        {/* Suggestions Dropdown */}
                        {isInlineSearchOpen && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-luxury-black/95 backdrop-blur-xl border border-luxury-gold/30 rounded-2xl overflow-hidden shadow-2xl z-[10003] animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="p-2 flex flex-col gap-1">
                                    {suggestions.map((p) => (
                                        <button
                                            key={p.id}
                                            onClick={() => handleSuggestionClick(p.id)}
                                            className="w-full text-left p-3 rounded-xl hover:bg-luxury-gold/10 group transition-all duration-300"
                                        >
                                            <p className="text-luxury-off-white text-xs font-medium group-hover:text-luxury-gold transition-colors truncate">
                                                {p.title}
                                            </p>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <MapPin size={10} className="text-luxury-gold/50" />
                                                <p className="text-[10px] text-luxury-off-white/40 truncate">
                                                    {p.location}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Login Icon */}
                    <button
                        onClick={() => navigate('/login')}
                        className={`hover:text-luxury-gold transition-colors duration-300 group relative w-8 h-8 xs:w-10 xs:h-10 sm:w-11 sm:h-11 flex items-center justify-center ${(isScrolled && !isMenuOpen) ? 'text-luxury-off-white' : 'text-pure-white'}`}
                        aria-label="Login"
                    >
                        <User size={16} className="xs:w-[18px] xs:h-[18px] sm:w-[22px] sm:h-[22px]" strokeWidth={1.5} />
                        <span className="absolute -top-0.5 -right-0.5 transition-opacity duration-300">
                            <Zap size={8} className="fill-luxury-gold text-luxury-gold sm:size-[10px]" />
                        </span>
                    </button>

                    {/* Theme Toggle Icon */}
                    <button
                        onClick={toggleTheme}
                        className={`hover:text-luxury-gold transition-colors duration-300 w-8 h-8 xs:w-10 xs:h-10 sm:w-11 sm:h-11 flex items-center justify-center ${(isScrolled && !isMenuOpen) ? 'text-luxury-off-white' : 'text-pure-white'}`}
                        aria-label="Toggle Theme"
                    >
                        {isDarkMode ? (
                            <Sun size={16} className="xs:w-[18px] xs:h-[18px] sm:w-[22px] sm:h-[22px]" strokeWidth={1.5} />
                        ) : (
                            <Moon size={16} className="xs:w-[18px] xs:h-[18px] sm:w-[22px] sm:h-[22px]" strokeWidth={1.5} />
                        )}
                    </button>


                    <button
                        onClick={toggleMenu}
                        className="group flex items-center justify-center w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 cursor-pointer"
                        aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                    >
                        {isMenuOpen ? (
                            <div className="relative w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 flex justify-center items-center transition-transform duration-500 group-hover:rotate-90">
                                <span className={`absolute w-5 xs:w-6 sm:w-8 h-[2px] rotate-45 ${(isScrolled && !isMenuOpen) ? 'bg-luxury-off-white' : 'bg-pure-white'}`}></span>
                                <span className={`absolute w-5 xs:w-6 sm:w-8 h-[2px] -rotate-45 ${(isScrolled && !isMenuOpen) ? 'bg-luxury-off-white' : 'bg-pure-white'}`}></span>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-[4px] xs:gap-[5px] sm:gap-[6px] w-5 xs:w-6 sm:w-8 items-end">
                                <span className={`w-full h-[2px] transition-all duration-300 group-hover:w-[75%] ${(isScrolled && !isMenuOpen) ? 'bg-luxury-off-white' : 'bg-pure-white'}`}></span>
                                <span className={`w-full h-[2px] transition-all duration-300 group-hover:w-full ${(isScrolled && !isMenuOpen) ? 'bg-luxury-off-white' : 'bg-pure-white'}`}></span>
                                <span className={`w-full h-[2px] transition-all duration-300 group-hover:w-[50%] ${(isScrolled && !isMenuOpen) ? 'bg-luxury-off-white' : 'bg-pure-white'}`}></span>
                            </div>
                        )}
                    </button>
                </div>
            </nav>

            {/* Full Screen Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-pure-black/95 z-40 flex flex-col justify-end pb-10 sm:pb-32 md:pb-16 lg:pb-28 xl:pb-24 2xl:pb-28 px-4 sm:px-12 md:px-12 lg:px-24 xl:px-28 2xl:px-32 opacity-0 pointer-events-none backdrop-blur-sm "
            >
                <div className="max-w-[2400px] w-full mx-auto flex flex-col-reverse lg:flex-row justify-between items-end gap-8 sm:gap-12 lg:gap-16 relative z-10">

                    {/* Left Side Content - Decorative & Support */}
                    {/* Left Side Content - Decorative & Support */}
                    <div ref={el => { if (el) linksRef.current[menuItems.length] = el }} className={`flex flex-row lg:flex-col justify-between lg:justify-end items-end lg:items-start opacity-0 select-none gap-2 sm:gap-4 lg:gap-8 xl:gap-12 2xl:gap-12 ${isRTL ? 'text-right lg:text-right' : 'text-left'} relative h-full min-h-[auto] lg:min-h-[400px] w-full lg:w-auto pt-6 sm:pt-8 lg:pt-0`}>

                        {/* Glowing Separator Line - Mobile Only */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent lg:hidden"></div>

                        {/* Decorative Vertical Line - Desktop Only */}
                        <div className={`absolute ${isRTL ? 'right-[-20px] md:right-[-40px]' : 'left-[-20px] md:left-[-40px]'} top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-luxury-gold/30 to-transparent hidden lg:block`}></div>

                        <div className="space-y-4 md:space-y-6 translate-x-2 sm:translate-x-0 lg:translate-x-0 xl:translate-x-0">
                            <h4 className="text-luxury-gold/50 text-[10px] 2xl:text-xs tracking-[0.4em] uppercase font-medium">Inquiries</h4>
                            <div className="flex flex-col gap-0.5 sm:gap-1 md:gap-2">
                                <a href="mailto:hello@luxe-estate.com"
                                    className="text-xs sm:text-sm md:text-xl  font-light text-pure-white/70 hover:text-luxury-gold hover:tracking-widest transition-all duration-500 block">
                                    hello@luxe-estate.com
                                </a>
                                <a href="tel:+15550000000"
                                    className="text-xs sm:text-sm md:text-xl font-light text-pure-white/70 hover:text-luxury-gold hover:tracking-widest transition-all duration-500 block">
                                    +1 (555) 000-0000
                                </a>
                            </div>
                        </div>

                        <div className={`space-y-4 md:space-y-6 ${isRTL ? 'text-left lg:text-right' : 'text-right lg:text-left'} translate-x-[-2px] sm:translate-x-0 lg:translate-x-0`}>
                            <h4 className="text-luxury-gold/50 text-[10px] 2xl:text-xs tracking-[0.4em] uppercase font-medium">Connect</h4>
                            <div className={`flex flex-col ${isRTL ? 'items-start lg:items-start' : 'items-end lg:items-start'} gap-3 text-[10px] sm:text-[10px] md:text-xs font-semibold tracking-[0.3em] text-pure-white/50`}>
                                {[
                                    { name: 'INSTAGRAM', href: 'https://www.instagram.com/drp_solution/' },
                                    { name: 'TWITTER', href: 'https://x.com/drpsolutions16' },
                                    { name: 'LINKEDIN', href: 'https://www.linkedin.com/company/drpsolutions-tech' },
                                    { name: 'FACEBOOK', href: '#' }
                                ].map((social) => (
                                    <a key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-luxury-gold transition-all duration-500 relative group/social w-fit"
                                    >
                                        {social.name}
                                        <span className={`absolute bottom-[-2px] ${isRTL ? 'right-0' : 'left-0'} w-0 h-[1px] bg-luxury-gold transition-all duration-500 group-hover/social:w-full`}></span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links - Right Aligned */}
                    <div ref={menuRef} className={`flex flex-col items-end gap-1 sm:gap-1 md:gap-0.5 lg:gap-1 xl:gap-1 2xl:gap-1 w-full lg:w-auto ${isRTL ? '-translate-x-4 sm:translate-x-0 md:-translate-x-8 lg:-translate-x-16 xl:-translate-x-10' : 'translate-x-4 sm:translate-x-0 md:translate-x-8 lg:translate-x-16 xl:translate-x-10'}`}>
                        {menuItems.map((item, index) => {
                            const isHome = item.label === 'HOME';
                            const isAccent = ['CONTACT', 'PROFILE', 'LOGIN', 'FAQS'].includes(item.label);

                            return (
                                <div key={item.label} className={`overflow-hidden group w-full ${isRTL ? 'text-left' : 'text-right'}`}>
                                    <Link
                                        to={item.path}
                                        ref={el => { if (el) linksRef.current[index] = el }}
                                        onClick={(e) => {
                                            setIsMenuOpen(false)
                                            if (item.path.startsWith('/#')) {
                                                e.preventDefault()
                                                const id = item.path.replace('/#', '')

                                                if (location.pathname === '/') {
                                                    scrollToId(id)
                                                } else {
                                                    navigate('/', { state: { scrollTo: id } })
                                                }
                                            }
                                        }}
                                        onMouseEnter={(e) => {
                                            gsap.to(e.currentTarget, {
                                                color: '#c9a961',
                                                letterSpacing: '0.05em',
                                                duration: 0.8,
                                                ease: 'power3.out',
                                                overwrite: 'auto'
                                            });
                                            gsap.to(e.currentTarget.querySelector('.indicator'), {
                                                scaleX: 1,
                                                opacity: 1,
                                                duration: 0.8,
                                                ease: 'power3.out',
                                                overwrite: 'auto'
                                            });
                                        }}
                                        onMouseLeave={(e) => {
                                            gsap.to(e.currentTarget, {
                                                letterSpacing: '-0.025em',
                                                duration: 1,
                                                ease: 'power2.inOut',
                                                overwrite: 'auto',
                                                clearProps: 'color'
                                            });
                                            gsap.to(e.currentTarget.querySelector('.indicator'), {
                                                scaleX: 0,
                                                opacity: 0,
                                                duration: 1,
                                                ease: 'power2.inOut',
                                                overwrite: 'auto'
                                            });
                                        }}
                                        className={`relative flex items-center justify-end gap-3 sm:gap-6 font-display tracking-tight leading-tight
                                            ${isHome ? 'text-3xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black text-pure-white' :
                                                isAccent ? 'text-lg sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-medium text-luxury-gold' :
                                                    'text-xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-[2.6rem] 2xl:text-[2.7rem] font-bold text-pure-white/90'}
                                        `}
                                    >
                                        <span className={`indicator h-[1px] bg-luxury-gold w-6 sm:w-10 scale-x-0 opacity-0 ${isRTL ? 'origin-right' : 'origin-left'}`}></span>
                                        {item.label}
                                        <span className={`text-[10px] md:text-xs font-sans font-light text-luxury-gold/40 transition-all duration-1000 order-last ${isRTL ? 'mr-2 sm:mr-4 2xl:mr-8 translate-x-4 group-hover:translate-x-0' : 'ml-2 sm:ml-4 2xl:ml-8 -translate-x-4 group-hover:translate-x-0'} opacity-0 group-hover:opacity-100`}>
                                            / 0{index + 1}
                                        </span>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Navbar
