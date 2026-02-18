import { useEffect, useState } from 'react';
import { useGame } from '../contexts/game-context';

const AD_IMAGES = [
    '/ad-moovimiento/1.png',
    '/ad-moovimiento/2.png',
    '/ad-moovimiento/3.png',
    '/ad-moovimiento/4.png',
    '/ad-moovimiento/5.png',
];

const getRandomImage = () => AD_IMAGES[Math.floor(Math.random() * AD_IMAGES.length)];

export function AdSidebars() {
    const { gameMode, showAds } = useGame();
    const [leftImage, setLeftImage] = useState(getRandomImage());
    const [rightImage, setRightImage] = useState(getRandomImage());

    useEffect(() => {
        const interval = setInterval(() => {
            setLeftImage(getRandomImage());
            setRightImage(getRandomImage());
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const AdUnit = ({ image, className }: { image: string; className: string }) => (
        <a
            href="https://moovimiento.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed top-1/2 -translate-y-1/2 hidden xl:block w-[150px] h-[700px] transition-opacity duration-500 hover:opacity-90 ${className}`}
        >
            <img
                src={image}
                alt="Advertisement"
                className="w-full h-full object-cover rounded-lg shadow-md"
            />
        </a>
    );

    if (!showAds || gameMode === 'insane') return null;

    return (
        <>
            {/* Left Ad - Positioned specifically to not overlap content */}
            <AdUnit image={leftImage} className="left-4 2xl:left-12" />

            {/* Right Ad */}
            <AdUnit image={rightImage} className="right-4 2xl:right-12" />
        </>
    );
}
