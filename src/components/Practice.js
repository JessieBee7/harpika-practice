import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import AudioDetector from './AudioDetector';

const Practice = ({ song, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(60);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isListening, setIsListening] = useState(false);

  // Parse tab notation into individual notes
  const parseTab = (tab) => {
    return tab.map(line => 
      line.split(/\s+/).filter(note => note.length > 0)
    ).flat();
  };

  const notes = song ? parseTab(song.tab) : [];

  // Handle detected note
  const handleNoteDetected = (detectedNote) => {
    const expectedNote = notes[currentNoteIndex];
    if (detectedNote.tab === expectedNote) {
      setFeedback({
        type: 'success',
        message: 'Correct note! ✨'
      });
      // Move to next note after short delay
      setTimeout(() => {
        setCurrentNoteIndex(prev => 
          prev < notes.length - 1 ? prev + 1 : prev
        );
        setFeedback(null);
      }, 500);
    }
  };

  // Visual tab display
  const TabDisplay = () => (
    <div className="font-mono text-lg bg-purple-50 p-4 rounded-lg overflow-x-auto whitespace-nowrap">
      {notes.map((note, index) => (
        <span 
          key={index}
          className={`inline-block px-2 py-1 rounded ${
            index === currentNoteIndex 
              ? 'bg-purple-200 font-bold' 
              : index < currentNoteIndex 
                ? 'text-gray-400' 
                : ''
          }`}
        >
          {note}
        </span>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{song?.title || 'Practice'}</h2>
        <div className="flex items-center gap-4">
          {/* Tempo control */}
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
          
          {/* Play/Stop button */}
          <button
            onClick={() => setIsListening(!isListening)}
            className={`p-3 rounded-full ${
              isListening ? 'bg-red-100' : 'bg-green-100'
            }`}
          >
            {isListening ? 
              <Pause className="w-6 h-6" /> : 
              <Play className="w-6 h-6" />
            }
          </button>
        </div>
      </div>

      {/* Tab display */}
      <TabDisplay />

      {/* Current note display */}
      <div className="text-center p-4 bg-purple-50 rounded-lg">
        <div className="text-sm text-gray-600">Current Note</div>
        <div className="text-3xl font-bold text-purple-700">
          {notes[currentNoteIndex]}
        </div>
      </div>

      {/* Audio detector */}
      <AudioDetector 
        isListening={isListening}
        onNoteDetected={handleNoteDetected}
      />

      {/* Feedback display */}
      {feedback && (
        <div className={`p-4 rounded-lg text-center ${
          feedback.type === 'success' 
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}>
          {feedback.message}
        </div>
      )}

      {/* Practice tips */}
      <div className="mt-6">
        <h3 className="font-medium mb-2">Tips:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Play at a comfortable tempo</li>
          <li>• Focus on accuracy before speed</li>
          <li>• Make sure each note is clear</li>
          <li>• Watch for dots in the notation</li>
        </ul>
      </div>
    </div>
  );
};

export default Practice;
