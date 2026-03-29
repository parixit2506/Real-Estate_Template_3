import Hero from '../../components/sections/Hero'
import About from '../../components/sections/About'
import FeaturedProperties from '../../components/sections/FeaturedProperties'
import Destinations from '../../components/sections/Destinations'
import Testimonials from '../../components/sections/Testimonials'
import BlogSection from '../../components/blog/BlogSection'
import RepresentationPackages from '../../components/sections/RepresentationPackages'
import Contact from '../../components/sections/Contact'

const Home = () => {
    return (
        <>
            <Hero />
            <FeaturedProperties />
            <About />
            <Destinations />
            <RepresentationPackages />
            <Testimonials />
            <BlogSection />
            <Contact />
        </>
    )
}

export default Home
