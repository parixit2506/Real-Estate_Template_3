import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../../components/ui/PageHero'
import { blogs as blogsData } from '../../StaticData/blogs'

gsap.registerPlugin(ScrollTrigger)

const Blog = () => {
    const navigate = useNavigate()
    const heroRef = useRef(null)
    const [selectedCategory, setSelectedCategory] = useState('All')

    const categories = ['All', 'Market Insights', 'Investment', 'Architecture', 'Design']

    const filteredBlogs = selectedCategory === 'All'
        ? blogsData
        : blogsData.filter(blog => blog.category === selectedCategory)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation handled by PageHero component

            // Animate Blog Cards on category change
            gsap.fromTo('.blog-card',
                {
                    y: 30,
                    opacity: 0,
                    scale: 0.98
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    clearProps: 'all'
                }
            )

            // Refresh ScrollTrigger to account for content height changes
            ScrollTrigger.refresh()
        }, heroRef)

        return () => ctx.revert()
    }, [filteredBlogs])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <>
            <div ref={heroRef} className="min-h-screen bg-luxury-black">
                {/* Hero Section */}
                <PageHero
                    title="The Journal"
                    subtitle="Insights & Stories"
                    description="Curated perspectives on luxury real estate, market trends, and the art of exceptional living."
                    backgroundImage="/blogs/blog-hero.png"
                    breadcrumbItems={[{ label: 'Blog', path: '/blog' }]}
                />

                {/* Category Filter */}
                <div className="category-filter max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 md:pt-24 mb-12 md:mb-16">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 md:px-6 py-2 md:py-3 rounded-sm text-[10px] md:text-sm font-medium tracking-wide transition-all duration-300 border ${selectedCategory === category
                                    ? 'bg-luxury-gold text-pure-black border-luxury-gold'
                                    : 'bg-luxury-charcoal/50 text-luxury-off-white border-luxury-gold/10 hover:border-luxury-gold/50'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Post (First Post) */}
                {filteredBlogs.length > 0 && (
                    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-16 md:mb-20">
                        <div
                            className="blog-card group relative h-[400px] md:h-[600px] rounded-sm overflow-hidden cursor-pointer"
                            onClick={() => navigate(`/blog/${filteredBlogs[0].slug}`)}
                        >
                            <img
                                src={filteredBlogs[0].featuredImage}
                                alt={filteredBlogs[0].title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-pure-black/90 via-pure-black/40 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                                <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-luxury-gold text-pure-black text-[10px] md:text-xs font-bold tracking-wider uppercase mb-3 md:mb-4">
                                    Featured
                                </span>
                                <h2 className="text-2xl sm:text-3xl md:text-5xl font-display text-pure-white mb-3 md:mb-4 leading-tight group-hover:text-luxury-gold transition-colors duration-300 drop-shadow-lg">
                                    {filteredBlogs[0].title}
                                </h2>
                                <p className="text-pure-white/90 text-sm md:text-lg mb-4 md:mb-6 max-w-3xl line-clamp-2 md:line-clamp-none drop-shadow-md">
                                    {filteredBlogs[0].excerpt}
                                </p>
                                <div className="flex flex-wrap items-center gap-3 md:gap-6 text-[10px] md:text-sm text-pure-white/80">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <img
                                            src={filteredBlogs[0].author.avatar}
                                            alt={filteredBlogs[0].author.name}
                                            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-pure-white/20"
                                        />
                                        <span className="drop-shadow-md">{filteredBlogs[0].author.name}</span>
                                    </div>
                                    <span className="hidden xs:inline opacity-50">•</span>
                                    <span className="drop-shadow-md">{formatDate(filteredBlogs[0].publishedDate)}</span>
                                    <span className="hidden xs:inline opacity-50">•</span>
                                    <span className="drop-shadow-md">{filteredBlogs[0].readTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Blog Grid */}
                <div className="blog-grid max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-24 md:pb-32">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredBlogs.slice(1).map((blog) => (
                            <div
                                key={blog.id}
                                className="blog-card group cursor-pointer"
                                onClick={() => navigate(`/blog/${blog.slug}`)}
                            >
                                <div className="relative h-48 sm:h-56 md:h-64 rounded-sm overflow-hidden mb-4 md:mb-6">
                                    <img
                                        src={blog.featuredImage}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-pure-black/20 group-hover:bg-pure-black/40 transition-colors duration-300" />
                                </div>

                                <div className="space-y-3 md:space-y-4">
                                    <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-luxury-gold font-medium tracking-wider uppercase">
                                        <span>{blog.category}</span>
                                        <span>•</span>
                                        <span>{blog.readTime}</span>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-display text-luxury-off-white group-hover:text-luxury-gold transition-colors duration-300 leading-tight">
                                        {blog.title}
                                    </h3>

                                    <p className="text-sm md:text-base text-luxury-off-white/70 leading-relaxed line-clamp-2 md:line-clamp-3">
                                        {blog.excerpt}
                                    </p>

                                    <div className="flex items-center gap-3 pt-2 md:pt-4">
                                        <img
                                            src={blog.author.avatar}
                                            alt={blog.author.name}
                                            className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover border border-luxury-gold/10"
                                        />
                                        <div className="text-[10px] md:text-sm">
                                            <p className="text-luxury-off-white font-medium">{blog.author.name}</p>
                                            <p className="text-luxury-off-white/40">{formatDate(blog.publishedDate)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* No Results */}
                {filteredBlogs.length === 0 && (
                    <div className="max-w-7xl mx-auto px-4 text-center py-20">
                        <p className="text-luxury-beige-light text-xl">
                            No articles found in this category.
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default Blog
