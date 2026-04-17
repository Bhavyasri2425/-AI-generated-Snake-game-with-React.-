import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-black overflow-hidden selection:bg-magenta-500/50">
      {/* Background FX */}
      <div className="scanlines" />
      <div className="noise" />
      
      {/* Glitch Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)]" />

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center border-b border-cyan-400/30 z-50 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-magenta-500 border-2 border-white animate-pulse" />
          <h1 className="text-4xl font-mono glitch-text tracking-tighter text-[#00FFFF]">
            VOID_SYSTEM v6.6
          </h1>
        </div>
        <div className="font-mono text-xs text-magenta-500 animate-pulse">
          STATUS: COMPROMISED // UPTIME: [REDACTED]
        </div>
      </header>

      {/* Main UI */}
      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl w-full items-start mt-20">
        
        {/* Left Debug Panel */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
          <div className="border-2 border-cyan-400 p-4 bg-cyan-400/5 font-mono text-[10px] space-y-2">
            <div className="text-cyan-400 font-bold mb-2 underline">SYSTEM_LOGS</div>
            <div>[00:01] BOOT_SEQUENCE_INITIATED</div>
            <div>[00:03] KERNEL_LOADED: 0x8823FFA</div>
            <div>[00:05] OVERRIDE_UI_PROTOCOL_v2</div>
            <div>[00:09] WARNING: GLITCH_ARTIFACTS_DETECTED</div>
            <div>[00:12] PULSE_SYNC_ACTIVE</div>
            <div className="animate-pulse text-magenta-500">_waiting_for_input...</div>
          </div>

          <div className="border-2 border-magenta-500 p-4 bg-magenta-500/5">
             <div className="font-mono text-xs text-magenta-400 mb-4">RESOURCE_FLUX</div>
             <div className="h-20 w-full flex items-end gap-1 px-1">
                {[40, 70, 45, 90, 65, 30, 85, 55].map((h, i) => (
                  <motion.div 
                    key={i} 
                    className="flex-1 bg-magenta-500" 
                    animate={{ height: [`${h}%`, `${Math.random() * 100}%`, `${h}%`] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                  />
                ))}
             </div>
          </div>
        </div>

        {/* Center Canvas */}
        <div className="lg:col-span-6 flex justify-center tearing">
          <SnakeGame />
        </div>

        {/* Right Control Panel */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          <MusicPlayer />
          
          <div className="border-2 border-white p-6 bg-white/5 font-mono">
            <h3 className="text-xl glitch-text mb-4 text-white">TERMINAL_01</h3>
            <p className="text-xs text-gray-500 leading-relaxed italic">
              "The machine does not sleep. The music does not end. The snake eats itself. The pattern remains."
            </p>
            <div className="mt-6 flex justify-between items-center text-[10px] text-cyan-400">
              <span className="border border-cyan-400 px-2">LOCAL_LINK: ACTIVE</span>
              <span className="animate-flicker">● RECV</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 w-full p-2 flex justify-between font-mono text-[8px] opacity-30 z-50">
        <span>0x000000_MEM_ADDR_VOID</span>
        <span className="glitch-text">DO NOT DISCONNECT</span>
        <span>CRC_ERR_DETECTED</span>
      </footer>
    </div>
  );
}
