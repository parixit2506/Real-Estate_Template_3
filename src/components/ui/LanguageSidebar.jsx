import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'

const LanguageSidebar = () => {
    const { language, toggleLanguage, isRTL } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)
    const sidebarRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (isOpen) {
                gsap.to(contentRef.current, {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    pointerEvents: 'auto',
                    ease: 'power3.out'
                })
            } else {
                gsap.to(contentRef.current, {
                    x: isRTL ? -20 : 20,
                    opacity: 0,
                    duration: 0.4,
                    pointerEvents: 'none',
                    ease: 'power3.in'
                })
            }
        }, sidebarRef)
        return () => ctx.revert()
    }, [isOpen, isRTL])

    return (
        <div
            ref={sidebarRef}
            className={`fixed top-1/2 -translate-y-1/2 z-[9999] flex items-center ${isRTL ? 'left-0 flex-row-reverse' : 'right-0 flex-row-reverse'}`}
        >
            {/* Toggle Handle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center w-7 h-10 sm:w-8 sm:h-12 bg-luxury-gold text-luxury-black shadow-2xl hover:bg-luxury-gold-light transition-colors z-20 ${isRTL ? 'rounded-r-full' : 'rounded-l-full'}`}
                aria-label="Toggle language menu"
            >
                {isOpen ? (
                    isRTL ? <ChevronLeft size={14} className="sm:w-[16px] sm:h-[16px]" /> : <ChevronRight size={14} className="sm:w-[16px] sm:h-[16px]" />
                ) : (
                    isRTL ? <ChevronRight size={14} className="sm:w-[16px] sm:h-[16px]" /> : <ChevronLeft size={14} className="sm:w-[16px] sm:h-[16px]" />
                )}
            </button>

            {/* Content Area */}
            <div
                ref={contentRef}
                className={`bg-luxury-charcoal/95 backdrop-blur-xl border border-luxury-gold/30 h-8 sm:h-10 flex items-center shadow-2xl opacity-0 pointer-events-none z-10 ${isRTL ? 'rounded-r-full -ml-4 pl-5 pr-3 sm:pl-6 sm:pr-4' : 'rounded-l-full -mr-4 pr-5 pl-3 sm:pr-6 sm:pl-4'}`}
                style={{ transform: `translateX(${isRTL ? '-20px' : '20px'})` }}
            >
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] text-luxury-off-white hover:text-luxury-gold transition-colors uppercase whitespace-nowrap"
                >
                    <span className={language === 'en' ? 'text-luxury-gold' : 'opacity-40'}>EN</span>
                    <span className="w-1 h-1 rounded-full bg-luxury-gold/30" />
                    <span className={language === 'ar' ? 'text-luxury-gold' : 'opacity-40'}>AR</span>
                </button>
            </div>
        </div>
    )
}

export default LanguageSidebar
