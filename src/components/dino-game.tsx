import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/language-context';

interface Obstacle {
    x: number;
    width: number;
    height: number;
}

export const DinoGame: React.FC = () => {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    // ... existing constants ...
    // Game constants
    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 200;
    const DINO_WIDTH = 40;
    const DINO_HEIGHT = 40;
    const GROUND_Y = 180;
    const JUMP_FORCE = 12;
    const GRAVITY = 0.6;
    const INITIAL_SPEED = 5;
    const SPEED_INCREMENT = 0.001;

    // Game state refs (for the loop)
    const dinoY = useRef(GROUND_Y - DINO_HEIGHT);
    const dinoVelocity = useRef(0);
    const isJumping = useRef(false);
    const obstacles = useRef<Obstacle[]>([]);
    const gameSpeed = useRef(INITIAL_SPEED);
    const frameCount = useRef(0);
    const animationFrameId = useRef<number | null>(null);
    const handImage = useRef<HTMLImageElement | null>(null);
    const shovelImage = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const hand = new Image();
        hand.src = '/mano.png';
        hand.onload = () => {
            handImage.current = hand;
        };

        const shovel = new Image();
        shovel.src = '/pala.png';
        shovel.onload = () => {
            shovelImage.current = shovel;
        };
    }, []);

    const startGame = () => {
        setGameOver(false);
        setGameStarted(true);
        setScore(0);
        dinoY.current = GROUND_Y - DINO_HEIGHT;
        dinoVelocity.current = 0;
        isJumping.current = false;
        obstacles.current = [];
        gameSpeed.current = INITIAL_SPEED;
        frameCount.current = 0;
    };

    const jump = () => {
        if (!isJumping.current && gameStarted && !gameOver) {
            dinoVelocity.current = -JUMP_FORCE;
            isJumping.current = true;
        } else if (!gameStarted || gameOver) {
            startGame();
        }
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || navigator.maxTouchPoints > 0);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
                e.preventDefault();
                jump();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameStarted, gameOver]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const update = () => {
            if (!gameStarted || gameOver) return;

            frameCount.current++;
            gameSpeed.current += SPEED_INCREMENT;

            // Update Dino
            dinoVelocity.current += GRAVITY;
            dinoY.current += dinoVelocity.current;

            if (dinoY.current > GROUND_Y - DINO_HEIGHT) {
                dinoY.current = GROUND_Y - DINO_HEIGHT;
                dinoVelocity.current = 0;
                isJumping.current = false;
            }

            // Update Obstacles
            if (frameCount.current % Math.floor(100 / (gameSpeed.current / 5)) === 0) {
                if (Math.random() > 0.5) {
                    // Generate diverse obstacle shapes (width and height)
                    const type = Math.random();
                    let w, h;
                    if (type < 0.25) { // Tall and thin
                        w = 15 + Math.random() * 10;
                        h = 40 + Math.random() * 20;
                    } else if (type < 0.5) { // Short and wide
                        w = 40 + Math.random() * 30;
                        h = 20 + Math.random() * 15;
                    } else if (type < 0.75) { // Big
                        w = 40 + Math.random() * 20;
                        h = 40 + Math.random() * 20;
                    } else { // Small
                        w = 20 + Math.random() * 10;
                        h = 20 + Math.random() * 10;
                    }

                    obstacles.current.push({
                        x: CANVAS_WIDTH,
                        width: w,
                        height: h,
                    });
                }
            }

            obstacles.current = obstacles.current.filter((obs) => {
                obs.x -= gameSpeed.current;

                // Collision detection
                const dinoBox = {
                    x: 50,
                    y: dinoY.current,
                    width: DINO_WIDTH - 10,
                    height: DINO_HEIGHT - 5,
                };

                const obsBox = {
                    x: obs.x,
                    y: GROUND_Y - obs.height,
                    width: obs.width,
                    height: obs.height,
                };

                if (
                    dinoBox.x < obsBox.x + obsBox.width &&
                    dinoBox.x + dinoBox.width > obsBox.x &&
                    dinoBox.y < obsBox.y + obsBox.height &&
                    dinoBox.y + dinoBox.height > obsBox.y
                ) {
                    setGameOver(true);
                    if (score > highScore) setHighScore(score);
                }

                return obs.x + obs.width > 0;
            });

            setScore(Math.floor(frameCount.current / 5));
        };

        const draw = () => {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            // Draw Ground
            ctx.beginPath();
            ctx.moveTo(0, GROUND_Y);
            ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
            ctx.strokeStyle = '#555';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw Hand (Player)
            const dX = 50;
            const dY = dinoY.current;

            if (handImage.current) {
                ctx.drawImage(handImage.current, dX, dY, DINO_WIDTH, DINO_HEIGHT);
            } else {
                ctx.save();
                ctx.translate(dX, dY);
                ctx.fillStyle = '#ffdbac';
                ctx.beginPath();
                ctx.roundRect(0, 0, DINO_WIDTH, DINO_HEIGHT, 5);
                ctx.fill();
                ctx.restore();
            }

            // Draw Obstacles (Cropped and Varied Shovels)
            obstacles.current.forEach((obs) => {
                if (shovelImage.current) {
                    const img = shovelImage.current;
                    // Crop logic: 1/3 left and 1/3 right removed. Middle 1/3 kept.
                    const sx = img.naturalWidth / 3;
                    const sw = img.naturalWidth / 3;
                    const sy = 0;
                    const sh = img.naturalHeight;

                    ctx.drawImage(
                        img,
                        sx, sy, sw, sh,     // Source (middle 1/3)
                        obs.x, GROUND_Y - obs.height, obs.width, obs.height // Target
                    );
                } else {
                    // Fallback
                    ctx.fillStyle = '#94a3b8';
                    ctx.fillRect(obs.x, GROUND_Y - obs.height, obs.width, obs.height);
                }
            });

            if (!gameStarted) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                ctx.fillStyle = 'white';
                ctx.font = '24px Inter, system-ui, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(isMobile ? t('gameStartMobile') : t('gameStart'), CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
            }

            if (gameOver) {
                ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
                ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                ctx.fillStyle = '#333';
                ctx.font = 'bold 30px Inter, system-ui, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(t('gameOver'), CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
                ctx.font = '20px Inter, system-ui, sans-serif';
                ctx.fillText(isMobile ? t('gameStartMobile') : t('gameRestart'), CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
            }
        };

        const loop = () => {
            update();
            draw();
            animationFrameId.current = requestAnimationFrame(loop);
        };

        animationFrameId.current = requestAnimationFrame(loop);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [gameStarted, gameOver, score, highScore, t, isMobile]);

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto bg-white/50 backdrop-blur-sm p-4 md:p-8 rounded-3xl border border-white/20 shadow-xl overflow-hidden px-3 md:px-8">
            <div className="w-full flex justify-between items-center mb-4 px-2">
                <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold">{t('gameScore')}</span>
                    <span className="text-2xl font-black text-neutral-800 tabular-nums">{score.toString().padStart(5, '0')}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold">{t('gameHighScore')}</span>
                    <span className="text-2xl font-black text-[#6866D6] tabular-nums">{highScore.toString().padStart(5, '0')}</span>
                </div>
            </div>

            <div className="relative w-full aspect-[4/1] bg-neutral-50 rounded-2xl border-2 border-dashed border-neutral-200 overflow-hidden cursor-pointer" onClick={jump}>
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="w-full h-full"
                />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-neutral-500 text-sm font-medium">
                <div
                    className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm border border-neutral-100 cursor-pointer active:scale-95 transition-transform select-none touch-none"
                    onClick={jump}
                >
                    {!isMobile && (
                        <kbd className="px-2 py-0.5 bg-neutral-100 rounded border border-neutral-300 text-neutral-800 text-xs">Space</kbd>
                    )}
                    <span>{isMobile ? t('gameJumpMobile') : t('gameJump')}</span>
                </div>
            </div>
        </div>
    );
};
