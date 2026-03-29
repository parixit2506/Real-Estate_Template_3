import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const AuthLayout = ({
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
        </>
    )
}

export default AuthLayout
