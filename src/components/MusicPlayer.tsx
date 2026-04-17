import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TRACKS = [
  {
    id: 1,
    title: "SYNTH_DREAMS.SYS",
    artist: "VOYAGER_01",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "ELEC_PULSE.EXE",
    artist: "CYBER_ECHO",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "MID_DRIVE.LOG",
    artist: "RETRO_UNIT",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleBack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentTrackIndex, isPlaying]);

  return (
    <div className="w-full bg-black border-4 border-magenta-500 p-6 crt-flicker">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={handleNext}
      />

      <div className="flex flex-col gap-4">
        <div className="border-b-2 border-cyan-400 pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              className="space-y-1"
            >
              <h3 className="text-3xl font-mono glitch-text text-[#FF00FF]">
                {currentTrack.title}
              </h3>
              <p className="text-[#00FFFF] font-mono opacity-70">
                PRODUCER: {currentTrack.artist}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button 
            onClick={handleBack} 
            className="border-2 border-cyan-400 p-2 hover:bg-cyan-400 hover:text-black font-mono transition-all"
          >
            PREV_CHUNK
          </button>
          
          <button
            onClick={togglePlay}
            className="border-2 border-magenta-500 p-2 bg-magenta-500 text-black font-bold hover:bg-black hover:text-magenta-500 transition-all"
          >
            {isPlaying ? 'HALT();' : 'RUN();'}
          </button>

          <button 
            onClick={handleNext} 
            className="border-2 border-cyan-400 p-2 hover:bg-cyan-400 hover:text-black font-mono transition-all"
          >
            NEXT_CHUNK
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-2 font-mono text-xs opacity-50">
          <div className="flex justify-between">
            <span>BITRATE: 128KBPS</span>
            <span>FREQ: 44.1KHZ</span>
          </div>
          <div className="w-full h-2 bg-neutral-900 overflow-hidden relative border border-white/20">
             {isPlaying && (
               <motion.div 
                 animate={{ left: ['-100%', '100%'] }}
                 transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                 className="absolute top-0 w-1/4 h-full bg-cyan-400 opacity-50 shadow-[0_0_10px_cyan]"
               />
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
