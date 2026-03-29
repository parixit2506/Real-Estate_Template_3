import { useEffect, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, Minus } from 'lucide-react'
import PageHero from '../../components/ui/PageHero'

gsap.registerPlugin(ScrollTrigger)

const categories = ['All', 'General', 'Villa', 'Sell', 'Rent']

const faqs = [
  {
    question: "How do I schedule a viewing?",
    answer: "To schedule a private viewing, simply navigate to the property page of your interest and click on the 'Schedule Viewing' button. Alternatively, you can contact our dedicated agents directly through the 'Contact' page or by calling our premium support line.",
    category: "General"
  },
  {
    question: "What is the process for purchasing an international property?",
    answer: "Purchasing international property involves navigating specific legal and financial requirements unique to each country. Our global team of legal experts and real estate consultants will guide you through every step, ensuring a seamless transaction from initial inquiry to key handover.",
    category: "General"
  },
  {
    question: "Do you offer property management services?",
    answer: "Yes, Luxe Estate offers comprehensive property management services for our elite clientele. From routine maintenance and security to concierge services for your tenants, we ensure your investment is impeccably maintained and generates optimal returns.",
    category: "Villa"
  },
  {
    question: "Are there exclusive off-market listings available?",
    answer: "Absolutely. A significant portion of our portfolio consists of off-market listings available exclusively to our registered private clients. To access these hidden gems, please contact us to discuss your specific requirements and join our private client network.",
    category: "Villa"
  },
  {
    question: "What financing options are available for luxury estates?",
    answer: "We have established partnerships with leading private banks and financial institutions globally. We can facilitate introductions to wealth managers who specialize in high-value real estate financing, offering tailored solutions to meet your unique financial profile.",
    category: "Sell"
  },
  {
    question: "Can I list my property with Luxe Estate?",
    answer: "We welcome the opportunity to represent exceptional properties. Please visit our 'Sell with Us' section or contact our acquisitions team. We will conduct a thorough valuation and propose a bespoke marketing strategy to showcase your property to our global network of qualified buyers.",
    category: "Sell"
  },
  {
    question: "How long are the rental contracts usually?",
    answer: "Our standard luxury rental contracts typically range from 6 to 12 months, though we can accommodate seasonal or short-term stays for specific exclusive properties. Each agreement is tailored to the owner's preference and the tenant's needs.",
    category: "Rent"
  },
  {
    question: "What are the requirements for renting a premium villa?",
    answer: "Renting a premium villa requires proof of identity, financial statements, and a security deposit. We also conduct a brief consultation to ensure the property meets your lifestyle requirements and that all expectations are clearly aligned.",
    category: "Rent"
  }
]

const Faq = () => {
  const heroRef = useRef(null)
  const faqContainerRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredFaqs = useMemo(() => activeCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory), [activeCategory])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // FAQ Items Animation (matching Blog pattern)
      gsap.fromTo('.faq-item',
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

      // Refresh ScrollTrigger
      ScrollTrigger.refresh()
    }, heroRef)

    return () => ctx.revert()
  }, [filteredFaqs])

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setOpenIndex(0) // Reset to first item of new category
  }

  return (
    <>
      <div ref={heroRef} className="min-h-screen bg-luxury-black text-white">
        {/* Hero Section */}
        <PageHero
          title={<>Frequently Asked <br /> Questions</>}
          subtitle="Help Center"
          description="Everything you need to know about our premium real estate services."
          backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
          breadcrumbItems={[{ label: 'FAQs', path: '/faq' }]}
        />

        {/* Category Filter */}
        <div className="category-filter max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 md:pt-24 mb-12 md:mb-16 relative z-10">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-sm text-[10px] md:text-sm font-medium tracking-wide transition-all duration-300 border ${activeCategory === category
                  ? 'bg-luxury-gold text-pure-black border-luxury-gold'
                  : 'bg-luxury-charcoal/50 text-luxury-off-white border-luxury-gold/10 hover:border-luxury-gold/50'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="pb-20 md:pb-32 px-4 md:px-8 bg-luxury-black">
          <div className="max-w-4xl mx-auto">
            <div ref={faqContainerRef} className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <div
                    key={`${activeCategory}-${index}`}
                    className={`faq-item border border-luxury-gold/10 rounded-sm overflow-hidden transition-all duration-500 ${openIndex === index ? 'bg-luxury-charcoal/40 border-luxury-gold/30' : 'hover:border-luxury-gold/20'}`}
                  >
                    <button
                      className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className={`font-display text-lg md:text-xl lg:text-2xl transition-colors duration-300 ${openIndex === index ? 'text-luxury-gold' : 'text-luxury-off-white'}`}>
                        {faq.question}
                      </span>
                      <span className={`ml-4 flex-shrink-0 transition-transform duration-500 text-luxury-gold ${openIndex === index ? 'rotate-180' : ''}`}>
                        {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="p-6 md:p-8 pt-0 text-luxury-off-white/80 text-base md:text-lg leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-luxury-beige-light text-xl">No questions found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="py-20 bg-luxury-charcoal border-y border-luxury-gold/10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-light text-luxury-off-white mb-6 leading-tight">
              Still have questions?
            </h2>
            <p className="text-luxury-off-white/70 text-lg mb-10">
              Our team is available 24/7 to assist with your inquiries.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-luxury-gold text-pure-black font-semibold text-sm uppercase tracking-widest hover:bg-pure-white transition-all duration-300 shadow-xl shadow-pure-black/5"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Faq
