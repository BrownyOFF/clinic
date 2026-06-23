"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, RotateCcw, Timer, Trophy, Check, ArrowLeft, Gamepad2 } from "lucide-react";
import Link from "next/link";
import styles from "../../game/game.module.css";

// --- General Interfaces ---
interface ConfettiPiece {
  id: number;
  left: string;
  color: string;
  delay: string;
  size: string;
}

// --- Memory Match Interfaces ---
interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// --- Bubble Pop Interfaces ---
interface Bubble {
  id: number;
  x: number; // percentage (0-100)
  y: number; // percentage (100+)
  speed: number;
  size: number; // in pixels
  emoji: string;
  color: string;
}

interface PopParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  dx: string;
  dy: string;
  size: number;
}

const EMOJIS = ["🧸", "🐶", "🐱", "🦊", "🦄", "🐼"];
const BUBBLE_EMOJIS = ["🎈", "🦄", "🐼", "🦊", "🐰", "🐱", "🐶", "🦁", "🐸", "🐷", "🐥", "🐠"];
const BUBBLE_COLORS = ["#f472b6", "#60a5fa", "#34d399", "#fbbf24", "#c084fc", "#f87171", "#38bdf8", "#a78bfa"];

// --- Web Audio API sound synthesis ---
const playSound = (ctx: AudioContext | null, type: "flip" | "match" | "error" | "victory" | "pop" | "click" | "draw", isMuted: boolean) => {
  if (isMuted || !ctx) return;
  try {
    const now = ctx.currentTime;

    if (type === "flip" || type === "click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(type === "click" ? 450 : 350, now);
      osc.frequency.exponentialRampToValueAtTime(type === "click" ? 850 : 650, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.08);
    } else if (type === "pop") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1300, now + 0.06);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.06);
    } else if (type === "match") {
      const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.04, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.2);
      });
    } else if (type === "error") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.15);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.15);
    } else if (type === "draw") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(200, now + 0.3);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.3);
    } else if (type === "victory") {
      const melody = [
        { note: 523.25, time: 0 },
        { note: 659.25, time: 0.1 },
        { note: 783.99, time: 0.2 },
        { note: 1046.50, time: 0.3 }
      ];
      melody.forEach(({ note, time }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = note;
        gain.gain.setValueAtTime(0.07, now + time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + time);
        osc.stop(now + time + 0.35);
      });
    }
  } catch (e) {
    console.error("Audio Synthesis error:", e);
  }
};

export default function GameScreenEn() {
  const [activeGame, setActiveGame] = useState<"menu" | "memory" | "bubbles" | "tictactoe">("menu");
  const [isMuted, setIsMuted] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bubbleFieldRef = useRef<HTMLDivElement>(null);

  // --- Memory Match State ---
  const [memCards, setMemCards] = useState<MemoryCard[]>([]);
  const [memFlipped, setMemFlipped] = useState<number[]>([]);
  const [memMoves, setMemMoves] = useState(0);
  const [memSeconds, setMemSeconds] = useState(0);
  const [memTimerActive, setMemTimerActive] = useState(false);
  const [memOver, setMemOver] = useState(false);

  // --- Bubble Pop State ---
  const [bubbleList, setBubbleList] = useState<Bubble[]>([]);
  const [popScore, setPopScore] = useState(0);
  const [popParticles, setPopParticles] = useState<PopParticle[]>([]);

  // --- Tic-Tac-Toe State ---
  const [tttBoard, setTttBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [tttTurn, setTttTurn] = useState<"player" | "cpu">("player");
  const [tttWinner, setTttWinner] = useState<"player" | "cpu" | "draw" | null>(null);
  const [tttWinLine, setTttWinLine] = useState<number[]>([]);

  // Initialize audio
  const initAudio = useCallback(() => {
    if (isMuted) return null;
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, [isMuted]);

  useEffect(() => {
    const savedMute = localStorage.getItem("game-muted");
    if (savedMute !== null) {
      setIsMuted(savedMute === "true");
    }
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    localStorage.setItem("game-muted", String(nextMuted));
    if (nextMuted && audioCtxRef.current) {
      audioCtxRef.current.suspend();
    }
  };

  const triggerConfetti = () => {
    const colors = ["#f472b6", "#60a5fa", "#34d399", "#fbbf24", "#c084fc", "#f87171"];
    const pieces: ConfettiPiece[] = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: `${Math.random() * 2.5}s`,
      size: `${Math.random() * 8 + 8}px`,
    }));
    setConfetti(pieces);
  };

  // --- LOGIC: MEMORY MATCH ---
  const initMemoryGame = useCallback(() => {
    const doubleEmojis = [...EMOJIS, ...EMOJIS];
    const shuffled = doubleEmojis
      .map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));
    setMemCards(shuffled);
    setMemFlipped([]);
    setMemMoves(0);
    setMemSeconds(0);
    setMemTimerActive(false);
    setMemOver(false);
    setConfetti([]);
  }, []);

  useEffect(() => {
    let t: any = null;
    if (memTimerActive && activeGame === "memory") {
      t = setInterval(() => setMemSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(t);
  }, [memTimerActive, activeGame]);

  const handleMemCardClick = (idx: number) => {
    if (memOver || memCards[idx].isFlipped || memCards[idx].isMatched || memFlipped.length >= 2) return;

    const audioCtx = initAudio();
    if (!memTimerActive) setMemTimerActive(true);

    playSound(audioCtx, "flip", isMuted);
    const updated = [...memCards];
    updated[idx].isFlipped = true;
    setMemCards(updated);

    const nextFlipped = [...memFlipped, idx];
    setMemFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMemMoves((m) => m + 1);
      const [fIdx, sIdx] = nextFlipped;

      if (memCards[fIdx].emoji === memCards[sIdx].emoji) {
        setTimeout(() => {
          playSound(audioCtxRef.current, "match", isMuted);
          const matched = [...memCards];
          matched[fIdx].isMatched = true;
          matched[sIdx].isMatched = true;
          setMemCards(matched);
          setMemFlipped([]);

          if (matched.every((c) => c.isMatched)) {
            setMemTimerActive(false);
            setMemOver(true);
            triggerConfetti();
            playSound(audioCtxRef.current, "victory", isMuted);
          }
        }, 300);
      } else {
        setTimeout(() => {
          playSound(audioCtxRef.current, "error", isMuted);
          const hidden = [...memCards];
          hidden[fIdx].isFlipped = false;
          hidden[sIdx].isFlipped = false;
          setMemCards(hidden);
          setMemFlipped([]);
        }, 1000);
      }
    }
  };

  // --- LOGIC: BUBBLE POP ---
  const spawnBubble = useCallback((id: number, startBottom = false): Bubble => {
    const size = Math.random() * 25 + 65;
    return {
      id,
      x: Math.random() * 80 + 5,
      y: startBottom ? Math.random() * 30 + 105 : Math.random() * 80 + 10,
      speed: Math.random() * 0.4 + 0.25,
      size,
      emoji: BUBBLE_EMOJIS[Math.floor(Math.random() * BUBBLE_EMOJIS.length)],
      color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
    };
  }, []);

  const initBubbleGame = useCallback(() => {
    const initialBubbles = Array.from({ length: 8 }).map((_, i) => spawnBubble(i, false));
    setBubbleList(initialBubbles);
    setPopScore(0);
    setPopParticles([]);
  }, [spawnBubble]);

  useEffect(() => {
    if (activeGame !== "bubbles") return;
    const interval = setInterval(() => {
      setBubbleList((prev) =>
        prev.map((b) => {
          let nextY = b.y - b.speed;
          if (nextY < -15) {
            return spawnBubble(b.id, true);
          }
          return { ...b, y: nextY };
        })
      );
    }, 16);
    return () => clearInterval(interval);
  }, [activeGame, spawnBubble]);

  const handleBubblePop = (id: number, clientX: number, clientY: number) => {
    const audioCtx = initAudio();
    const clickedBubble = bubbleList.find((b) => b.id === id);
    if (!clickedBubble) return;

    const rect = bubbleFieldRef.current?.getBoundingClientRect();
    const clickX = clientX - (rect?.left || 0);
    const clickY = clientY - (rect?.top || 0);

    playPopSound(audioCtx, clickedBubble.color, clickX, clickY);
    setPopScore((s) => s + 1);

    setBubbleList((prev) => prev.map((b) => (b.id === id ? spawnBubble(id, true) : b)));
  };

  const playPopSound = (ctx: AudioContext | null, color: string, clickX: number, clickY: number) => {
    playSound(ctx, "pop", isMuted);

    const newParticles: PopParticle[] = Array.from({ length: 8 }).map((_, idx) => {
      const angle = (idx / 8) * Math.PI * 2;
      const distance = Math.random() * 40 + 30;
      return {
        id: Date.now() + idx,
        x: clickX,
        y: clickY,
        color,
        dx: `${Math.cos(angle) * distance}px`,
        dy: `${Math.sin(angle) * distance}px`,
        size: Math.random() * 6 + 6,
      };
    });

    setPopParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setPopParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 500);
  };

  // --- LOGIC: TIC-TAC-TOE ---
  const initTttGame = useCallback(() => {
    setTttBoard(Array(9).fill(null));
    setTttTurn("player");
    setTttWinner(null);
    setTttWinLine([]);
    setConfetti([]);
  }, []);

  const checkTttWinner = (board: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a] === "🦊" ? "player" : "cpu", line: lines[i] };
      }
    }
    if (board.every((cell) => cell !== null)) {
      return { winner: "draw", line: [] };
    }
    return null;
  };

  const handleTttCellClick = (idx: number) => {
    if (tttBoard[idx] || tttWinner || tttTurn !== "player") return;

    const audioCtx = initAudio();
    playSound(audioCtx, "click", isMuted);

    const newBoard = [...tttBoard];
    newBoard[idx] = "🦊";
    setTttBoard(newBoard);

    const result = checkTttWinner(newBoard);
    if (result) {
      setTttWinner(result.winner as any);
      setTttWinLine(result.line);
      if (result.winner === "player") {
        triggerConfetti();
        playSound(audioCtx, "victory", isMuted);
      } else if (result.winner === "draw") {
        playSound(audioCtx, "draw", isMuted);
      }
    } else {
      setTttTurn("cpu");
    }
  };

  useEffect(() => {
    if (activeGame !== "tictactoe" || tttTurn !== "cpu" || tttWinner) return;

    const cpuMove = () => {
      const freeIndices = tttBoard.map((c, i) => (c === null ? i : null)).filter((val) => val !== null) as number[];
      if (freeIndices.length === 0) return;

      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];

      const findCrucialIndex = (symbol: string) => {
        for (const line of lines) {
          const symbols = line.map((idx) => tttBoard[idx]);
          if (symbols.filter((s) => s === symbol).length === 2 && symbols.filter((s) => s === null).length === 1) {
            return line[symbols.indexOf(null)];
          }
        }
        return null;
      };

      const isSmart = Math.random() > 0.4;
      let targetIdx: number | null = null;

      if (isSmart) {
        targetIdx = findCrucialIndex("🐰");
        if (targetIdx === null) {
          targetIdx = findCrucialIndex("🦊");
        }
      }

      if (targetIdx === null) {
        targetIdx = freeIndices[Math.floor(Math.random() * freeIndices.length)];
      }

      const newBoard = [...tttBoard];
      newBoard[targetIdx] = "🐰";
      setTttBoard(newBoard);

      const audioCtx = initAudio();
      playSound(audioCtx, "click", isMuted);

      const result = checkTttWinner(newBoard);
      if (result) {
        setTttWinner(result.winner as any);
        setTttWinLine(result.line);
        if (result.winner === "cpu") {
          playSound(audioCtx, "error", isMuted);
        } else if (result.winner === "draw") {
          playSound(audioCtx, "draw", isMuted);
        }
      } else {
        setTttTurn("player");
      }
    };

    const timer = setTimeout(cpuMove, 600);
    return () => clearTimeout(timer);
  }, [tttTurn, tttBoard, tttWinner, activeGame, isMuted, initAudio]);

  const formatTime = (timeInSecs: number) => {
    const mins = Math.floor(timeInSecs / 60);
    const secs = timeInSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative min-h-screen text-slate-800 dark:text-slate-100 flex items-center justify-center py-4 px-2">
      <div className="fixed inset-0 -z-50 h-full w-full bg-gradient-to-br from-pink-100/70 via-purple-100/70 to-teal-100/70 dark:from-pink-950/40 dark:via-purple-950/40 dark:to-teal-950/40 transition-colors duration-500">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div className="absolute left-[10%] top-[10%] w-[120px] h-[120px] rounded-full bg-pink-300/30 blur-2xl"></div>
        <div className="absolute right-[10%] bottom-[15%] w-[150px] h-[150px] rounded-full bg-blue-300/30 blur-2xl"></div>
      </div>

      <div className={styles.gameContainer}>
        <header className="flex items-center justify-between gap-2 max-w-[480px] w-full mx-auto mb-4">
          {activeGame === "menu" ? (
            <Link href="/en">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-slate-600 dark:text-slate-300 flex items-center justify-center"
                title="To Clinic Website"
              >
                <ArrowLeft size={20} />
              </motion.button>
            </Link>
          ) : (
            <motion.button
              onClick={() => {
                const audioCtx = initAudio();
                playSound(audioCtx, "click", isMuted);
                setActiveGame("menu");
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 font-bold text-sm"
            >
              <ArrowLeft size={16} /> Back
            </motion.button>
          )}

          <div className="flex items-center gap-2">
            {activeGame === "memory" && (
              <>
                <div className="px-3.5 py-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black">
                  Moves: <span className="text-pink-500">{memMoves}</span>
                </div>
                <div className="px-3.5 py-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black flex items-center gap-1">
                  <Timer size={13} className="text-blue-500" />
                  <span className="font-mono text-blue-600 dark:text-blue-300">{formatTime(memSeconds)}</span>
                </div>
              </>
            )}

            {activeGame === "bubbles" && (
              <div className="px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-black flex items-center gap-1">
                🎈 Popped: <span className="text-pink-500 font-bold ml-1">{popScore}</span>
              </div>
            )}

            {activeGame === "tictactoe" && (
              <div className="px-3 py-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black">
                {tttWinner ? (
                  <span className="text-pink-500">Game Over!</span>
                ) : tttTurn === "player" ? (
                  <span>Your Turn: <span className="text-emerald-500">🦊</span></span>
                ) : (
                  <span>Thinking: <span className="text-blue-500">🐰</span></span>
                )}
              </div>
            )}

            {activeGame === "menu" && (
              <div className="px-3 py-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black flex items-center gap-1">
                <Gamepad2 size={14} className="text-indigo-500" /> Kids Games
              </div>
            )}
          </div>

          <motion.button
            onClick={toggleMute}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 backdrop-blur-sm border rounded-2xl shadow-sm flex items-center justify-center transition-all ${
              isMuted
                ? "bg-red-50/80 border-red-200 text-red-500 dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400"
                : "bg-white/80 border-slate-200 text-slate-600 dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-300"
            }`}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </motion.button>
        </header>

        {activeGame === "menu" && (
          <div className={styles.menuGrid}>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-black mb-1">
                <span className="bg-gradient-to-r from-pink-500 via-indigo-500 to-emerald-500 bg-clip-text text-transparent">Kids Corner</span>{" "}
                <span>🧸</span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                Play and have fun while you wait!
              </p>
            </div>

            {/* Game 1: Memory Match */}
            <motion.div
              onClick={() => {
                const audioCtx = initAudio();
                playSound(audioCtx, "click", isMuted);
                setActiveGame("memory");
                initMemoryGame();
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={styles.menuCard}
            >
              <div className={styles.menuCardEmoji}>🧸</div>
              <div className={styles.menuCardText}>
                <h3 className={styles.menuCardTitle}>Memory Match</h3>
                <p className={styles.menuCardDesc}>Find identical emojis under the cards!</p>
              </div>
            </motion.div>

            {/* Game 2: Bubble Pop */}
            <motion.div
              onClick={() => {
                const audioCtx = initAudio();
                playSound(audioCtx, "click", isMuted);
                setActiveGame("bubbles");
                initBubbleGame();
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={styles.menuCard}
            >
              <div className={styles.menuCardEmoji}>🎈</div>
              <div className={styles.menuCardText}>
                <h3 className={styles.menuCardTitle}>Bubble Pop</h3>
                <p className={styles.menuCardDesc}>Pop the colorful bubbles before they float away!</p>
              </div>
            </motion.div>

            {/* Game 3: Tic-Tac-Toe */}
            <motion.div
              onClick={() => {
                const audioCtx = initAudio();
                playSound(audioCtx, "click", isMuted);
                setActiveGame("tictactoe");
                initTttGame();
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={styles.menuCard}
            >
              <div className={styles.menuCardEmoji}>🦊</div>
              <div className={styles.menuCardText}>
                <h3 className={styles.menuCardTitle}>Tic-Tac-Toe</h3>
                <p className={styles.menuCardDesc}>🦊 vs 🐰. Play against the funny bunny!</p>
              </div>
            </motion.div>
          </div>
        )}

        {/* --- MEMORY MATCH --- */}
        {activeGame === "memory" && (
          <>
            <main className={styles.grid}>
              {memCards.map((card, index) => {
                const isFlipped = card.isFlipped || card.isMatched;
                return (
                  <div key={card.id} className={styles.cardContainer}>
                    <div
                      className={`${styles.card} ${isFlipped ? styles.cardFlipped : ""}`}
                      onClick={() => handleMemCardClick(index)}
                    >
                      <div className={`${styles.cardSide} ${styles.cardFront}`}>
                        <span className="text-4xl md:text-5xl select-none">
                          {card.emoji}
                        </span>
                        {card.isMatched && (
                          <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-0.5 shadow-sm">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <div className={`${styles.cardSide} ${styles.cardBack}`}>
                        <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center text-white font-black text-lg">
                          ?
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </main>

            <footer className="mt-4 flex justify-center max-w-[480px] w-full mx-auto">
              <motion.button
                onClick={initMemoryGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3.5 bg-white/90 dark:bg-slate-900/90 hover:bg-white border border-slate-200 dark:border-slate-800 rounded-3xl font-bold flex items-center gap-2 shadow-md text-slate-700 dark:text-slate-200 text-sm"
              >
                <RotateCcw size={16} className="text-pink-500" />
                <span>Play Again</span>
              </motion.button>
            </footer>

            <AnimatePresence>
              {memOver && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80">
                  <div className={styles.confettiContainer}>
                    {confetti.map((piece) => (
                      <div
                        key={piece.id}
                        className={styles.confettiPiece}
                        style={{
                          left: piece.left,
                          backgroundColor: piece.color,
                          animationDelay: piece.delay,
                          width: piece.size,
                          height: piece.size,
                        }}
                      />
                    ))}
                  </div>

                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, transition: { type: "spring", damping: 15 } }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[40px] max-w-sm w-full text-center shadow-2xl relative overflow-hidden"
                  >
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-100 dark:bg-pink-950/20 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-100 dark:bg-blue-950/20 rounded-full blur-2xl"></div>

                    <div className="relative z-10">
                      <div className="mx-auto w-20 h-20 bg-pink-100 dark:bg-pink-950/50 rounded-full flex items-center justify-center mb-6">
                        <Trophy size={40} className="text-pink-500 dark:text-pink-400 animate-bounce" />
                      </div>

                      <h2 className="text-3xl font-black mb-2 text-slate-900 dark:text-white leading-tight">
                        Great Game! 🎉
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 font-medium">
                        You found all matching emoji pairs!
                      </p>

                      <div className="grid grid-cols-2 gap-3 mb-8">
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                          <div className="text-xs text-slate-400 dark:text-slate-500 font-semibold mb-1">Moves</div>
                          <div className="text-2xl font-black text-pink-500 dark:text-pink-400">{memMoves}</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                          <div className="text-xs text-slate-400 dark:text-slate-500 font-semibold mb-1">Time</div>
                          <div className="text-2xl font-black text-blue-500 dark:text-blue-400 font-mono">
                            {formatTime(memSeconds)}
                          </div>
                        </div>
                      </div>

                      <motion.button
                        onClick={initMemoryGame}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-4 bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        <RotateCcw size={18} />
                        <span>Play Again</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* --- BUBBLE POP --- */}
        {activeGame === "bubbles" && (
          <>
            <main ref={bubbleFieldRef} className={styles.bubbleField}>
              {bubbleList.map((bubble) => (
                <div
                  key={bubble.id}
                  className={styles.bubble}
                  style={{
                    left: `${bubble.x}%`,
                    top: `${bubble.y}%`,
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                  }}
                  onMouseDown={(e) => handleBubblePop(bubble.id, e.clientX, e.clientY)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    const touch = e.touches[0];
                    handleBubblePop(bubble.id, touch.clientX, touch.clientY);
                  }}
                >
                  <span className={styles.bubbleEmoji}>{bubble.emoji}</span>
                </div>
              ))}

              {popParticles.map((p) => (
                <div
                  key={p.id}
                  className={styles.bubbleParticle}
                  style={{
                    left: `${p.x}px`,
                    top: `${p.y}px`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: p.color,
                    ["--dx" as any]: p.dx,
                    ["--dy" as any]: p.dy,
                  }}
                />
              ))}
            </main>

            <footer className="mt-4 flex justify-center max-w-[480px] w-full mx-auto">
              <motion.button
                onClick={initBubbleGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3.5 bg-white/90 dark:bg-slate-900/90 hover:bg-white border border-slate-200 dark:border-slate-800 rounded-3xl font-bold flex items-center gap-2 shadow-md text-slate-700 dark:text-slate-200 text-sm"
              >
                <RotateCcw size={16} className="text-pink-500" />
                <span>Reset Score</span>
              </motion.button>
            </footer>
          </>
        )}

        {/* --- TIC-TAC-TOE --- */}
        {activeGame === "tictactoe" && (
          <>
            <main className={styles.tttBoard}>
              {tttBoard.map((cell, index) => {
                const isWonCell = tttWinLine.includes(index);
                return (
                  <div
                    key={index}
                    onClick={() => handleTttCellClick(index)}
                    className={`${styles.tttCell} ${isWonCell ? styles.tttCellWon : ""} ${
                      !cell && !tttWinner && tttTurn === "player" ? styles.tttCellActive : ""
                    }`}
                  >
                    {cell && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="select-none"
                      >
                        {cell}
                      </motion.span>
                    )}
                  </div>
                );
              })}
            </main>

            <footer className="mt-4 flex justify-center max-w-[480px] w-full mx-auto">
              <motion.button
                onClick={initTttGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3.5 bg-white/90 dark:bg-slate-900/90 hover:bg-white border border-slate-200 dark:border-slate-800 rounded-3xl font-bold flex items-center gap-2 shadow-md text-slate-700 dark:text-slate-200 text-sm"
              >
                <RotateCcw size={16} className="text-pink-500" />
                <span>Play Again</span>
              </motion.button>
            </footer>

            <AnimatePresence>
              {tttWinner && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80">
                  <div className={styles.confettiContainer}>
                    {tttWinner === "player" &&
                      confetti.map((piece) => (
                        <div
                          key={piece.id}
                          className={styles.confettiPiece}
                          style={{
                            left: piece.left,
                            backgroundColor: piece.color,
                            animationDelay: piece.delay,
                            width: piece.size,
                            height: piece.size,
                          }}
                        />
                      ))}
                  </div>

                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, transition: { type: "spring", damping: 15 } }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[40px] max-w-sm w-full text-center shadow-2xl relative overflow-hidden"
                  >
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-100 dark:bg-pink-950/20 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-100 dark:bg-blue-950/20 rounded-full blur-2xl"></div>

                    <div className="relative z-10">
                      <div className="mx-auto w-20 h-20 bg-pink-100 dark:bg-pink-950/50 rounded-full flex items-center justify-center mb-6">
                        <Trophy size={40} className="text-pink-500 dark:text-pink-400" />
                      </div>

                      <h2 className="text-3xl font-black mb-2 text-slate-900 dark:text-white leading-tight">
                        {tttWinner === "player"
                          ? "You Won! 🎉"
                          : tttWinner === "cpu"
                          ? "Bunny Won! 🐰"
                          : "It's a Draw! 🦊🤝🐰"}
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 font-medium">
                        {tttWinner === "player"
                          ? "Your fox 🦊 was faster this time!"
                          : tttWinner === "cpu"
                          ? "This time the long-eared won!"
                          : "Friendship won this game!"}
                      </p>

                      <motion.button
                        onClick={initTttGame}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-4 bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        <RotateCcw size={18} />
                        <span>Play Again</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </>
        )}

      </div>
    </div>
  );
}
