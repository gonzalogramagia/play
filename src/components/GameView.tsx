import { useLanguage } from "../contexts/language-context";
import { DinoGame } from "./dino-game";

export function GameView() {
    const { language } = useLanguage();

    return (
        <div className="space-y-4 md:space-y-8 relative">
            <div className="flex flex-col md:flex-row items-center justify-center pt-6 md:pt-12 pb-0 gap-4 md:gap-8 max-w-4xl mx-auto md:pl-8">
                <img
                    src="/gamer.png"
                    alt="Gamer"
                    onClick={() => window.open('https://fakeupdate.net/win10ue/', '_blank')}
                    className={`cursor-pointer h-48 md:h-56 w-auto object-contain hover:scale-105 transition-transform duration-500 drop-shadow-2xl mt-0 md:mt-0 md:mb-0`}
                />
                <div className="flex flex-col items-center md:items-start md:gap-0">
                    <h1 className="mx-auto md:mx-0 md:max-w-xl text-3xl md:text-5xl font-extrabold text-center md:text-left text-neutral-900 leading-tight tracking-tight">
                        {language === 'en' ? (
                            <>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600">
                                    If you grab the shovel{" "}
                                </span>
                                <span className="text-[#6866D6] block">
                                    you lose!
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600">
                                    Si agarrás la pala{" "}
                                </span>
                                <span className="text-[#6866D6] block">
                                    perdés!
                                </span>
                            </>
                        )}
                    </h1>
                </div>
            </div>

            <div className="pb-20">
                <DinoGame />
            </div>
        </div>
    );
}
