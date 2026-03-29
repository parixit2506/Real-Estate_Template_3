import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { blogs as blogsData } from '../../StaticData/blogs';

gsap.registerPlugin(ScrollTrigger);

const BlogSection = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);
    const bgCirclesRef = useRef([]);

    // Get the 3 most recent blog posts
    const recentBlogs = blogsData.slice(0, 3);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background Parallax
            bgCirclesRef.current.forEach((circle, i) => {
                if (!circle) return;
                gsap.to(circle, {
                    y: i === 0 ? 80 : -80,
                    x: i === 0 ? 40 : -40,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    }
                });
            });

            // Title Animation
            const titleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 85%',
                }
            });

            titleTl.from(titleRef.current.querySelector('span'), {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            })
                .from(titleRef.current.querySelector('h2'), {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.4');

            // Cards Animation
            cardsRef.current.forEach((card) => {
                if (!card) return;

                const cardTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    }
                });

                cardTl.from(card, {
                    y: 60,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power4.out',
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <section id="blog" ref={containerRef} className="section-padding bg-luxury-black relative overflow-hidden">
            {/* Decorative background elements */}
            <div
                ref={el => bgCirclesRef.current[0] = el}
                className="absolute top-0 left-0 w-1/3 h-1/3 bg-luxury-gold/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none"
            />
            <div
                ref={el => bgCirclesRef.current[1] = el}
                className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-luxury-gold/5 blur-[100px] rounded-full translate-y-1/2 translate-x-1/2 pointer-events-none"
            />

            <div className="container-luxury relative z-10">
                <div ref={titleRef} className="text-center mb-16 md:mb-24">
                    <span className="text-luxury-gold uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                        Insights & Stories
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-luxury-off-white">
                        From The <span className="text-gradient-gold italic pr-2">Journal</span>
                    </h2>
                </div>

                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-12 md:mb-16">
                    {recentBlogs.map((blog, index) => (
                        <div
                            key={blog.id}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="group cursor-pointer will-change-transform"
                            onClick={() => navigate(`/blog/${blog.slug}`)}
                        >
                            {/* Image Container */}
                            <div className="relative h-56 sm:h-64 md:h-56 lg:h-64 xl:h-72 rounded-sm overflow-hidden mb-5 md:mb-6">
                                <img
                                    src={blog.featuredImage}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-pure-black/20 group-hover:bg-pure-black/40 transition-colors duration-300" />

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-luxury-gold/90 backdrop-blur-sm text-luxury-black text-[10px] md:text-xs font-bold tracking-wider uppercase">
                                        {blog.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-3 md:space-y-4">
                                {/* Meta Info */}
                                <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-luxury-beige font-medium">
                                    <span>{formatDate(blog.publishedDate)}</span>
                                    <span>•</span>
                                    <span>{blog.readTime}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-2xl font-display text-luxury-off-white group-hover:text-luxury-gold transition-colors duration-300 leading-tight line-clamp-2">
                                    {blog.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-sm md:text-base text-luxury-beige-light leading-relaxed line-clamp-2 md:line-clamp-3">
                                    {blog.excerpt}
                                </p>

                                {/* Author Info */}
                                <div className="flex items-center gap-3 pt-2 md:pt-3 border-t border-luxury-charcoal-light/50">
                                    <img
                                        src={blog.author.avatar}
                                        alt={blog.author.name}
                                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-luxury-gold/30"
                                    />
                                    <div className="text-xs md:text-sm">
                                        <p className="text-luxury-off-white font-medium">{blog.author.name}</p>
                                        <p className="text-luxury-beige/60 text-[10px] md:text-xs">{blog.author.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Link */}
                <div className="text-center">
                    <button
                        onClick={() => navigate('/blog')}
                        className="group inline-flex items-center gap-3 text-luxury-off-white hover:text-luxury-gold transition-luxury text-sm md:text-base"
                    >
                        <span className="border-b border-luxury-gold pb-1">View All Articles</span>
                        <svg
                            className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
