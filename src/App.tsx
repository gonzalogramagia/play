import Home from './pages/Home'
import Footer from './components/footer'
import { FloatingLinks } from './components/floating-links'

import { Routes, Route } from 'react-router-dom'

function AppContent() {
    return (
        <div className="max-w-4xl mx-4 mt-8 lg:mx-auto">
            <div
                className="fixed inset-0 z-[-1] bg-cover bg-center bg-fixed bg-no-repeat opacity-5"
                style={{ backgroundImage: "url('/wallpaper.png')" }}
            />
            <Routes>
                <Route path="/" element={
                    <>
                        <main className="flex-auto min-w-0 mt-6 flex flex-col px-8 lg:px-0">
                            <Home />
                            <Footer />
                            <FloatingLinks />
                        </main>
                    </>
                } />
                <Route path="/en" element={
                    <>
                        <main className="flex-auto min-w-0 mt-6 flex flex-col px-8 lg:px-0">
                            <Home />
                            <Footer />
                            <FloatingLinks />
                        </main>
                    </>
                } />
            </Routes>
        </div>
    );
}

import { LanguageProvider } from './contexts/language-context'

function App() {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    )
}

export default App
