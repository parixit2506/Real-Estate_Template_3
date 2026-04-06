import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState, useCallback, lazy, Suspense } from 'react'

// Context
import { useFilters } from '../context/FilterContext'
import { useLanguage } from '../context/LanguageContext'

// Layouts (Lazy Load to keep main bundle minimal)
const FrontendLayout = lazy(() => import('../layouts/FrontendLayout'))
const AuthLayout = lazy(() => import('../layouts/AuthLayout'))

// UI Components (Lazy Loaded for absolute minimum main bundle)
const IntroScreen = lazy(() => import('../components/ui/IntroScreen'))
const SmoothScroll = lazy(() => import('../components/ui/SmoothScroll'))
const CustomCursor = lazy(() => import('../components/ui/CustomCursor'))
const LanguageSidebar = lazy(() => import('../components/ui/LanguageSidebar'))
const FilterOverlay = lazy(() => import('../components/ui/FilterOverlay'))
const SearchOverlay = lazy(() => import('../components/ui/SearchOverlay'))

// Pages (Lazy Load for performance)
const Home = lazy(() => import('../views/MainPages/Home'))
const PropertyListing = lazy(() => import('../views/MainPages/PropertyListing'))
const PropertyDetails = lazy(() => import('../views/MainPages/PropertyDetails'))
const About = lazy(() => import('../views/MainPages/About'))

const Login = lazy(() => import('../views/AuthPages/Login'))
const Signup = lazy(() => import('../views/AuthPages/Signup'))

const Blog = lazy(() => import('../views/BlogPages/Blog'))
const BlogDetails = lazy(() => import('../views/BlogPages/BlogDetails'))

const Profile = lazy(() => import('../views/MiscPages/Profile'))
const AddProperty = lazy(() => import('../views/MiscPages/AddProperty'))
const Agents = lazy(() => import('../views/MiscPages/Agents'))
const Contact = lazy(() => import('../views/MiscPages/Contact'))
const EditProfile = lazy(() => import('../views/MiscPages/EditProfile'))
const Faq = lazy(() => import('../views/MiscPages/Faq'))

// Loading Fallback Component
const PageLoader = () => (
    <div className="h-screen w-full flex items-center justify-center bg-luxury-black">
        <div className="w-12 h-12 border-2 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin"></div>
    </div>
)

// GSAP Registration will happen dynamically below

// Handle hash scrolling and scroll to top
const ScrollToHash = () => {
    const { pathname, hash, state } = useLocation()

    useEffect(() => {
        const scrollToId = state?.scrollTo || (hash ? hash.replace('#', '') : null)

        if (scrollToId) {
            const scrollToElement = (attempt = 0) => {
                const element = document.getElementById(scrollToId)
                if (element && window.lenis) {
                    const delay = attempt > 0 ? 100 : 300

                    setTimeout(() => {
                        window.lenis.scrollTo(element, {
                            duration: 1.5,
                            offset: -100, // Account for fixed navbar
                            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                        })
                    }, delay)
                } else if (attempt < 10) {
                    setTimeout(() => scrollToElement(attempt + 1), 100)
                }
            }

            scrollToElement()
        } else {
            if (window.lenis) {
                window.lenis.scrollTo(0, { immediate: true })
            } else {
                window.scrollTo(0, 0)
            }
        }
    }, [pathname, hash, state])

    return null
}

const AppRouter = () => {
    const { isFilterOpen, setIsFilterOpen, filters, applyFilters } = useFilters()
    const { isRTL } = useLanguage()
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [hasEntered, setHasEntered] = useState(() => {
        return sessionStorage.getItem('hasEntered') === 'true'
    })

    // Block scroll until entry
    useEffect(() => {
        if (!hasEntered) {
            document.body.style.overflow = 'hidden'
            if (window.lenis) window.lenis.stop()
        } else {
            document.body.style.overflow = 'unset'
            if (window.lenis) window.lenis.start()
            sessionStorage.setItem('hasEntered', 'true')

            // Dynamically load GSAP/ScrollTrigger only after entry
            const initGSAP = async () => {
                const { default: gsap } = await import('gsap')
                const { ScrollTrigger } = await import('gsap/ScrollTrigger')
                gsap.registerPlugin(ScrollTrigger)

                setTimeout(() => {
                    ScrollTrigger.refresh()
                }, 500)
            }
            initGSAP()
        }
    }, [hasEntered])

    const handleSearchClose = useCallback(() => setIsSearchOpen(false), [])
    const handleSearchOpen = useCallback(() => setIsSearchOpen(true), [])

    const commonProps = {
        isSearchOpen,
        onSearchOpen: handleSearchOpen,
        onSearchClose: handleSearchClose,
        searchQuery,
        setSearchQuery,
        hasEntered
    }

    return (
        <div className="bg-luxury-black overflow-x-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
            <Suspense fallback={null}>
                {!hasEntered && <IntroScreen onEnter={() => setHasEntered(true)} />}

                <SmoothScroll>
                    <CustomCursor />
                    <LanguageSidebar />
                    <FilterOverlay
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        filters={filters}
                        onFilterChange={applyFilters}
                    />
                    <SearchOverlay
                        isOpen={isSearchOpen}
                        onClose={handleSearchClose}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <div className={`min-h-screen transition-opacity duration-[1500ms] ease-out ${hasEntered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <ScrollToHash />

                        <Suspense fallback={<PageLoader />}>
                            <Routes>
                                {/* Frontend Layout */}
                                <Route element={<FrontendLayout {...commonProps} />}>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/listing" element={<PropertyListing />} />
                                    <Route path="/property/:id" element={<PropertyDetails />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/agents" element={<Agents />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/add-property" element={<AddProperty />} />
                                    <Route path="/edit-profile" element={<EditProfile />} />
                                    <Route path="/blog" element={<Blog />} />
                                    <Route path="/blog/:slug" element={<BlogDetails />} />
                                    <Route path="/faq" element={<Faq />} />
                                </Route>

                                {/* Auth Layout */}
                                <Route element={<AuthLayout {...commonProps} />}>
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/signup" element={<Signup />} />
                                </Route>
                            </Routes>
                        </Suspense>
                    </div>
                </SmoothScroll>
            </Suspense>
        </div>
    )
}

export default AppRouter
