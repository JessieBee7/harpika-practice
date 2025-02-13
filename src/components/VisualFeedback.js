import React, { useState, useEffect } from 'react';

const VisualFeedback = ({ isPlaying, currentBeat, tempo = 120 }) => {
  const [beatCount, setBeatCount] = useState(0);
  const [visualPosition, setVisualPosition] = useState(0);

  return (
    <div className="mt-4 relative">
      <div className="h-16 bg-gray-100 rounded-lg relative overflow-hidden">
        {/* Timing slider */}
        <div 
          className="absolute h-full w-2 bg-blue-500 transition-all duration-200"
          style={{ left: `${visualPosition}%` }}
        />
        
        {/* Note markers */}
        <div className="absolute top-0 left-0 w-full h-full flex">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className={`flex-1 border-r border-gray-300 relative
                ${currentBeat === i ? 'bg-blue-100' : ''}`}
            >
              <div className="absolute bottom-0 w-full text-center text-xs text-gray-500">
                {i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Visual guides */}
        <div className="absolute top-2 left-0 w-full flex justify-around">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1 h-8 rounded
                ${currentBeat === i ? 'bg-blue-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Feedback text */}
      <div className="text-center mt-2 text-sm">
        {isPlaying ? (
          <span className="text-green-600">Playing in time!</span>
        ) : (
          <span className="text-gray-600">Waiting for input...</span>
        )}
      </div>
    </div>
  );
};

export default VisualFeedback;
