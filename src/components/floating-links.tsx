import { ClipboardClock, Smile, Music, Joystick, Zap } from 'lucide-react'
import { useLanguage } from '../contexts/language-context'

export function FloatingLinks() {
    const { language, t } = useLanguage()

    // Logic for URLs
    const getUrl = (baseUrl: string) => language === 'en'
        ? (baseUrl.endsWith('/') ? `${baseUrl}en` : `${baseUrl}/en`)
        : baseUrl

    const homeUrl = getUrl("https://today.gonzalogramagia.com")
    const emojisUrl = getUrl("https://emojis.gonzalogramagia.com")
    const musicUrl = getUrl("https://music.gonzalogramagia.com")
    const moovimientoUrl = getUrl("https://moovimiento.com")

    return (
        <>
            {/* Left Side Buttons */}
            <div className="fixed bottom-8 left-8 flex gap-3 z-30 transition-opacity duration-300">
                {/* Home Button */}
                <a
                    href={homeUrl}
                    className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group cursor-pointer"
                    aria-label={t('ariaHome')}
                    title={t('ariaHome')}
                >
                    <ClipboardClock className="w-6 h-6 text-zinc-900 dark:text-white group-hover:text-yellow-500 transition-colors" />
                </a>

                {/* Emojis Button */}
                <a
                    href={emojisUrl}
                    className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group cursor-pointer"
                    aria-label={t('ariaEmojis')}
                    title={t('ariaEmojis')}
                >
                    <Smile className="w-6 h-6 text-zinc-900 dark:text-white group-hover:text-yellow-500 transition-colors" />
                </a>

                {/* Music Button */}
                <a
                    href={musicUrl}
                    className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group cursor-pointer"
                    aria-label={t('ariaMusic')}
                    title={t('ariaMusic')}
                >
                    <Music className="w-6 h-6 text-zinc-900 dark:text-white group-hover:text-yellow-500 transition-colors" />
                </a>

                {/* Game Button (Active) */}
                <button
                    disabled
                    className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg transition-all opacity-50 cursor-not-allowed group"
                    aria-label={t('ariaPlay')}
                    title={t('ariaPlay')}
                >
                    <Joystick className="w-6 h-6 text-zinc-900 dark:text-white transition-colors" />
                </button>
            </div>

            {/* Right Side Button */}
            <div className="fixed bottom-8 right-8 z-30 transition-opacity duration-300">
                <a
                    href={moovimientoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group cursor-pointer flex items-center justify-center"
                    aria-label="Moovimiento"
                    title="Moovimiento"
                >
                    <Zap className="w-6 h-6 text-zinc-900 dark:text-white group-hover:text-yellow-500 transition-colors fill-none" />
                </a>
            </div>
        </>
    )
}
