import React, { useState, useEffect } from 'react';
import { Mic, Play, Square, Volume2 } from 'lucide-react';

const AudioPractice = ({ song, onProgress }) => {
  const [isListening, setIsListening] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Initialize audio context
  const startListening = async () => {
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = context.createMediaStreamSource(stream);
      const analyzer = context.createAnalyser();
      
      source.connect(analyzer);
      analyzer.fftSize = 2048;
      
      setAudioContext(context);
      setIsListening(true);
      
      // Start analyzing audio
      analyzeAudio(analyzer);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setFeedback('Please enable microphone access to use this feature');
    }
  };

  // Analyze incoming audio
  const analyzeAudio = (analyzer) => {
    const dataArray = new Float32Array(analyzer.frequencyBinCount);
    const detectPitch = () => {
      analyzer.getFloatTimeDomainData(dataArray);
      const pitch = autoCorrelate(dataArray, audioContext.sampleRate);
      if (pitch !== -1) {
        const note = getNoteFromPitch(pitch);
        setCurrentNote(note);
        checkProgress(note);
      }
      if (isListening) {
        requestAnimationFrame(detectPitch);
      }
    };
    detectPitch();
  };

  // Compare played note with expected note
  const checkProgress = (playedNote) => {
    if (song && song.currentNote === playedNote) {
      setFeedback('Good! Keep going!');
      onProgress && onProgress(playedNote);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Practice Mode</h3>
        <button
          onClick={() => isListening ? setIsListening(false) : startListening()}
          className={`p-2 rounded-full ${isListening ? 'bg-red-100' : 'bg-green-100'}`}
        >
          {isListening ? <Square className="w-6 h-6"/> : <Mic className="w-6 h-6"/>}
        </button>
      </div>

      {currentNote && (
        <div className="text-center mb-4">
          <div className="text-2xl font-bold">{currentNote}</div>
          <div className="text-sm text-gray-600">Current Note</div>
        </div>
      )}

      {feedback && (
        <div className="p-2 bg-blue-50 rounded text-center">
          {feedback}
        </div>
      )}

      <div className="mt-4">
        <h4 className="font-medium mb-2">Tips:</h4>
        <ul className="text-sm text-gray-600">
          <li>• Play in a quiet environment</li>
          <li>• Hold your instrument close to the microphone</li>
          <li>• Play notes clearly and steadily</li>
        </ul>
      </div>
    </div>
  );
};

export default AudioPractice;
