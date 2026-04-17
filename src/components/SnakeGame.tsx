import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const MOVE_SPEED = 100; // Faster for machine-like feel

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const onSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood({ x: 5, y: 5 });
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y,
        };

        if (
          newHead.x < 0 || newHead.x >= GRID_SIZE ||
          newHead.y < 0 || newHead.y >= GRID_SIZE ||
          prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
        ) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 1);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, MOVE_SPEED);
    return () => clearInterval(gameInterval);
  }, [gameStarted, gameOver, direction, food, generateFood]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cellSize = canvas.width / GRID_SIZE;

    // Draw snake (harsh blocks)
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#00FFFF' : '#FF00FF';
      ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
      
      // Glitch effect on snake segments
      if (Math.random() > 0.95) {
        ctx.fillStyle = '#FFFF00';
        ctx.fillRect(segment.x * cellSize + (Math.random() - 0.5) * 5, segment.y * cellSize, cellSize, 2);
      }
    });

    // Draw food (flickering block)
    ctx.fillStyle = Math.random() > 0.1 ? '#FFFF00' : '#FF00FF';
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);

  }, [snake, food]);

  return (
    <div className="flex flex-col items-center gap-4 bg-black border-4 border-cyan-400 p-2 crt-flicker">
      <div className="w-full flex justify-between font-mono text-2xl px-2">
        <span className="glitch-text">DATA_SCORE: {score}</span>
        <span className="text-magenta-500">SYSTEM_READY</span>
      </div>

      <div className="relative border-2 border-magenta-500 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className={gameOver ? 'filter grayscale brightness-150' : ''}
        />
        
        {!gameStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-cyan-400">
            <h2 className="text-6xl font-mono glitch-text mb-8">BOOT_GAME</h2>
            <button
              onClick={resetGame}
              className="px-12 py-4 bg-[#FF00FF] text-black font-black text-2xl hover:bg-cyan-400 transition-all border-4 border-white"
            >
              EXECUTE();
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-magenta-500/80 text-black">
            <h2 className="text-7xl font-mono glitch-text mb-4">FATAL_ERROR</h2>
            <div className="text-4xl font-mono mb-8 underline">NULL_POINTER_REF</div>
            <button
              onClick={resetGame}
              className="px-10 py-5 bg-black text-cyan-400 font-mono text-3xl border-4 border-cyan-400 animate-pulse"
            >
              RE_INIT();
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
