import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('site_language') || 'en'
    })

    const [direction, setDirection] = useState(() => {
        return localStorage.getItem('site_direction') || 'ltr'
    })

    useEffect(() => {
        document.documentElement.lang = language
        document.documentElement.dir = direction
        localStorage.setItem('site_language', language)
        localStorage.setItem('site_direction', direction)

        // Update body class for specific RTL styling if needed
        if (direction === 'rtl') {
            document.body.classList.add('rtl')
        } else {
            document.body.classList.remove('rtl')
        }
    }, [language, direction])

    const toggleLanguage = () => {
        if (language === 'en') {
            setLanguage('ar')
            setDirection('rtl')
        } else {
            setLanguage('en')
            setDirection('ltr')
        }
    }

    return (
        <LanguageContext.Provider value={{
            language,
            direction,
            toggleLanguage,
            isRTL: direction === 'rtl'
        }}>
            {children}
        </LanguageContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
