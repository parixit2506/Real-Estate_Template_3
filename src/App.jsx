import { FilterProvider } from './context/FilterContext'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import AppRouter from './router'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <FilterProvider>
          <AppRouter />
        </FilterProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
