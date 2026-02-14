import { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

type Language = 'es' | 'en'

interface LanguageContextType {
    language: Language
    t: (key: string) => string
    setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const location = useLocation()
    const [language, setLanguage] = useState<Language>('es')

    useEffect(() => {
        if (location.pathname.startsWith('/en')) {
            setLanguage('en')
        } else if (location.pathname === '/import' || location.pathname === '/export') {
            setLanguage('en')
        } else if (location.pathname === '/importar' || location.pathname === '/exportar') {
            setLanguage('es')
        } else {
            setLanguage('es')
        }
    }, [location])

    const translations: Record<Language, Record<string, string>> = {
        es: {
            ariaHome: "Ir a Today",
            ariaEmojis: "Ir a Emojis",
            ariaMusic: "Ir a Música",
            ariaPlay: "¡Hora de jugar!",
            gameScore: "Puntaje",
            gameHighScore: "Puntaje máximo de la semana",
            gameHighScoreMobile: "Récord de la semana",
            gameHighScoreReset: "Se resetea los viernes a las 23:59",
            gameStart: "PRESIONA CUALQUIER TECLA PARA EMPEZAR",
            gameOver: "FIN DEL JUEGO",
            gameNewHighScore: "¡NUEVO PUNTAJE MÁXIMO!",
            gameRestart: "PRESIONA CUALQUIER TECLA PARA REINICIAR",
            gameJump: "para saltar",
            gameMove: 'para mover',
            gameStartMobile: "TOCA PARA EMPEZAR",
            gameRestartMobile: "TOCA PARA REINICIAR",
            gameJumpMobile: "Toca para saltar",
            gameKeySpace: 'Barra Espaciadora',
            gameModeClassic: "Clásico",
            gameModeInsane: 'Insano',
            gameShoot: 'Cargar y Tirar',
        },
        en: {
            ariaHome: "Go to Today",
            ariaEmojis: "Go to Emojis",
            ariaMusic: "Go to Music",
            ariaPlay: "Game time!",
            gameScore: "Score",
            gameHighScore: "Best score of the week",
            gameHighScoreMobile: "Record of the week",
            gameHighScoreReset: "Resets every Friday at 23:59",
            gameStart: "PRESS ANY KEY TO START",
            gameOver: "GAME OVER",
            gameNewHighScore: "NEW HIGH SCORE!",
            gameRestart: "PRESS ANY KEY TO RESTART",
            gameJump: "to jump",
            gameMove: 'to move',
            gameStartMobile: "TOUCH TO START",
            gameRestartMobile: "TOUCH TO RESTART",
            gameJumpMobile: "Touch to jump",
            gameKeySpace: 'Space',
            gameModeClassic: 'Classic',
            gameModeInsane: 'Insane',
            gameShoot: 'Charge & Shoot',
        }
    }

    const t = (key: string) => {
        return translations[language][key] || key
    }

    return (
        <LanguageContext.Provider value={{ language, t, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
