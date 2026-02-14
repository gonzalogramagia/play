import Home from './pages/Home'
import Footer from './components/footer'
import { FloatingLinks } from './components/floating-links'

import { Routes, Route } from 'react-router-dom'

import { AdSidebars } from './components/ad-sidebars'

function AppContent() {
    return (
        <div className="max-w-4xl mx-4 mt-4 md:mt-6 lg:mx-auto">
            <AdSidebars />
            <div
                className="fixed inset-0 z-[-1] bg-cover bg-center bg-fixed bg-no-repeat opacity-5"
                style={{ backgroundImage: "url('/wallpaper.png')" }}
            />
            <Routes>
                <Route path="/" element={
                    <>
                        <main className="flex-auto min-w-0 mt-6 flex flex-col px-4 md:px-8 lg:px-0">
                            <Home />
                            <Footer />
                            <FloatingLinks />
                        </main>
                    </>
                } />
                <Route path="/en" element={
                    <>
                        <main className="flex-auto min-w-0 mt-6 flex flex-col px-4 md:px-8 lg:px-0">
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
import { GameProvider } from './contexts/game-context'

function App() {
    return (
        <LanguageProvider>
            <GameProvider>
                <AppContent />
            </GameProvider>
        </LanguageProvider>
    )
}

export default App
