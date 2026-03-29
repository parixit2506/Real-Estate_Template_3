import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Context
import { useFilters } from '../context/FilterContext'
import { useLanguage } from '../context/LanguageContext'

// Layouts
import FrontendLayout from '../layouts/FrontendLayout'
import AuthLayout from '../layouts/AuthLayout'

// UI Components
import SmoothScroll from '../components/ui/SmoothScroll'
import CustomCursor from '../components/ui/CustomCursor'
import IntroScreen from '../components/ui/IntroScreen'
import LanguageSidebar from '../components/ui/LanguageSidebar'
import FilterOverlay from '../components/ui/FilterOverlay'
import SearchOverlay from '../components/ui/SearchOverlay'

// Pages
import Home from '../views/MainPages/Home'
import PropertyListing from '../views/MainPages/PropertyListing'
import PropertyDetails from '../views/MainPages/PropertyDetails'
import About from '../views/MainPages/About'

import Login from '../views/AuthPages/Login'
import Signup from '../views/AuthPages/Signup'

import Blog from '../views/BlogPages/Blog'
import BlogDetails from '../views/BlogPages/BlogDetails'

import Profile from '../views/MiscPages/Profile'
import AddProperty from '../views/MiscPages/AddProperty'
import Agents from '../views/MiscPages/Agents'
import Contact from '../views/MiscPages/Contact'
import EditProfile from '../views/MiscPages/EditProfile'
import Faq from '../views/MiscPages/Faq'

gsap.registerPlugin(ScrollTrigger)

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
    const [hasEntered, setHasEntered] = useState(false)

    // Block scroll until entry
    useEffect(() => {
        if (!hasEntered) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
            const timeout = setTimeout(() => {
                ScrollTrigger.refresh()
            }, 500)
            return () => clearTimeout(timeout)
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
                </div>
            </SmoothScroll>
        </div>
    )
}

export default AppRouter
