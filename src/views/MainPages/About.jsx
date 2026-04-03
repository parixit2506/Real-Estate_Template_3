import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../../components/ui/PageHero'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
    const heroRef = useRef(null)
    const storyImageRef = useRef(null)
    const missionImageRef = useRef(null)
    const storyTextRef = useRef(null)
    const missionTextRef = useRef(null)
    const valuesGridRef = useRef(null)
    const teamGridRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Scroll Line Animation handled by PageHero component

            // Our Story Reveal
            if (storyTextRef.current) {
                // Text Reveal
                gsap.from(storyTextRef.current.children, {
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: storyTextRef.current,
                        start: 'top 80%',
                    },
                })

                // Image Reveal
                gsap.from(storyImageRef.current.parentElement, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: storyTextRef.current,
                        start: 'top 80%',
                    },
                })
            }

            // Our Mission Reveal
            if (missionTextRef.current) {
                // Text Reveal
                gsap.from(missionTextRef.current.children, {
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: missionTextRef.current,
                        start: 'top 80%',
                    },
                })

                // Image Reveal
                gsap.from(missionImageRef.current.parentElement, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: missionTextRef.current,
                        start: 'top 80%',
                    },
                })
            }

            // Story Image Parallax
            if (storyImageRef.current) {
                gsap.to(storyImageRef.current, {
                    yPercent: 20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: storyImageRef.current.parentElement,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                })
            }

            // Mission Image Parallax
            if (missionImageRef.current) {
                gsap.to(missionImageRef.current, {
                    yPercent: 20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: missionImageRef.current.parentElement,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                })
            }

            if (valuesGridRef.current) {
                gsap.fromTo(gsap.utils.toArray(valuesGridRef.current.children),
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: valuesGridRef.current,
                            start: 'top 92%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                )
            }

            if (teamGridRef.current) {
                gsap.fromTo(gsap.utils.toArray(teamGridRef.current.children),
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: teamGridRef.current,
                            start: 'top 92%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                )
            }

            // Refresh ScrollTrigger after animations are set and a short delay for layout
            const refresh = () => ScrollTrigger.refresh()
            setTimeout(refresh, 100)
            setTimeout(refresh, 1000)
            window.addEventListener('load', refresh)
            return () => window.removeEventListener('load', refresh)
        }, heroRef)

        return () => ctx.revert()
    }, [])

    const values = [
        {
            title: 'Excellence',
            description: 'We pursue perfection in every detail, from property curation to client service.',
            icon: '✦'
        },
        {
            title: 'Integrity',
            description: 'Trust and transparency form the foundation of every relationship we build.',
            icon: '◆'
        },
        {
            title: 'Innovation',
            description: 'We embrace cutting-edge technology while honoring timeless luxury principles.',
            icon: '◈'
        },
        {
            title: 'Discretion',
            description: 'Your privacy and confidentiality are paramount in all our interactions.',
            icon: '◇'
        }
    ]

    const team = [
        {
            name: 'Victoria Sterling',
            role: 'Chief Executive Officer',
            image: '/about/about-team-1.png'
        },
        {
            name: 'Alexander Chen',
            role: 'Director of Acquisitions',
            image: '/about/about-team-2.png'
        },
        {
            name: 'Isabella Moretti',
            role: 'Head of Architecture',
            image: '/about/about-team-3.png'
        },
        {
            name: 'James Worthington',
            role: 'Global Market Specialist',
            image: '/about/about-team-4.png'
        }
    ]

    return (
        <>
            <div ref={heroRef} className="min-h-screen bg-luxury-black">
                {/* Hero Section */}
                <PageHero
                    title={<>Redefining Luxury <br /> Real Estate</>}
                    subtitle="About Luxe"
                    description="For over two decades, we've been the trusted name in ultra-luxury property acquisition and representation."
                    backgroundImage="/about/about-hero.png"
                    breadcrumbItems={[{ label: 'About', path: '/about' }]}
                />

                {/* Our Story Section */}
                <div className="about-sections-container py-32 bg-luxury-black">
                    <div className="max-w-7xl mx-auto px-4">

                        <div className="about-section grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-64">
                            <div ref={storyTextRef} className="space-y-6">
                                <span className="text-luxury-gold text-xs font-bold tracking-[0.2em] uppercase block">
                                    Our Story
                                </span>
                                <h2 className="text-4xl md:text-5xl font-display font-light text-white leading-tight">
                                    A Legacy of Excellence
                                </h2>
                                <p className="text-luxury-beige-light leading-relaxed text-lg">
                                    Founded in 2002, Luxe Estate emerged from a simple yet powerful vision: to create a real estate experience that matches the sophistication of the properties we represent. What began as a boutique agency in London has evolved into a global network serving discerning clients across six continents.
                                </p>
                                <p className="text-luxury-beige-light leading-relaxed text-lg">
                                    Our journey has been defined by an unwavering commitment to excellence, discretion, and personalized service. We don't just sell properties; we curate lifestyles, forge lasting relationships, and create opportunities for our clients to own pieces of architectural and cultural significance.
                                </p>
                            </div>
                            <div className="relative h-[500px] rounded-sm overflow-hidden will-change-transform">
                                <div ref={storyImageRef} className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform">
                                    <img
                                        src="/about/about-story.png"
                                        alt="Luxury Property"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Mission & Vision */}
                        <div className="about-section grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-40">
                            <div className="relative h-[500px] rounded-sm overflow-hidden order-2 lg:order-1 will-change-transform">
                                <div ref={missionImageRef} className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform">
                                    <img
                                        src="/about/about-mission.png"
                                        alt="Modern Architecture"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div ref={missionTextRef} className="space-y-8 order-1 lg:order-2">
                                <div>
                                    <span className="text-luxury-gold text-xs font-bold tracking-[0.2em] uppercase block mb-4">
                                        Our Mission
                                    </span>
                                    <p className="text-2xl font-display italic text-white leading-relaxed">
                                        "To redefine luxury living through architectural excellence, unparalleled service, and a deep understanding of what makes a house a home."
                                    </p>
                                </div>
                                <div>
                                    <span className="text-luxury-gold text-xs font-bold tracking-[0.2em] uppercase block mb-4">
                                        Our Vision
                                    </span>
                                    <p className="text-luxury-beige-light leading-relaxed text-lg">
                                        We envision a world where luxury real estate transcends mere transactions, becoming a gateway to extraordinary experiences, meaningful connections, and lasting legacies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="py-20 bg-luxury-charcoal">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="text-luxury-gold text-xs font-bold tracking-[0.2em] uppercase mb-6 block">
                                Our Values
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-light text-white leading-tight">
                                Principles That Guide Us
                            </h2>
                        </div>

                        <div ref={valuesGridRef} className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <div key={index} className="value-card bg-luxury-charcoal/60 backdrop-blur-sm p-8 rounded-sm border border-luxury-gold/10 hover:border-luxury-gold transition-colors duration-500 group shadow-lg shadow-pure-black/20">
                                    <div className="text-4xl text-luxury-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-display text-white mb-4">
                                        {value.title}
                                    </h3>
                                    <p className="text-luxury-beige-light leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="py-20 bg-luxury-black">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="text-luxury-gold text-xs font-bold tracking-[0.2em] uppercase mb-6 block">
                                Our Team
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-light text-white leading-tight mb-6">
                                Meet Our Leadership
                            </h2>
                            <p className="text-luxury-beige-light text-lg max-w-2xl mx-auto">
                                A team of seasoned professionals dedicated to delivering exceptional results.
                            </p>
                        </div>

                        <div ref={teamGridRef} className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {team.map((member, index) => (
                                <div key={index} className="team-member group cursor-pointer">
                                    <div className="relative h-80 rounded-sm overflow-hidden mb-6">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-pure-black/80 via-transparent to-transparent opacity-80" />
                                    </div>
                                    <h3 className="text-xl font-display text-luxury-off-white mb-2 group-hover:text-luxury-gold transition-colors duration-300">
                                        {member.name}
                                    </h3>
                                    <p className="text-luxury-beige text-sm tracking-wide">
                                        {member.role}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="py-20 bg-luxury-charcoal">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-display font-light text-white mb-6 leading-tight">
                            Ready to Begin Your Journey?
                        </h2>
                        <p className="text-luxury-beige-light text-lg mb-10">
                            Let our team of experts guide you to your dream property.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="px-8 py-4 bg-luxury-gold text-pure-black font-semibold text-sm uppercase tracking-widest hover:bg-pure-white transition-all duration-300 shadow-xl shadow-pure-black/20"
                            >
                                Contact Us
                            </a>
                            <a
                                href="/listing"
                                className="px-8 py-4 border border-luxury-gold text-luxury-gold font-semibold text-sm uppercase tracking-widest hover:bg-luxury-gold hover:text-pure-black transition-all duration-300"
                            >
                                View Properties
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
