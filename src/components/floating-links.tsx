import { ClipboardClock, Smile, Zap, Disc3, Joystick } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import { useGame } from "../contexts/game-context";

export function FloatingLinks() {
  const { language, t } = useLanguage();
  const { gameMode, showAds } = useGame();

  const homeUrl =
    language === "en" ? "https://home.hoy.today/en" : "https://home.hoy.today";
  const emojisUrl =
    language === "en" ? "https://emojis.hoy.today/en" : "https://emojis.hoy.today";
  const playlistUrl =
    language === "en" ? "https://playlist.hoy.today/en" : "https://playlist.hoy.today";

  return (
    <>
      {/* Left Side Buttons */}
      <div className="fixed bottom-8 left-8 flex gap-3 z-30 transition-opacity duration-300">
        {/* Hoy.Today Button */}
        <a
          href={homeUrl}
          className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group cursor-pointer"
          aria-label={t("ariaHome")}
          title={t("ariaHome")}
        >
          <ClipboardClock className="w-6 h-6 text-zinc-900 dark:text-white group-hover:text-yellow-500 transition-colors" />
        </a>

        {/* Milemojis Button */}
        <a
          href={emojisUrl}
          className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group cursor-pointer"
          aria-label={t("ariaEmojis")}
          title={t("ariaEmojis")}
        >
          <Smile className="w-6 h-6 text-zinc-900 dark:text-white group-hover:text-yellow-500 transition-colors" />
        </a>

        {/* Playlist Button (icono CD en movimiento) */}
        <a
          href={playlistUrl}
          className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group cursor-pointer"
          aria-label={t("ariaMusic")}
          title={t("ariaMusic")}
        >
          <Disc3 className="w-6 h-6 text-zinc-900 dark:text-white group-hover:text-yellow-500 transition-colors animate-spin-slow" />
        </a>

        {/* Moovimiento Button (Joystick) */}
        <span
          className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg transition-all group cursor-not-allowed opacity-50"
          aria-label={t("ariaMinigame")}
          title={t("ariaMinigame")}
        >
          <Joystick className="w-6 h-6 text-zinc-900 dark:text-white transition-colors" />
        </span>
      </div>

      {/* Right Side Button Moovimiento: siempre visible en mobile, solo en desktop si ads ocultos y no insane */}
        <div
          className={`fixed bottom-8 right-8 z-50 transition-opacity duration-300 ${
            gameMode === "insane" ? "lg:hidden" : (showAds ? "xl:hidden" : "")
          }`}
        >
          <a
            href={
              language === "en"
                ? "https://moovimiento.com/en"
                : "https://moovimiento.com"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group cursor-pointer flex items-center justify-center"
            aria-label={t("ariaMoovimiento")}
            title={t("ariaMoovimiento")}
          >
            <Zap className="w-6 h-6 text-zinc-900 dark:text-white group-hover:text-yellow-500 transition-colors fill-none" />
          </a>
        </div>
    </>
  );
}
