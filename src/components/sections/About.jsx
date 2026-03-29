import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse',
      },
    })

    // Text Reveal
    tl.fromTo(
      textRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      }
    )

    // Image Parallax
    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [])

  return (
    <section
      ref={containerRef}
      id="about"
      className="section-padding bg-luxury-black overflow-hidden"
    >
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 xl:gap-16 items-center">
          {/* Left: Image with Parallax */}
          <div className="relative h-[400px] sm:h-[550px] lg:h-[500px] xl:h-[600px] overflow-hidden rounded-sm order-2 lg:order-1 will-change-transform">
            <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform">
              <img
                src="/assets/property4.jpg" // Reusing mountain estate for dramatic effect
                alt="Our Heritage"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-luxury duration-800 will-change-[filter]"
              />
            </div>
            {/* Decorative border */}
            <div className="absolute inset-4 border border-luxury-gold/20 pointer-events-none"></div>
          </div>

          {/* Right: Text Content */}
          <div ref={textRef} className="space-y-8 lg:space-y-7 xl:space-y-10 order-1 lg:order-2 will-change-transform">
            <div className="space-y-4">
              <span className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] sm:text-xs font-medium mb-2 block">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-display text-luxury-off-white leading-tight text-balance will-change-[transform,opacity]">
                Crafting Excellence <span className="text-gradient-gold italic pr-2">In Real Estate</span>
              </h2>
              <p className="text-luxury-beige-light leading-relaxed max-w-xl text-sm sm:text-base will-change-[transform,opacity]">
                Founded on the principles of integrity and sophistication, we curate
                extraordinary spaces for those who demand the finest in life.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-luxury-gold tracking-widest uppercase text-xs font-semibold will-change-[transform,opacity]">
                Our Mission
              </h4>
              <p className="text-lg sm:text-xl font-display italic text-luxury-off-white leading-relaxed max-w-xl will-change-[transform,opacity]">
                "To redefine luxury living through architectural excellence and
                unparalleled service."
              </p>
            </div>

            <Link
              to="/about"
              className="inline-block text-luxury-off-white border-b border-luxury-gold pb-1 hover:text-luxury-gold transition-luxury will-change-[transform,opacity,color]"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
