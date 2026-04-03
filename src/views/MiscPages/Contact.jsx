import PageHero from '../../components/ui/PageHero'
import ContactSection from '../../components/sections/Contact'

const Contact = () => {
    return (
        <div className="min-h-screen bg-luxury-black">
            {/* Hero Section */}
            <PageHero
                title="Get in Touch"
                subtitle="Contact Us"
                description="Our team of luxury estate experts is here to assist you with any inquiries regarding our global portfolio."
                backgroundImage="/contact/contact-hero.png"
                breadcrumbItems={[{ label: 'Contact', path: '/contact' }]}
            />

            <ContactSection />
        </div>
    )
}

export default Contact
