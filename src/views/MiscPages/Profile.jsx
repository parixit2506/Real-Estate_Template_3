import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { properties as propertiesData } from '../../StaticData/properties'
import PropertyCard from '../../components/cards/PropertyCard'
import { User, Settings, Plus, LogOut, Home, FileText, Eye, Diamond, X, Mail, Phone, Calendar, MessageSquare, Clock, MapPin, Globe, Award, ShieldCheck, CheckCircle2 } from 'lucide-react'

const mockInquiries = [
    {
        id: 1,
        date: new Date(Date.now() - 3600000).toISOString(),
        name: "Julianne Moore",
        email: "j.moore@luxury-living.com",
        type: "Property Inquiry",
        property: "The Glass House, Mayfair",
        status: "New",
        phone: "+44 7700 900077",
        message: "I am interested in viewing this property next Tuesday. Is there any flexibility on the price?"
    },
    {
        id: 2,
        date: new Date(Date.now() - 86400000).toISOString(),
        name: "Sebastian Vettle",
        email: "sebastian@prestige-invest.de",
        type: "Viewing Request",
        property: "Penthouse at One Hyde Park",
        status: "Read",
        phone: "+49 30 1234567",
        message: "Looking for a high-floor unit with park views for my base in London."
    },
    {
        id: 3,
        date: new Date(Date.now() - 172800000).toISOString(),
        name: "Elena Rodriguez",
        email: "elena.r@global-estates.es",
        type: "Contact Request",
        status: "Read",
        phone: "+34 912 345 678",
        message: "I would like to discuss a potential partnership regarding Spanish coastal properties."
    },
    {
        id: 4,
        date: new Date(Date.now() - 259200000).toISOString(),
        name: "Marcus Aurelius",
        email: "marcus@stoic-holdings.com",
        type: "Property Inquiry",
        property: "Belgravia Classic Townhouse",
        status: "Read",
        phone: "+44 20 7946 0555",
        message: "We are expanding our portfolio in Belgravia and this property fits our criteria perfectly."
    },
    {
        id: 5,
        date: new Date(Date.now() - 432000000).toISOString(),
        name: "Sophia Chen",
        email: "sophia.chen@orient-pacific.com",
        type: "Investment Query",
        status: "Read",
        phone: "+852 2123 4567",
        message: "My clients in Hong Kong are looking for stable yields in the UK luxury market. Can you provide more data on this area?"
    }
]

const Profile = () => {
    const headerRef = useRef(null)
    const contentRef = useRef(null)
    const statsRef = useRef(null)


    const [inquiries, setInquiries] = useState(() => {
        const saved = localStorage.getItem('inquiries')
        return saved ? JSON.parse(saved) : mockInquiries
    })
    const [selectedInquiry, setSelectedInquiry] = useState(null)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

    const openInquiryDetail = (inquiry) => {
        setSelectedInquiry(inquiry)
        setIsDetailModalOpen(true)

        // Mark as read if it was 'New'
        if (inquiry.status === 'New') {
            const updated = inquiries.map(iq =>
                iq.id === inquiry.id ? { ...iq, status: 'Read' } : iq
            )
            setInquiries(updated)
            localStorage.setItem('inquiries', JSON.stringify(updated))
        }
    }

    const closeInquiryDetail = () => {
        setIsDetailModalOpen(false)
        setTimeout(() => setSelectedInquiry(null), 500)
    }

    // Mock user data
    const user = {
        name: "Alexander Knight",
        email: "alexander@vanguard-estates.com",
        phone: "+44 (0) 20 7946 0123",
        location: "Mayfair, London",
        avatar: "/profile/profile.png",
        joinDate: "Member since Jan 2024",
        status: "PLATINUM",
        bio: "Specializing in ultra-prime residential acquisitions across the EMEA region. With over a decade of experience in Mayfair and Knightsbridge, I help global investors secure the most exclusive off-market opportunities.",
        website: "www.vanguard-estates.com",
        socials: {
            instagram: "@alex_knight_luxury",
            linkedin: "linkedin.com/in/alexknight"
        },
        completion: 85,
        listings: propertiesData.slice(0, 3), // Mock user's listings
        currentPlan: {
            name: "SIGNATURE",
            price: "$1,299",
            status: "Active",
            expiryDate: "Feb 2025",
            features: [
                "Professional photography",
                "Drone videography suite",
                "Featured homepage placement",
                "Editorial-style copywriting"
            ]
        }
    }

    const completionRadius = 70
    const completionCircumference = 2 * Math.PI * completionRadius
    const completionOffset = completionCircumference - (user.completion / 100) * completionCircumference

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

        tl.fromTo(
            headerRef.current.children,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, stagger: 0.15 }
        )
            .fromTo(
                statsRef.current.children,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1, stagger: 0.1 },
                "-=1"
            )
            .fromTo(
                ".about-section",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2 },
                "-=0.8"
            )
            .fromTo(
                ".plan-section",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2 },
                "-=0.6"
            )
            .fromTo(
                contentRef.current.children,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 },
                "-=0.8"
            )
            .fromTo(
                ".inquiry-section",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2 },
                "-=0.6"
            )
    }, [])

    return (
        <div className="bg-luxury-black min-h-screen text-luxury-off-white">
            {/* Header / Profile Cover */}
            <div className="pt-24 pb-12 md:pt-32 md:pb-16 px-6 md:px-12 lg:px-20 border-b border-white/5 bg-luxury-charcoal/30 flex justify-center" ref={headerRef}>
                <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Completion Circle & Avatar */}
                    <div className="relative group shrink-0">
                        <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center">
                            {/* Progress Circle SVG */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r={completionRadius}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="transparent"
                                    className="text-white/5"
                                />
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r={completionRadius}
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    fill="transparent"
                                    strokeDasharray={completionCircumference}
                                    strokeDashoffset={completionOffset}
                                    strokeLinecap="round"
                                    className="text-luxury-gold transition-all duration-1000 ease-out"
                                />
                            </svg>

                            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-luxury-gold shadow-2xl z-10">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-luxury duration-700"
                                />
                            </div>

                            {/* Percentage Badge */}
                            <div className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-black font-bold text-[10px] w-10 h-10 rounded-full flex items-center justify-center border-2 border-luxury-black z-20">
                                {user.completion}%
                            </div>
                        </div>
                        <button className="absolute bottom-4 right-4 p-2 bg-luxury-gold text-luxury-black rounded-full hover:bg-white transition-luxury shadow-lg z-20">
                            <Settings size={16} />
                        </button>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display">{user.name}</h1>
                            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-luxury-black text-[10px] font-bold rounded-sm tracking-widest shadow-lg animate-shimmer bg-[length:200%_100%]">
                                <Award size={12} />
                                {user.status} STATUS
                            </div>
                        </div>

                        <p className="text-luxury-beige/60 uppercase tracking-[0.2em] text-[10px] sm:text-xs font-medium mb-8">
                            {user.email} • <span className="whitespace-nowrap">{user.joinDate}</span>
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
                            <Link
                                to="/add-property"
                                className="flex items-center gap-2 px-6 py-3 bg-luxury-gold text-luxury-black font-bold uppercase tracking-widest text-[10px] transition-luxury hover:bg-white"
                            >
                                <Plus size={14} /> Add Property
                            </Link>
                            <Link
                                to="/edit-profile"
                                className="flex items-center gap-2 px-6 py-3 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] transition-luxury hover:bg-white/10"
                            >
                                <Settings size={14} /> Edit Profile
                            </Link>
                            <button className="flex items-center gap-2 px-6 py-3 border border-red-500/30 text-red-500 font-bold uppercase tracking-widest text-[10px] transition-luxury hover:bg-red-500 hover:text-white">
                                <LogOut size={14} /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Me Section & Contacts */}
            <div className="py-12 md:py-16 px-6 md:px-12 lg:px-20 about-section flex justify-center border-b border-white/5 bg-luxury-black/20">
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-6 flex items-center gap-3">
                                <span className="w-8 h-px bg-luxury-gold"></span> Advisor Biography
                            </h3>
                            <p className="text-luxury-off-white/80 leading-relaxed text-sm sm:text-base font-normal max-w-2xl">
                                "{user.bio}"
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 rounded-full text-luxury-gold border border-white/5">
                                    <MapPin size={16} />
                                </div>
                                <div>
                                    <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Base Location</p>
                                    <p className="text-sm font-medium">{user.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 rounded-full text-luxury-gold border border-white/5">
                                    <Phone size={16} />
                                </div>
                                <div>
                                    <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Private Line</p>
                                    <p className="text-sm font-medium">{user.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-luxury-charcoal/40 p-8 border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 blur-[40px] rounded-full -mr-16 -mt-16"></div>
                        <h3 className="text-xs uppercase tracking-widest text-white mb-8">Digital Presence</h3>
                        <div className="space-y-6">
                            <a href="#" className="flex items-center justify-between text-luxury-beige-light hover:text-luxury-gold transition-luxury group">
                                <div className="flex items-center gap-3">
                                    <Globe size={16} className="text-white/30 group-hover:text-luxury-gold transition-colors" />
                                    <span className="text-xs uppercase tracking-widest">{user.website}</span>
                                </div>
                                <Plus size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="#" className="flex items-center justify-between text-luxury-beige-light hover:text-luxury-gold transition-luxury group">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck size={16} className="text-white/30 group-hover:text-luxury-gold transition-colors" />
                                    <span className="text-xs uppercase tracking-widest">Verified Advisor</span>
                                </div>
                                <CheckCircle2 size={12} className="text-green-500" />
                            </a>
                        </div>
                        <div className="mt-10 pt-8 border-t border-white/5 flex gap-6">
                            <div className="text-center flex-1">
                                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold">100%</p>
                                <p className="text-[9px] text-white/50 uppercase tracking-widest">Trust Rating</p>
                            </div>
                            <div className="text-center flex-1">
                                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold">12Y</p>
                                <p className="text-[9px] text-white/50 uppercase tracking-widest">Experience</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-12 md:py-16 px-6 md:px-12 lg:px-20 flex justify-center" ref={statsRef}>
                <div className="max-w-7xl w-full">
                    <h3 className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-8 md:mb-12 flex items-center gap-3">
                        <span className="w-8 h-px bg-luxury-gold"></span> Portfolio Performance
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[
                            { label: "Active Listings", value: user.listings.length, icon: <Home size={18} /> },
                            { label: "Total Inquiries", value: inquiries.length, icon: <MessageSquare size={18} /> },
                            { label: "New Leads", value: inquiries.filter(i => i.status === 'New').length, icon: <Clock size={18} />, highlight: true },
                            { label: "Success Rate", value: "98%", icon: <Diamond size={18} /> }
                        ].map((stat, i) => (
                            <div key={i} className={`bg-luxury-charcoal/40 p-8 border border-white/5 backdrop-blur-md hover:border-luxury-gold/40 transition-luxury group relative overflow-hidden ${stat.highlight ? 'ring-1 ring-luxury-gold/20' : ''}`}>
                                {/* Accent line */}
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-luxury duration-700"></div>

                                <div className="flex flex-col gap-5">
                                    <div className={`p-3 bg-white/5 w-fit rounded-sm transition-luxury duration-500 shadow-sm ${stat.highlight ? 'text-luxury-gold bg-luxury-gold/10' : 'text-luxury-gold group-hover:bg-luxury-gold group-hover:text-black'}`}>
                                        {stat.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-beige/40 mb-2 font-bold">{stat.label}</p>
                                        <h3 className="text-3xl font-display text-white tracking-tight">{stat.value}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Current Plan Section */}
            <div className="py-10 md:py-12 px-6 md:px-12 lg:px-20 plan-section flex justify-center">
                <div className="max-w-7xl w-full">
                    <div className="bg-luxury-charcoal/30 border border-luxury-gold/20 p-6 sm:p-8 md:p-12 relative overflow-hidden group hover:border-luxury-gold/40 transition-luxury">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/5 blur-[80px] -mr-32 -mt-32 rounded-full group-hover:bg-luxury-gold/10 transition-luxury"></div>

                        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 relative z-10">
                            <div className="flex-1">
                                <span className="text-[10px] md:text-xs tracking-[0.3em] text-luxury-gold uppercase font-bold mb-4 block">Current Membership</span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-white mb-4 italic">{user.currentPlan.name}</h2>
                                <p className="text-luxury-beige/60 text-[10px] md:text-sm tracking-widest uppercase mb-8">Premium Representation Tier</p>

                                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6">
                                    {user.currentPlan.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-1 h-1 bg-luxury-gold rounded-full shrink-0"></div>
                                            <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/80">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:w-1/3 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-12">
                                <div className="mb-6 md:mb-8 text-center lg:text-left">
                                    <p className="text-[10px] uppercase tracking-widest text-luxury-beige/40 mb-2">Subscription Details</p>
                                    <h4 className="text-xl md:text-2xl font-display text-white">{user.currentPlan.price}<span className="text-sm font-sans text-white/30 ml-2 italic">/ year</span></h4>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
                                        <span className="text-white/40">Status</span>
                                        <span className="text-green-500 font-bold">{user.currentPlan.status}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
                                        <span className="text-white/40">Renews</span>
                                        <span className="text-white">{user.currentPlan.expiryDate}</span>
                                    </div>

                                    <button className="mt-4 px-6 md:px-8 py-3.5 md:py-4 bg-white/5 border border-white/10 text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-luxury-gold hover:text-black hover:border-luxury-gold transition-luxury w-full">
                                        Upgrade Membership
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* My Listings Section */}
            <div className="px-6 md:px-12 lg:px-20 pb-20 md:pb-32 flex justify-center" ref={contentRef}>
                <div className="max-w-7xl w-full">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 md:mb-12">
                        <h2 className="text-2xl md:text-3xl font-display text-center sm:text-left">My Property Portfolio</h2>
                        <div className="hidden sm:block flex-1 mx-8 h-px bg-luxury-gold/30"></div>
                    </div>


                    {user.listings.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {user.listings.map((property) => (
                                <div key={property.id} className="relative group">
                                    <PropertyCard property={property} />
                                    <div className="absolute top-4 left-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-luxury">
                                        <button className="p-2 bg-luxury-black/80 text-white hover:bg-luxury-gold hover:text-black transition-luxury backdrop-blur-md border border-white/10 rounded-sm">
                                            <Settings size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 md:py-20 text-center bg-luxury-charcoal/20 border border-dashed border-white/10 px-6">
                            <h3 className="text-xl font-display mb-4">No listings found</h3>
                            <p className="text-luxury-beige/40 uppercase tracking-widest text-[10px] md:text-xs mb-8">Ready to showcase your exclusive property?</p>
                            <Link
                                to="/add-property"
                                className="inline-block px-8 py-4 border border-luxury-gold text-luxury-gold uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-luxury-gold hover:text-black transition-luxury"
                            >
                                Submit First Entry
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Inquiries & Leads Section */}
            <div className="px-6 md:px-12 lg:px-20 pb-12 sm:pb-20 md:pb-32 inquiry-section flex justify-center">
                <div className="max-w-7xl w-full">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-8 md:mb-10">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-display">Inquiries & Leads</h2>
                            <span className="px-2 py-0.5 bg-luxury-gold text-luxury-black text-[10px] font-bold rounded-sm">
                                {inquiries.filter(i => i.status === 'New').length} NEW
                            </span>
                        </div>
                        <div className="hidden sm:block flex-1 mx-8 h-px bg-luxury-gold/30"></div>
                        <button
                            onClick={() => {
                                localStorage.removeItem('inquiries')
                                setInquiries([])
                            }}
                            className="text-[10px] uppercase tracking-widest text-white/30 hover:text-red-500 transition-colors"
                        >
                            Clear All
                        </button>
                    </div>

                    <div className="bg-luxury-charcoal/30 border border-white/5 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/5">
                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Date</th>
                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Client</th>
                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Type</th>
                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Status</th>
                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-luxury-gold font-bold text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {inquiries.length > 0 ? (
                                        inquiries.map((inquiry) => (
                                            <tr key={inquiry.id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-6 py-5">
                                                    <p className="text-xs text-white/80">{new Date(inquiry.date).toLocaleDateString()}</p>
                                                    <p className="text-[10px] text-white/40 mt-1">{new Date(inquiry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <p className="text-sm font-medium text-white">{inquiry.name}</p>
                                                    <p className="text-[10px] text-white/40 mt-0.5">{inquiry.email}</p>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-1.5 h-1.5 rounded-full ${inquiry.type === 'Property Inquiry' ? 'bg-luxury-gold' :
                                                            inquiry.type === 'Viewing Request' ? 'bg-emerald-400' :
                                                                inquiry.type === 'Investment Query' ? 'bg-purple-400' :
                                                                    'bg-blue-400'
                                                            }`}></span>
                                                        <span className="text-[10px] uppercase tracking-widest text-white/60">{inquiry.type}</span>
                                                    </div>
                                                    {inquiry.property && (
                                                        <p className="text-[9px] text-luxury-gold/60 italic mt-1 truncate max-w-[150px]">{inquiry.property}</p>
                                                    )}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className={`text-[9px] uppercase tracking-[0.2em] font-bold px-2 py-1 rounded-sm ${inquiry.status === 'New'
                                                        ? 'bg-luxury-gold/20 text-luxury-gold animate-pulse'
                                                        : 'bg-white/5 text-white/40'
                                                        }`}>
                                                        {inquiry.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <button
                                                        onClick={() => openInquiryDetail(inquiry)}
                                                        className="px-4 py-2 border border-white/10 text-[10px] uppercase tracking-widest hover:border-luxury-gold hover:text-luxury-gold transition-luxury font-bold"
                                                    >
                                                        Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-16 text-center">
                                                <p className="text-white/30 text-xs uppercase tracking-[0.3em]">No inquiries yet</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inquiry Detail Modal */}
            {isDetailModalOpen && selectedInquiry && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-luxury-black/95 backdrop-blur-sm"
                        onClick={closeInquiryDetail}
                    />
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-luxury-charcoal border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-300 custom-scrollbar">
                        {/* Status Bar */}
                        <div className="h-1 bg-luxury-gold sticky top-0 z-10" />

                        <div className="p-6 sm:p-10">
                            <div className="flex justify-between items-start mb-6 sm:mb-10">
                                <div>
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-bold mb-2 block">
                                        {selectedInquiry.type}
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-display text-white">Inquiry Details</h3>
                                </div>
                                <button
                                    onClick={closeInquiryDetail}
                                    className="p-2 text-white/40 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-10 pb-6 sm:pb-10 border-b border-white/5">
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                                            <User size={14} className="text-luxury-gold" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Client Name</p>
                                            <p className="text-white font-medium">{selectedInquiry.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                                            <Mail size={14} className="text-luxury-gold" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Email Address</p>
                                            <p className="text-white font-medium">{selectedInquiry.email}</p>
                                        </div>
                                    </div>
                                    {selectedInquiry.phone && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                                                <Phone size={14} className="text-luxury-gold" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Phone Number</p>
                                                <p className="text-white font-medium">{selectedInquiry.phone}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4 sm:space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                                            <Calendar size={14} className="text-luxury-gold" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Received On</p>
                                            <p className="text-white font-medium">
                                                {new Date(selectedInquiry.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                            </p>
                                        </div>
                                    </div>
                                    {selectedInquiry.preferredDate && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                                                <Clock size={14} className="text-luxury-gold" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Preferred Viewing</p>
                                                <p className="text-white font-medium">{new Date(selectedInquiry.preferredDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}</p>
                                            </div>
                                        </div>
                                    )}
                                    {selectedInquiry.property && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-luxury-gold/10 flex items-center justify-center shrink-0 border border-luxury-gold/10">
                                                <Home size={14} className="text-luxury-gold" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-luxury-gold mb-1 font-bold">Inquired Property</p>
                                                <p className="text-white font-medium">{selectedInquiry.property}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-8 sm:mb-10">
                                <p className="text-[9px] uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                                    <MessageSquare size={12} className="text-luxury-gold" />
                                    Client Message
                                </p>
                                <div className="p-4 sm:p-6 bg-white/[0.03] border border-white/5 text-luxury-off-white font-normal leading-relaxed text-sm">
                                    "{selectedInquiry.message || 'No message provided'}"
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href={`mailto:${selectedInquiry.email}`}
                                    className="flex-1 bg-luxury-gold text-luxury-black py-4 text-center font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-luxury"
                                >
                                    Reply via Email
                                </a>
                                <button
                                    onClick={closeInquiryDetail}
                                    className="flex-1 border border-white/10 text-white py-4 font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-luxury"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile
