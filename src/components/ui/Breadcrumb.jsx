import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const Breadcrumb = ({ items, variant = 'default' }) => {
    const isLight = variant === 'light'
    const baseTextColor = isLight ? 'text-pure-white/60' : 'text-luxury-off-white/60'
    const separatorColor = isLight ? 'text-pure-white/30' : 'text-luxury-off-white/30'
    const hoverColor = 'hover:text-luxury-gold'

    return (
        <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link
                to="/"
                className={`flex items-center gap-1.5 ${baseTextColor} ${hoverColor} transition-colors duration-300 group`}
            >
                <Home size={14} className="group-hover:scale-110 transition-transform duration-300 mb-0.5" />
                <span className="text-xs uppercase tracking-wider">Home</span>
            </Link>

            {items.map((item, index) => {
                const isLast = index === items.length - 1

                return (
                    <div key={index} className="flex items-center gap-2">
                        <ChevronRight size={14} className={separatorColor} />

                        {isLast ? (
                            <span className="text-luxury-gold text-xs uppercase tracking-wider font-medium">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                to={item.path}
                                className={`${baseTextColor} ${hoverColor} transition-colors duration-300 text-xs uppercase tracking-wider`}
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
