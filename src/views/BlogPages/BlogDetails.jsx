import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { blogs as blogsData } from '../../StaticData/blogs'
import Breadcrumb from '../../components/ui/Breadcrumb'

gsap.registerPlugin(ScrollTrigger)

const BlogDetails = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const contentRef = useRef(null)

    const blog = blogsData.find(b => b.slug === slug)

    useEffect(() => {
        if (!blog) {
            navigate('/blog')
            return
        }

        const ctx = gsap.context(() => {
            gsap.from('.blog-hero-image', {
                scale: 1.2,
                duration: 1.5,
                ease: 'power3.out',
            })

            gsap.from('.blog-header-content', {
                y: 100,
                opacity: 0,
                duration: 1.2,
                delay: 0.3,
                ease: 'power3.out',
            })

            gsap.from('.blog-content', {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.6,
                ease: 'power3.out',
            })

            gsap.from('.related-post', {
                y: 80,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.related-posts-section',
                    start: 'top 80%',
                },
            })
        }, contentRef)

        return () => ctx.revert()
    }, [blog, navigate])

    if (!blog) return null

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const relatedPosts = blogsData
        .filter(b => b.id !== blog.id && (b.category === blog.category || b.tags.some(tag => blog.tags.includes(tag))))
        .slice(0, 3)

    return (
        <>
            <div ref={contentRef} className="min-h-screen bg-luxury-black">
                {/* Hero Image */}
                <div className="relative h-[50vh] md:h-[70vh] 2xl:h-[80vh] overflow-hidden">
                    <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="blog-hero-image w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pure-black/90 via-pure-black/40 to-transparent" />
                </div>

                {/* Article Header */}
                <div className="blog-header-content max-w-4xl 2xl:max-w-5xl mx-auto px-6 md:px-12 lg:px-20 2xl:px-0 pt-12 md:pt-16 relative z-10 mb-12">
                    {/* Breadcrumb */}
                    <div className="mb-6 md:mb-8">
                        <Breadcrumb items={[
                            { label: 'Blog', path: '/blog' },
                            { label: blog.title, path: `/blog/${blog.slug}` }
                        ]} />
                    </div>

                    <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-luxury-gold text-pure-black text-[10px] md:text-xs font-bold tracking-wider uppercase mb-4 md:mb-6 shadow-lg">
                        {blog.category}
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl 2xl:text-7xl font-display font-light text-luxury-off-white mb-6 md:mb-8 leading-tight">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-luxury-off-white/60 pb-6 md:pb-8 border-b border-luxury-gold/20">
                        <div className="flex items-center gap-3 md:gap-4">
                            <img
                                src={blog.author.avatar}
                                alt={blog.author.name}
                                className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover border-2 border-luxury-gold/10"
                            />
                            <div>
                                <p className="text-luxury-off-white text-sm md:text-base 2xl:text-lg font-medium">{blog.author.name}</p>
                                <p className="text-[10px] md:text-sm 2xl:text-base text-luxury-off-white/40">{blog.author.role}</p>
                            </div>
                        </div>
                        <span className="hidden xs:inline text-luxury-gold/30">•</span>
                        <div className="flex items-center gap-4 text-xs md:text-sm 2xl:text-base">
                            <span>{formatDate(blog.publishedDate)}</span>
                            <span>•</span>
                            <span>{blog.readTime}</span>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <div className="blog-content max-w-4xl 2xl:max-w-5xl mx-auto px-6 md:px-12 lg:px-20 2xl:px-0 pb-16 md:pb-20">
                    <div className="prose prose-invert prose-lg 2xl:prose-xl max-w-none">
                        {blog.content.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="text-luxury-off-white/80 leading-relaxed mb-6 text-base md:text-lg 2xl:text-xl">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Tags */}
                    <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-luxury-gold/10">
                        <div className="flex flex-wrap gap-2 md:gap-3">
                            {blog.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 md:px-4 md:py-2 bg-luxury-charcoal/50 text-luxury-off-white text-xs md:text-sm 2xl:text-base rounded-sm border border-luxury-gold/10"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="related-posts-section bg-luxury-charcoal/90 backdrop-blur-md py-16 md:py-20 2xl:py-32 border-t border-luxury-gold/5">
                        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
                            <h2 className="text-2xl sm:text-3xl md:text-5xl 2xl:text-6xl font-display font-light text-luxury-off-white mb-10 md:mb-12 text-center">
                                Related Articles
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 2xl:gap-12">
                                {relatedPosts.map((relatedBlog) => (
                                    <div
                                        key={relatedBlog.id}
                                        className="related-post group cursor-pointer"
                                        onClick={() => {
                                            navigate(`/blog/${relatedBlog.slug}`)
                                            window.scrollTo(0, 0)
                                        }}
                                    >
                                        <div className="relative h-48 sm:h-56 md:h-64 2xl:h-80 rounded-sm overflow-hidden mb-4 md:mb-6">
                                            <img
                                                src={relatedBlog.featuredImage}
                                                alt={relatedBlog.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-pure-black/20 group-hover:bg-pure-black/40 transition-colors duration-300" />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs 2xl:text-sm text-luxury-gold font-medium tracking-wider uppercase whitespace-nowrap">
                                                <span>{relatedBlog.category}</span>
                                                <span>•</span>
                                                <span>{relatedBlog.readTime}</span>
                                            </div>

                                            <h3 className="text-lg md:text-xl 2xl:text-2xl font-display text-luxury-off-white group-hover:text-luxury-gold transition-colors duration-300 leading-tight">
                                                {relatedBlog.title}
                                            </h3>

                                            <p className="text-luxury-off-white/60 text-xs md:text-sm 2xl:text-base leading-relaxed line-clamp-2">
                                                {relatedBlog.excerpt}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default BlogDetails
