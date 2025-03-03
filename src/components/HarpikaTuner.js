import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Music, Volume2 } from 'lucide-react';

const HarpikaTuner = () => {
  const [isListening, setIsListening] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [analyzer, setAnalyzer] = useState(null);
  const [currentFrequency, setCurrentFrequency] = useState(null);
  const [currentNote, setCurrentNote] = useState({ note: null, octave: null, tab: null });
  const [tuningStatus, setTuningStatus] = useState(null);

  // Harpika string mapping with frequencies
  const harpikaStrings = [
    { note: 'D', octave: 6, tab: '2°°', freq: 1174.66, tolerance: 10 },
    { note: 'B', octave: 5, tab: '7°', freq: 987.77, tolerance: 10 },
    { note: 'G', octave: 5, tab: '5°', freq: 783.99, tolerance: 10 },
    { note: 'E', octave: 5, tab: '3°', freq: 659.25, tolerance: 10 },
    { note: 'C', octave: 5, tab: '1°', freq: 523.25, tolerance: 10 },
    { note: 'A', octave: 4, tab: '6', freq: 440.00, tolerance: 5 },
    { note: 'F', octave: 4, tab: '4', freq: 349.23, tolerance: 5 },
    { note: 'D', octave: 4, tab: '2', freq: 293.66, tolerance: 5 },
    { note: 'C', octave: 4, tab: '1', freq: 261.63, tolerance: 5 },
    { note: 'E', octave: 4, tab: '3', freq: 329.63, tolerance: 5 },
    { note: 'G', octave: 4, tab: '5', freq: 392.00, tolerance: 5 },
    { note: 'B', octave: 4, tab: '7', freq: 493.88, tolerance: 5 },
    { note: 'D', octave: 5, tab: '2°', freq: 587.33, tolerance: 8 },
    { note: 'F', octave: 5, tab: '4°', freq: 698.46, tolerance: 8 },
    { note: 'A', octave: 5, tab: '6°', freq: 880.00, tolerance: 8 },
    { note: 'C', octave: 6, tab: '1°°', freq: 1046.50, tolerance: 10 },
    { note: 'E', octave: 6, tab: '3°°', freq: 1318.51, tolerance: 10 }
  ];

  // Initialize audio
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
      setIsListening(true);

      startPitchDetection(analyzerNode);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (audioContext) {
      audioContext.close();
      setAudioContext(null);
      setAnalyzer(null);
    }
    setIsListening(false);
  };

  // Autocorrelation pitch detection algorithm
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
      
      if (correlation[offset] > bestCorrelation) {
        bestCorrelation = correlation[offset];
        bestOffset = offset;
      }
    }

    // We need a decent correlation value to be confident in our result
    if (bestCorrelation > 0.1) {
      const frequency = sampleRate / bestOffset;
      // Filter out unreasonably low or high frequencies
      if (frequency > 80 && frequency < 2000) {
        return frequency;
      }
    }
    
    return null;
  };

  const startPitchDetection = (analyzerNode) => {
    const buffer = new Float32Array(analyzerNode.fftSize);
    
    const detect = () => {
      analyzerNode.getFloatTimeDomainData(buffer);
      const frequency = detectPitch(buffer, audioContext.sampleRate);
      
      if (frequency) {
        setCurrentFrequency(frequency);
        findMatchingString(frequency);
      }

      if (isListening) {
        requestAnimationFrame(detect);
      }
    };

    detect();
  };

  // Find the closest matching string on the harpika
  const findMatchingString = (frequency) => {
    let closestString = null;
    let smallestDifference = Infinity;

    harpikaStrings.forEach(string => {
      const difference = Math.abs(frequency - string.freq);
      if (difference < smallestDifference) {
        smallestDifference = difference;
        closestString = string;
      }
    });

    if (closestString) {
      setCurrentNote(closestString);
      
      // Check if it's in tune
      const percentageOff = (Math.abs(frequency - closestString.freq) / closestString.freq) * 100;
      
      if (percentageOff < 0.5) {
        setTuningStatus('in-tune');
      } else if (percentageOff < 3) {
        setTuningStatus(frequency > closestString.freq ? 'too-high' : 'too-low');
      } else {
        setTuningStatus('out-of-tune');
      }
    }
  };

  // Render Tuner UI
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-purple-900">Harpika Tuner</h2>
      
      <div className="flex justify-center mb-8">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            isListening 
              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="w-5 h-5" />
              Stop Listening
            </>
          ) : (
            <>
              <Mic className="
