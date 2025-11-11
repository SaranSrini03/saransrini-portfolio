import React from 'react';

const ScrollIndicator = () => (
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
    <div className="flex flex-col items-center text-white/60">
      <span className="text-sm mb-2 font-light tracking-wider">
        Scroll to explore
      </span>
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
        <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-bounce"></div>
      </div>
    </div>
  </div>
);

export default ScrollIndicator;
