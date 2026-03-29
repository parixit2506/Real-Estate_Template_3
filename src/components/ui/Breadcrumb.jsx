import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const Breadcrumb = ({ items }) => {
    return (
        <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link
                to="/"
                className="flex items-center gap-1.5 text-pure-white/60 hover:text-luxury-gold transition-colors duration-300 group"
            >
                <Home size={14} className="group-hover:scale-110 transition-transform duration-300 mb-0.5" />
                <span className="text-xs uppercase tracking-wider">Home</span>
            </Link>

            {items.map((item, index) => {
                const isLast = index === items.length - 1

                return (
                    <div key={index} className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-pure-white/30" />

                        {isLast ? (
                            <span className="text-luxury-gold text-xs uppercase tracking-wider font-medium">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                to={item.path}
                                className="text-pure-white/60 hover:text-luxury-gold transition-colors duration-300 text-xs uppercase tracking-wider"
                            >
                                {item.label}
                            </Link>
                        )}
                    </div>
                )
            })}
        </nav>
    )
}

export default Breadcrumb
