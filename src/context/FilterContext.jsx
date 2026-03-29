import { createContext, useContext, useState } from 'react'

const FilterContext = createContext()

export const FilterProvider = ({ children }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [filters, setFilters] = useState({
        region: 'All',
        type: 'All',
        status: 'All',
        amenities: [],
        priceRange: 'All',
        rating: 'Any',
        searchLocation: ''
    })

    const toggleFilter = () => setIsFilterOpen(!isFilterOpen)

    const applyFilters = (newFilters) => {
        setFilters(newFilters)
    }

    const clearFilters = () => {
        setFilters({
            region: 'All',
            type: 'All',
            status: 'All',
            amenities: [],
            priceRange: 'All',
            rating: 'Any',
            searchLocation: ''
        })
    }

    return (
        <FilterContext.Provider value={{
            isFilterOpen,
            toggleFilter,
            setIsFilterOpen,
            filters,
            applyFilters,
            clearFilters
        }}>
            {children}
        </FilterContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFilters = () => {
    const context = useContext(FilterContext)
    if (!context) {
        throw new Error('useFilters must be used within a FilterProvider')
    }
    return context
}
