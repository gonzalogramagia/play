import { useEffect, useState } from "react";
import { useGame } from "../contexts/game-context";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/language-context";
import { X } from "lucide-react";

const AD_IMAGES = [
  "/ad-moovimiento/1.png",
  "/ad-moovimiento/2.png",
  "/ad-moovimiento/3.png",
  "/ad-moovimiento/4.png",
  "/ad-moovimiento/5.png",
];

const getRandomImage = () =>
  AD_IMAGES[Math.floor(Math.random() * AD_IMAGES.length)];

export function AdSidebars() {
  const { gameMode, showAds, toggleAds } = useGame();
  const { language } = useLanguage();
  const location = useLocation();
  const bannerUrl = location.pathname.startsWith("/en") ? "https://moovimiento.com/en" : "https://moovimiento.com";
  const [leftImage, setLeftImage] = useState(getRandomImage());
  const [rightImage, setRightImage] = useState(getRandomImage());

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftImage(getRandomImage());
      setRightImage(getRandomImage());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const AdUnit = ({
    image,
    className,
    hoverColor = "hover:text-red-500",
  }: {
    image: string;
    className: string;
    hoverColor?: string;
  }) => (
    <div className={`fixed top-1/2 -translate-y-1/2 hidden xl:block w-[150px] h-[700px] transition-opacity duration-500 group ${className}`}>
      <button
        onClick={() => toggleAds()}
        className={`absolute -top-3 -right-3 bg-white text-gray-500 ${hoverColor} border border-gray-200 rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.15)] z-10 hover:bg-gray-50 hover:scale-105 focus:outline-none flex items-center gap-2 whitespace-nowrap cursor-pointer`}
        aria-label="Close Ads"
      >
        <span className="text-[10px] font-bold uppercase tracking-wider">
          {language === 'en' ? 'Close Ads' : 'Cerrar Ads'}
        </span>
        <X size={14} strokeWidth={3} />
      </button>
      <a
        href={bannerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full hover:opacity-90 transition-opacity"
      >
        <img
          src={image}
          alt="Advertisement"
          className="w-full h-full object-cover rounded-lg shadow-sm"
        />
      </a>
    </div>
  );

  if (!showAds || gameMode === "insane") return null;

  return (
    <>
      {/* Left Ad - Positioned specifically to not overlap content */}
      <AdUnit image={leftImage} className="left-4 2xl:left-12" />

      {/* Right Ad */}
      <AdUnit 
        image={rightImage} 
        className="right-4 2xl:right-12" 
        hoverColor="hover:text-green-500"
      />
    </>
  );
}
