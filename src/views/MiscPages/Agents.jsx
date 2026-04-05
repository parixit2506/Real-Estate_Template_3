import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../../components/ui/PageHero'
import AgentCard from '../../components/cards/AgentCard'
import Contact from '../../components/sections/Contact'
import { agents as agentsData } from '../../StaticData/agents'

gsap.registerPlugin(ScrollTrigger)

const Agents = () => {
    const heroRef = useRef(null)

    const gridRef = useRef(null)
    const statsRef = useRef(null)

    useEffect(() => {

        // Hero entrance animations handled by PageHero component

        // Agent cards stagger animation
        if (gridRef.current) {
            gsap.fromTo(
                gridRef.current.children,
                {
                    opacity: 0,
                    y: 80,
                    rotationX: -15,
                    transformOrigin: 'top center'
                },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 1,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )
        }

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    }, [])

    // Calculate total stats
    const totalSales = agentsData.reduce((sum, agent) => {
        const sales = parseFloat(agent.sales.replace(/[^0-9.]/g, ''))
        return sum + sales
    }, 0)

    const totalProperties = agentsData.reduce((sum, agent) => {
        const props = parseInt(agent.properties.replace(/[^0-9]/g, ''))
        return sum + props
    }, 0)

    return (
        <div className="bg-luxury-black min-h-screen text-luxury-off-white">
            {/* Hero Section */}
            <div ref={heroRef}>
                <PageHero
                    title="Meet the Agents"
                    subtitle="Our Distinguished Team"
                    description="Our elite team of luxury real estate specialists brings decades of combined experience, unparalleled market knowledge, and a commitment to excellence that defines the LUXE standard."
                    backgroundImage="/agents/agents-hero.png"
                    breadcrumbItems={[{ label: 'Agents', path: '/agents' }]}
                />
            </div>

            {/* Stats Bar Section */}
            <div className="py-16 md:py-20 border-b border-luxury-gold/10 bg-luxury-charcoal/40 backdrop-blur-sm">
                <div className="container-luxury">
                    <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center md:text-left">
                            <p className="text-3xl md:text-5xl font-display text-luxury-gold mb-2">
                                {agentsData.length}
                            </p>
                            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-luxury-beige/60">
                                Elite Agents
                            </p>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-3xl md:text-5xl font-display text-luxury-gold mb-2">
                                ${totalSales.toFixed(1)}B+
                            </p>
                            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-luxury-beige/60">
                                Total Sales
                            </p>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-3xl md:text-5xl font-display text-luxury-gold mb-2">
                                {totalProperties}+
                            </p>
                            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-luxury-beige/60">
                                Properties Sold
                            </p>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-3xl md:text-5xl font-display text-luxury-gold mb-2">
                                15+
                            </p>
                            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-luxury-beige/60">
                                Languages Spoken
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Agents Grid */}
            <div className="section-padding py-16 md:py-20 pb-24 md:pb-32">
                <div className="container-luxury">
                    <div
                        ref={gridRef}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
                    >
                        {agentsData.map((agent, index) => (
                            <AgentCard key={agent.id} agent={agent} index={index} />
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="section-padding py-16 md:py-24 bg-luxury-charcoal border-y border-luxury-gold/10">
                <div className="container-luxury text-center">
                    <h2 className="text-3xl md:text-display-md font-display mb-6">
                        Ready to Find Your Dream Estate?
                    </h2>
                    <p className="text-luxury-beige-light max-w-2xl mx-auto mb-10 text-base md:text-lg">
                        Our agents are standing by to provide personalized guidance and exclusive access
                        to the world's most prestigious properties.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-luxury-gold text-pure-black font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs transition-all duration-500 hover:bg-luxury-off-white hover:text-luxury-black hover:shadow-2xl hover:shadow-luxury-gold/30">
                            Schedule Consultation
                        </button>
                        <button className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-transparent border border-luxury-gold text-luxury-gold font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs transition-all duration-500 hover:bg-luxury-gold hover:text-pure-black">
                            View Properties
                        </button>
                    </div>
                </div>
            </div>

            <Contact />
        </div>
    )
}

export default Agents
