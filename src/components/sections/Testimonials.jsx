import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        id: 1,
        content: "The attention to detail and curated selection of properties exceeded our expectations. Finding our dream villa was an effortless journey thanks to their expertise.",
        author: "Eleanor Vanderbilt",
        role: "Estate Investor",
        location: "Monaco",
        image: "/assets/eleanor_vanderbilt.png",
        rating: 5
    },
    {
        id: 2,
        content: "A truly bespoke experience. They didn't just find us a house; they found us a lifestyle. Their discreet service and market knowledge are unparalleled.",
        author: "Maximilian Roth",
        role: "Tech Entrepreneur",
        location: "St. Moritz",
        image: "/assets/maximilian_roth.png",
        rating: 5
    },
    {
        id: 3,
        content: "From the initial consultation to the final handover, the process was seamless. The level of professionalism and dedication to quality is evident in everything they do.",
        author: "Sophia de Luca",
        role: "Interior Designer",
        location: "Lake Como",
        image: "/assets/sophia_deluca.png",
        rating: 5
    },
    {
        id: 4,
        content: "Their understanding of the luxury market is exceptional. They presented properties that perfectly aligned with our vision, and their negotiation skills ensured we secured the best terms.",
        author: "Alexander Al-Mansouri",
        role: "Private Equity Partner",
        location: "Dubai",
        image: "/assets/alexander_almansouri.png",
        rating: 5
    },
    {
        id: 5,
        content: "What sets them apart is their genuine commitment to understanding our needs. They took the time to learn about our family's lifestyle before presenting any options. The result was perfection.",
        author: "Victoria Chen",
        role: "Art Collector",
        location: "Aspen",
        image: "/assets/victoria_chen.png",
        rating: 5
    },
    {
        id: 6,
        content: "Impeccable service from start to finish. Their network and insider knowledge of exclusive properties gave us access to opportunities we wouldn't have found elsewhere. Truly world-class.",
        author: "Laurent Beaumont",
        role: "Luxury Brand CEO",
        location: "Côte d'Azur",
        image: "/assets/laurent_beaumont.png",
        rating: 5
    }
];

const LuxuryCard = ({ children, className = "" }) => {
    return (
        <div className={`relative overflow-hidden group rounded-sm ${className}`}>
            {/* Ambient Glow */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-100 bg-[radial-gradient(circle_at_50%_50%,var(--color-luxury-gold)_0%,transparent_80%)] opacity-[0.08]"
            />
            {children}
        </div>
    );
};

const Testimonials = () => {
    const { isRTL } = useLanguage();
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);
    const bgCirclesRef = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef(null);
    const marqueeAnimationRef = useRef(null);

    // Continuous marquee scroll for desktop (only when more than 3 cards)
    useEffect(() => {
        const isDesktop = window.innerWidth >= 1024;
        const shouldMarquee = testimonials.length > 3;

        if (isDesktop && shouldMarquee && scrollContainerRef.current) {
            const scrollContainer = scrollContainerRef.current;
            const scrollWidth = scrollContainer.scrollWidth;
            const totalScrollDistance = scrollWidth / 2;

            marqueeAnimationRef.current = gsap.to(scrollContainer, {
                scrollLeft: totalScrollDistance,
                duration: 30,
                ease: 'none',
                repeat: -1,
                onRepeat: () => {
                    scrollContainer.scrollLeft = 0;
                }
            });

            const handleMouseEnter = () => marqueeAnimationRef.current?.pause();
            const handleMouseLeave = () => marqueeAnimationRef.current?.resume();

            scrollContainer.addEventListener('mouseenter', handleMouseEnter);
            scrollContainer.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                marqueeAnimationRef.current?.kill();
                scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
                scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
            };
        } else if (!isDesktop && scrollContainerRef.current) {
            const interval = setInterval(() => {
                if (scrollContainerRef.current) {
                    const nextIndex = (activeIndex + 1) % testimonials.length;
                    const cardWidth = scrollContainerRef.current.children[0]?.offsetWidth || 0;
                    const scrollPos = isRTL ? -(nextIndex * cardWidth) : nextIndex * cardWidth;

                    scrollContainerRef.current.scrollTo({
                        left: scrollPos,
                        behavior: 'smooth'
                    });
                }
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [activeIndex, isRTL]);

    const handleScroll = () => {
        if (scrollContainerRef.current && window.innerWidth < 1024) {
            const scrollLeft = Math.abs(scrollContainerRef.current.scrollLeft);
            const cardWidth = scrollContainerRef.current.children[0]?.offsetWidth || 1;
            const newIndex = Math.round(scrollLeft / cardWidth);
            if (newIndex !== activeIndex && newIndex >= 0 && newIndex < testimonials.length) {
                setActiveIndex(newIndex);
            }
        }
    };

    const scrollToSlide = (index) => {
        if (scrollContainerRef.current) {
            const cardWidth = scrollContainerRef.current.children[0]?.offsetWidth || 0;
            const scrollPos = isRTL ? -(index * cardWidth) : index * cardWidth;

            scrollContainerRef.current.scrollTo({
                left: scrollPos,
                behavior: 'smooth'
            });
            setActiveIndex(index);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            bgCirclesRef.current.forEach((circle, i) => {
                if (!circle) return;
                gsap.to(circle, {
                    y: i === 0 ? 100 : -100,
                    x: i === 0 ? 50 : -50,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    }
                });
            });

            const titleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 85%',
                }
            });

            titleTl.from(titleRef.current.querySelector('span'), {
                y: 20, opacity: 0, duration: 0.8, ease: 'power3.out'
            }).from(titleRef.current.querySelector('h2'), {
                y: 30, opacity: 0, duration: 1, ease: 'power3.out'
            }, '-=0.4');

            cardsRef.current.forEach((card) => {
                if (!card) return;
                gsap.from(card, {
                    y: 60,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="testimonials" ref={containerRef} className="section-padding bg-luxury-black relative overflow-hidden">
            <div
                ref={el => bgCirclesRef.current[0] = el}
                className="absolute top-0 right-0 w-1/3 h-1/3 bg-luxury-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"
            />
            <div
                ref={el => bgCirclesRef.current[1] = el}
                className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-luxury-gold/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"
            />

            <div className="container-luxury relative z-10">
                <div ref={titleRef} className="text-center mb-16 md:mb-24">
                    <span className="text-luxury-gold uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                        Client Stories
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-luxury-off-white">
                        The Voices of <span className="text-gradient-gold italic pr-2">Distinction</span>
                    </h2>
                </div>

                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className={`flex gap-6 lg:gap-6 xl:gap-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-10 -mx-6 px-6 lg:mx-0 lg:px-0 ${testimonials.length > 3 ? 'lg:snap-none' : 'lg:overflow-x-visible lg:grid lg:grid-cols-3'}`}
                >
                    {(testimonials.length > 3 ? [...testimonials, ...testimonials] : testimonials).map((testimonial, index) => (
                        <div
                            key={`${testimonial.id}-${index}`}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className={`group will-change-transform w-[85vw] md:w-[90vw] snap-center first:pl-0 flex-shrink-0 ${testimonials.length > 3 ? 'lg:w-[calc((100%-48px)/3)] xl:w-[calc((100%-96px)/3)]' : 'lg:w-auto'}`}
                        >
                            <LuxuryCard className="h-full">
                                <div className="h-full p-6 md:p-8 lg:p-8 xl:p-10 bg-luxury-charcoal/80 border border-luxury-gold/10 hover:border-luxury-gold/40 transition-luxury relative rounded-sm backdrop-blur-2xl shadow-2xl shadow-pure-black/20 flex flex-col group-hover:bg-luxury-charcoal group-hover:shadow-2xl group-hover:shadow-pure-black/40 hover:scale-[1.02] transform duration-500">
                                    <div className="quote-icon text-luxury-gold/5 text-7xl md:text-8xl lg:text-8xl xl:text-9xl font-display absolute top-4 right-6 pointer-events-none select-none z-0">
                                        "
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border border-luxury-gold/20 ring-1 ring-luxury-gold/30 ring-offset-2 ring-offset-luxury-black profile-image shrink-0 shadow-lg shadow-pure-black/10">
                                                <img
                                                    src={testimonial.image}
                                                    alt={testimonial.author}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-luxury duration-700"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="star-rating flex gap-1 mb-1">
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <svg key={i} className="w-3 h-3 text-luxury-gold fill-luxury-gold" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="text-luxury-off-white font-display text-lg tracking-wide">{testimonial.author}</span>
                                            </div>
                                        </div>

                                        <p className="testimonial-text text-luxury-beige-light/95 text-lg md:text-xl lg:text-xl leading-relaxed mb-8 md:mb-10 font-display italic font-light relative tracking-tight">
                                            "{testimonial.content}"
                                        </p>

                                        <div className="mt-auto">
                                            <div className={`testimonial-divider w-full h-px bg-gradient-to-r from-transparent via-luxury-gold/10 to-transparent mb-8 ${isRTL ? 'origin-right' : 'origin-left'}`} />
                                            <div className="testimonial-footer flex justify-between items-end">
                                                <div className="flex flex-col">
                                                    <span className="text-luxury-gold font-medium text-xs uppercase tracking-[0.3em] mb-1">{testimonial.role}</span>
                                                    <span className="text-luxury-beige/40 uppercase tracking-[0.2em] text-[10px] font-semibold">
                                                        {testimonial.location}
                                                    </span>
                                                </div>
                                                <div className="w-8 h-px bg-luxury-gold/30 hidden md:block mb-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </LuxuryCard>
                        </div>
                    ))}
                </div>

                {/* Mobile & Tablet Scroll Indicators */}
                <div className="flex justify-center gap-3 mt-6 lg:hidden">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToSlide(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'w-8 bg-luxury-gold' : 'w-2 bg-luxury-charcoal-light hover:bg-luxury-gold/50'}`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
