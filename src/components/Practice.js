import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, RotateCcw, Volume2 } from 'lucide-react';

const Practice = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(60);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [currentNote, setCurrentNote] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [metronomeInterval, setMetronomeInterval] = useState(null);

  // Visual metronome component
  const VisualMetronome = () => (
    <div className="h-8 bg-gray-100 rounded-lg relative overflow-hidden mb-4">
      <div 
        className="absolute top-0 left-0 h-full bg-blue-200 transition-all duration-200"
        style={{ width: `${(currentBeat / 4) * 100}%` }}
      />
      <div className="absolute top-0 left-0 w-full h-full flex">
        {[0, 1, 2, 3].map((beat) => (
          <div 
            key={beat}
            className={`flex-1 border-r border-gray-300 flex items-center justify-center
              ${currentBeat === beat ? 'bg-blue-100' : ''}`}
          >
            {beat + 1}
          </div>
        ))}
      </div>
    </div>
  );

  // Tab display with current position highlight
  const TabDisplay = ({ tab }) => (
    <div className="font-mono text-sm bg-gray-50 p-4 rounded mb-4 whitespace-pre">
      {tab.map((line, i) => (
        <div key={i} className="mb-1">
          {line}
        </div>
      ))}
    </div>
  );

  // Start/stop practice session
  const togglePractice = async () => {
    if (!isPlaying) {
      // Initialize audio context if needed
      if (!audioContext) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(ctx);
      }

      setIsPlaying(true);
      // Start metronome
      const interval = setInterval(() => {
        setCurrentBeat((prev) => (prev + 1) % 4);
      }, (60 / tempo) * 1000);
      setMetronomeInterval(interval);
    } else {
      setIsPlaying(false);
      if (metronomeInterval) {
        clearInterval(metronomeInterval);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (metronomeInterval) {
        clearInterval(metronomeInterval);
      }
    };
  }, [metronomeInterval]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Practice Mode</h2>
        {song && <h3 className="text-gray-600 mb-4">{song.title}</h3>}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={togglePractice}
          className={`p-3 rounded-full ${
            isPlaying ? 'bg-red-100' : 'bg-green-100'
          }`}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm">Tempo:</span>
          <input
            type="range"
            min="40"
            max="120"
            value={tempo}
            onChange={(e) => setTempo(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-sm w-12">{tempo} BPM</span>
        </div>
      </div>

      {/* Metronome */}
      <VisualMetronome />

      {/* Tab Display */}
      {song && <TabDisplay tab={song.tab} />}

      {/* Current Note Display */}
      {currentNote && (
        <div className="text-center p-4 bg-blue-50 rounded">
          <div className="text-sm text-gray-600">Current Note</div>
          <div className="text-2xl font-bold">{currentNote}</div>
        </div>
      )}

      {/* Practice Tips */}
      <div className="mt-6">
        <h4 className="font-medium mb-2">Tips:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Start slowly and gradually increase tempo</li>
          <li>• Practice difficult sections separately</li>
          <li>• Pay attention to proper notation (dots and chords)</li>
          <li>• Use the metronome to maintain steady timing</li>
        </ul>
      </div>
    </div>
  );
};

export default Practice;
