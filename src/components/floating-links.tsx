import { ClipboardClock, Smile, Zap, Disc3, Joystick } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import { useGame } from "../contexts/game-context";

export function FloatingLinks() {
  const { language, t } = useLanguage();
  const { gameMode } = useGame();

  const homeUrl =
    language === "en" ? "https://hoy.today/en" : "https://hoy.today";
  const emojisUrl =
    language === "en" ? "https://milemojis.com/en" : "https://milemojis.com";
  const bienEstateUrl =
    language === "en" ? "https://bien.estate/en" : "https://bien.estate";

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

        {/* Bien.Estate Button (icono CD en movimiento) */}
        <a
          href={bienEstateUrl}
          className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group cursor-pointer"
          aria-label={t("ariaMusic")}
          title={t("ariaMusic")}
        >
          <Disc3 className="w-6 h-6 text-zinc-900 dark:text-white group-hover:text-yellow-500 transition-colors animate-spin-slow" />
        </a>

        {/* Moovimiento Button (Joystick) */}
        <span
          className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg transition-all group cursor-not-allowed opacity-50"
          aria-label={t("ariaPlay")}
          title={t("ariaPlay")}
        >
          <Joystick className="w-6 h-6 text-zinc-900 dark:text-white transition-colors" />
        </span>
      </div>

      {/* Right Side Button Moovimiento solo en modo insano */}
      {gameMode === "insane" && (
        <div className="fixed bottom-8 right-8 z-30 transition-opacity duration-300 lg:hidden">
          <a
            href={
              language === "en"
                ? "https://moovimiento.com/en"
                : "https://moovimiento.com"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group cursor-pointer flex items-center justify-center"
            aria-label={t("ariaPlay")}
            title={t("ariaPlay")}
          >
            <Zap className="w-6 h-6 text-zinc-900 dark:text-white group-hover:text-yellow-500 transition-colors fill-none" />
          </a>
        </div>
      )}
    </>
  );
}
