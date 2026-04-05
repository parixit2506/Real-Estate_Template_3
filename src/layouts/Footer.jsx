import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import {
    Instagram,
    Twitter,
    Linkedin,
    Facebook,
    Mail,
    Phone,
    MapPin,
    ArrowRight
} from 'lucide-react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const location = useLocation()
    const isHome = location.pathname === '/'
    const { isDarkMode } = useTheme()

    const navLinks = [
        { name: 'Home', href: isHome ? '#home' : '/' },
        { name: 'Properties', href: isHome ? '#properties' : '/listing' },
        { name: 'About', href: isHome ? '#about' : '/about' },
        { name: 'Contact', href: isHome ? '#contact' : '/contact' },
    ]

    const socialLinks = [
        { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
        { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
        { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
        { icon: <Facebook size={18} />, href: '#', label: 'Facebook' },
    ]

    return (
        <footer className="bg-luxury-black border-t border-luxury-charcoal pt-24 pb-12 section-padding relative overflow-hidden">
            {/* Subtle Gradient Background */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent" />

            <div className="container-luxury relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12 lg:gap-8 mb-20">

                    {/* Brand Column */}
                    <div className="space-y-8">
                        <div>
                            <Link to="/" className="inline-block group mb-6">
                                <div className="relative w-40 h-16">
                                    <img
                                        src={isDarkMode ? "/For Dark Theme.svg" : "/For Light Theme.svg"}
                                        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                                        alt="Logo"
                                    />
                                </div>
                            </Link>
                            <p className="text-luxury-beige-light/80 text-sm leading-relaxed mb-8 max-w-xs">
                                Redefining the art of luxury living. We curate the most exceptional properties for the most discerning clients globally.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full border border-luxury-charcoal-light flex items-center justify-center text-luxury-beige hover:border-luxury-gold hover:text-luxury-gold hover:bg-luxury-gold/5 transition-luxury group"
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-300">
                                        {social.icon}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h3 className="text-luxury-off-white text-sm font-semibold uppercase tracking-[0.2em] mb-8">Navigation</h3>
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-luxury-beige-light/80 hover:text-luxury-gold transition-luxury text-sm flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-4 transition-all duration-300 h-[1px] bg-luxury-gold mr-0 group-hover:mr-2 opacity-0 group-hover:opacity-100"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="text-luxury-off-white text-sm font-semibold uppercase tracking-[0.2em] mb-8">Get In Touch</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-luxury-charcoal rounded-lg text-luxury-gold">
                                    <MapPin size={16} />
                                </div>
                                <span className="text-luxury-beige-light/80 text-sm leading-relaxed">
                                    721 Fifth Avenue<br />
                                    New York, NY 10022
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 bg-luxury-charcoal rounded-lg text-luxury-gold">
                                    <Phone size={16} />
                                </div>
                                <span className="text-luxury-beige-light/80 text-sm">
                                    +1 (212) 555-0123
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 bg-luxury-charcoal rounded-lg text-luxury-gold">
                                    <Mail size={16} />
                                </div>
                                <span className="text-luxury-beige-light/80 text-sm">
                                    concierge@luxe.com
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h3 className="text-luxury-off-white text-sm font-semibold uppercase tracking-[0.2em] mb-8">Newsletter</h3>
                        <p className="text-luxury-beige-light/80 text-sm mb-6">
                            Subscribe to receive curated property listings and market insights.
                        </p>
                        <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-luxury-charcoal border border-luxury-charcoal-light focus:border-luxury-gold/50 outline-none text-luxury-off-white px-5 py-3 pr-12 text-sm transition-luxury"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-luxury-gold hover:text-luxury-gold-light transition-luxury"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="divider-luxury opacity-20 mb-12"></div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
                    <div className="order-2 md:order-1">
                        <p className="text-luxury-beige-light/60 text-[10px] uppercase tracking-[0.25em] font-medium text-center md:text-left transition-luxury hover:text-luxury-beige-light">
                            © {currentYear} LUXE Global Real Estate. All Rights Reserved.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3 order-1 md:order-2 px-4 sm:px-0">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-luxury-beige-light/60 text-[10px] uppercase tracking-[0.2em] hover:text-luxury-gold transition-luxury whitespace-nowrap"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Accent */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
        </footer>
    );
};

export default Footer;

