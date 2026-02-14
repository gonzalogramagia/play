import { createContext, useContext, ReactNode, useState } from 'react'

export type GameMode = 'classic' | 'insane'

interface GameContextType {
    gameMode: GameMode
    setGameMode: (mode: GameMode) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
    const [gameMode, setGameMode] = useState<GameMode>('classic')

    return (
        <GameContext.Provider value={{ gameMode, setGameMode }}>
            {children}
        </GameContext.Provider>
    )
}

export function useGame() {
    const context = useContext(GameContext)
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider')
    }
    return context
}
