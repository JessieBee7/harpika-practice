import React, { useState, useEffect } from 'react';
import { Mic, Volume2, AlertCircle } from 'lucide-react';

const AudioDetector = ({ onNoteDetected, isListening }) => {
  const [audioContext, setAudioContext] = useState(null);
  const [analyzer, setAnalyzer] = useState(null);
  const [error, setError] = useState(null);

  // Harpika note mapping (frequency to note)
  const noteFrequencies = {
    'D6': { freq: 1174.66, tab: '2°°' },
    'B5': { freq: 987.77, tab: '7°' },
    'G5': { freq: 783.99, tab: '5°' },
    'E5': { freq: 659.25, tab: '3°' },
    'C5': { freq: 523.25, tab: '1°' },
    'A4': { freq: 440.00, tab: '6' },
    'F4': { freq: 349.23, tab: '4' },
    'D4': { freq: 293.66, tab: '2' },
    'C4': { freq: 261.63, tab: '1' },
    'E4': { freq: 329.63, tab: '3' },
    'G4': { freq: 392.00, tab: '5' },
    'B4': { freq: 493.88, tab: '7' },
    'D5': { freq: 587.33, tab: '2°' },
    'F5': { freq: 698.46, tab: '4°' },
    'A5': { freq: 880.00, tab: '6°' },
    'C6': { freq: 1046.50, tab: '1°°' },
    'E6': { freq: 1318.51, tab: '3°°' }
  };

  // Initialize audio context and analyzer
  const startListening = async () => {
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const analyzerNode = context.createAnalyser();
      analyzerNode.fftSize = 2048;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = context.createMediaStreamSource(stream);
      source.connect(analyzerNode);

      setAudioContext(context);
      setAnalyzer(analyzerNode);
      setError(null);

      startDetecting(analyzerNode);
    } catch (err) {
      setError('Please enable microphone access to use pitch detection');
      console.error('Audio setup error:', err);
    }
  };

  // Detect pitch using autocorrelation
  const detectPitch = (buffer, sampleRate) => {
    const bufferLength = buffer.length;
    const correlation = new Float32Array(bufferLength);
    let bestOffset = -1;
    let bestCorrelation = 0;

    // Calculate autocorrelation
    for (let offset = 0; offset < bufferLength; offset++) {
      let correlationValue = 0;
      for (let i = 0; i < bufferLength - offset; i++) {
        correlationValue += buffer[i] * buffer[i + offset];
      }
      correlation[offset] = correlationValue;
    }

    // Find best correlation
    for (let offset = 1; offset < bufferLength; offset++) {
      if (correlation[offset] > bestCorrelation) {
        bestCorrelation = correlation[offset];
        bestOffset = offset;
      }
    }

    if (bestCorrelation > 0.5) {
      const frequency = sampleRate / bestOffset;
      return frequency;
    }

    return null;
  };

  // Find closest note to detected frequency
  const findClosestNote = (frequency) => {
    if (!frequency) return null;

    let closestNote = null;
    let closestDiff = Infinity;

    Object.entries(noteFrequencies).forEach(([note, data]) => {
      const diff = Math.abs(frequency - data.freq);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestNote = { note, tab: data.tab };
      }
    });

    return closestNote;
  };

  // Start continuous detection
  const startDetecting = (analyzerNode) => {
    const buffer = new Float32Array(analyzerNode.fftSize);
    
    const detect = () => {
      analyzerNode.getFloatTimeDomainData(buffer);
      const frequency = detectPitch(buffer, audioContext.sampleRate);
      const note = findClosestNote(frequency);
      
      if (note) {
        onNoteDetected(note);
      }

      if (isListening) {
        requestAnimationFrame(detect);
      }
    };

    detect();
  };

  // Start/stop listening based on prop
  useEffect(() => {
    if (isListening && !audioContext) {
      startListening();
    }
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [isListening]);

  return (
    <div className="audio-detector">
      {error && (
        <div className="flex items-center gap-2 text-red-500 mb-4">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}
      {isListening && (
        <div className="flex items-center gap-2 text-green-500">
          <Mic className="w-5 h-5 animate-pulse" />
          <span className="text-sm">Listening...</span>
        </div>
      )}
    </div>
  );
};

export default AudioDetector;
