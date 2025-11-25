
import React from 'react';

export const AnimatedWaveLogo = ({ animated = true }: { animated?: boolean }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="text-xl md:text-2xl font-bold text-white">
        <span className="bg-gradient-to-r from-[#f0abfc] to-[#9b87f5] text-transparent bg-clip-text">Slowed</span>
        <span className="text-white">+</span>
        <span className="bg-gradient-to-r from-[#f0abfc] to-[#9b87f5] text-transparent bg-clip-text">Reverb</span>
      </div>
    </div>
  );
};

export default AnimatedWaveLogo;
