import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const packages = [
    {
        name: 'ESSENTIAL',
        description: 'For private homeowners',
        monthlyPrice: '$499',
        yearlyPrice: '$399',
        pricePrefix: 'Starting from',
        priceSuffix: 'per listing',
        highlight: false,
        features: [
            { name: 'Professional photography', included: true },
            { name: 'Listing on major platforms', included: true },
            { name: 'Standard support management', included: true },
            { name: 'Drone videography suite', included: false },
            { name: 'Featured homepage placement', included: false },
            { name: 'Editorial-style copywriting', included: false },
        ],
        cta: 'Request Listing',
    },
    {
        name: 'SIGNATURE',
        description: 'For high-end estates',
        monthlyPrice: '$1,299',
        yearlyPrice: '$1,039',
        pricePrefix: 'Starting from',
        priceSuffix: 'per listing',
        highlight: true,
        features: [
            { name: 'Professional photography', included: true },
            { name: 'Listing on major platforms', included: true },
            { name: 'Dedicated concierge support', included: true },
            { name: 'Drone videography suite', included: true },
            { name: 'Featured homepage placement', included: true },
            { name: 'Editorial-style copywriting', included: true },
        ],
        cta: 'Request Listing',
    },
    {
        name: 'PRESTIGE',
        description: 'For developers and agencies',
        monthlyPrice: 'Custom Pricing',
        yearlyPrice: 'Custom Pricing',
        pricePrefix: 'Tailored',
        priceSuffix: 'solutions',
        highlight: false,
        features: [
            { name: 'Full brand integration', included: true },
            { name: 'International agency network', included: true },
            { name: 'Virtual reality tours', included: true },
            { name: 'Private showing management', included: true },
            { name: 'Custom marketing strategy', included: true },
            { name: 'Multi-property portfolio', included: true },
        ],
        cta: 'Apply Now',
    }
];

const RepresentationPackages = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const toggleRef = useRef(null);
    const cardsRef = useRef([]);
    const carouselRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

    const handleScroll = (e) => {
        const container = e.target;




        // Track active index for mobile
        if (window.innerWidth < 768) {
            const cardWidth = container.scrollWidth / packages.length;
            const index = Math.round(container.scrollLeft / cardWidth);
            if (index !== activeIndex && index >= 0 && index < packages.length) {
                setActiveIndex(index);
            }
        }
    };

    const scrollToIndex = (index) => {
        if (carouselRef.current && window.innerWidth < 768) {
            const container = carouselRef.current;
            const cardWidth = container.scrollWidth / packages.length;
            container.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
            setActiveIndex(index);
        }
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Headers Animation
            gsap.fromTo(headerRef.current.children,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 90%",
                    }
                }
            );

            // Toggle Animation
            gsap.fromTo(toggleRef.current,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 90%",
                    }
                }
            );

            // Cards Animation
            gsap.fromTo(cardsRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="representation-packages" className="section-padding bg-luxury-black relative overflow-hidden select-none">

            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-luxury-black via-luxury-black to-pure-black/20 opacity-80 pointer-events-none" />

            <div className="container-luxury px-0 md:px-12 lg:px-8 xl:px-12 relative z-10">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-12 md:mb-16 px-6 md:px-0">
                    <span className="text-luxury-gold uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                        Strategic Plans
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-luxury-off-white">
                        Representation <span className="text-gradient-gold italic pr-2">Packages</span>
                    </h2>
                </div>

                {/* Billing Toggle */}
                <div ref={toggleRef} className="flex justify-center items-center gap-4 mb-16 md:mb-24">
                    <span className={`text-sm uppercase tracking-widest transition-colors duration-300 ${billingCycle === 'monthly' ? 'text-luxury-gold' : 'text-white/40'}`}>
                        Monthly
                    </span>
                    <button
                        onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                        className="relative w-16 h-8 bg-luxury-charcoal/20 backdrop-blur-md border border-luxury-gold/20 rounded-full p-1 transition-colors duration-300 group hover:bg-luxury-charcoal/30"
                        aria-label={`Switch to ${billingCycle === 'monthly' ? 'yearly' : 'monthly'} billing cycle`}
                    >
                        <div
                            className={`w-6 h-6 bg-luxury-gold rounded-full shadow-lg shadow-pure-black/40 transition-transform duration-500 ease-luxury ${billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-0'}`}
                        />
                    </button>
                    <div className="flex items-center gap-3">
                        <span className={`text-sm uppercase tracking-widest transition-colors duration-300 ${billingCycle === 'yearly' ? 'text-luxury-gold' : 'text-white/40'}`}>
                            Yearly
                        </span>
                        <span className="bg-luxury-gold/20 text-luxury-gold text-[10px] px-2 py-0.5 rounded-full border border-luxury-gold/30 tracking-wider">
                            SAVE 20%
                        </span>
                    </div>
                </div>

                {/* Grid / Carousel Container */}
                <div
                    ref={carouselRef}
                    onScroll={handleScroll}
                    className="flex md:grid md:grid-cols-1 lg:grid-cols-3 md:gap-8 lg:gap-6 xl:gap-10 items-stretch max-w-5xl lg:max-w-7xl mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide px-0"
                >
                    {packages.map((pkg, index) => {
                        const isActive = activeIndex === index;
                        const displayPrice = billingCycle === 'monthly' ? pkg.monthlyPrice : pkg.yearlyPrice;

                        return (
                            <div
                                key={pkg.name}
                                className="w-screen flex-shrink-0 snap-center px-6 md:w-auto md:px-0"
                            >
                                <div
                                    ref={el => cardsRef.current[index] = el}
                                    className={`
                                        relative flex flex-col h-full p-8 md:p-10 lg:p-6 xl:p-12 border transition-all duration-700 ease-luxury group shadow-2xl shadow-pure-black/15
                                        ${isActive ? 'opacity-100 scale-100' : 'md:opacity-100 md:scale-100 opacity-60 scale-[0.92]'}
                                        ${pkg.highlight
                                            ? 'border-luxury-gold/50 bg-luxury-charcoal border shadow-2xl shadow-luxury-gold/30'
                                            : 'border-luxury-gold/10 bg-luxury-charcoal/40 hover:border-luxury-gold/40 hover:bg-luxury-charcoal shadow-pure-black/10'
                                        }
                                    `}
                                >
                                    {/* Card Content */}
                                    <div className="mb-8 lg:mb-6">
                                        <h3 className={`text-lg tracking-widest font-sans mb-3 lg:mb-2 uppercase ${pkg.highlight ? 'text-luxury-gold' : 'text-luxury-off-white'}`}>
                                            {pkg.name}
                                        </h3>
                                        <p className="text-luxury-off-white/70 text-sm font-normal tracking-wide">{pkg.description}</p>
                                    </div>

                                    <div className="mb-10 lg:mb-8 min-h-[5rem] lg:min-h-0 pb-8 lg:pb-6 border-b border-white/10">
                                        <div className="text-[10px] xl:text-xs lg:tracking-wider xl:tracking-widest text-luxury-gold mb-2 uppercase font-bold">
                                            {pkg.pricePrefix}
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <div className="text-2xl md:text-3xl lg:text-2xl xl:text-4xl font-display text-luxury-beige">
                                                {displayPrice}
                                            </div>
                                            {displayPrice !== 'Custom Pricing' && (
                                                <div className="text-xs text-luxury-off-white/50 tracking-wide font-medium">
                                                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                                                </div>
                                            )}
                                        </div>
                                        {pkg.priceSuffix && (
                                            <div className="text-xs tracking-wide text-luxury-off-white/50 mt-1 font-medium">
                                                {pkg.priceSuffix}
                                            </div>
                                        )}
                                    </div>

                                    <ul className="space-y-4 md:space-y-5 lg:space-y-3 mb-12 lg:mb-8 flex-grow">
                                        {pkg.features.map((feature, idx) => (
                                            <li key={idx} className={`text-sm font-normal flex items-start leading-relaxed ${feature.included ? 'text-luxury-off-white/90' : 'text-luxury-off-white/30'}`}>
                                                <span className={`mr-4 mt-1 flex-shrink-0 ${feature.included ? 'text-luxury-gold' : 'text-luxury-off-white/30'}`}>
                                                    {feature.included ? <Check size={14} /> : <X size={14} />}
                                                </span>
                                                <span className="flex-1">{feature.name}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        className={`
                                        w-full py-4 xl:py-5 text-xs tracking-[0.2em] uppercase transition-all duration-500 border
                                        ${pkg.highlight
                                                ? 'bg-luxury-gold border-luxury-gold text-pure-black hover:bg-luxury-off-white hover:text-luxury-black hover:border-luxury-off-white'
                                                : 'border-luxury-gold/30 text-luxury-off-white hover:bg-luxury-gold hover:text-pure-black hover:border-luxury-gold'
                                            }
                                    `}
                                    >
                                        {pkg.cta}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile Indicators */}
                <div className="mt-12 px-6 flex flex-col items-center md:hidden">
                    <div className="flex gap-3">
                        {packages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => scrollToIndex(idx)}
                                className={`h-[2px] transition-all duration-500 ${activeIndex === idx ? 'w-10 bg-luxury-gold' : 'w-4 bg-white/10'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RepresentationPackages;
