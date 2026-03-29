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
                backgroundImage="https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop"
                breadcrumbItems={[{ label: 'Contact', path: '/contact' }]}
            />

            <ContactSection />
        </div>
    )
}

export default Contact
