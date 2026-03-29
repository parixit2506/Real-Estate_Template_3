import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const FrontendLayout = ({
    isSearchOpen,
    onSearchOpen,
    onSearchClose,
    searchQuery,
    setSearchQuery,
    hasEntered
}) => {
    return (
        <>
            <Navbar
                isSearchOpen={isSearchOpen}
                onSearchOpen={onSearchOpen}
                onSearchClose={onSearchClose}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                hasEntered={hasEntered}
            />
            <Outlet />
            <Footer />
        </>
    )
}

export default FrontendLayout
