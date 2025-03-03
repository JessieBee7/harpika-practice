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
              <Mic className="w-5 h-5" />
              Start Tuner
            </>
          )}
        </button>
      </div>

      {isListening && (
        <div className="space-y-6">
          {/* Tuner Display */}
          <div className="flex justify-center items-center space-x-4">
            <div className="w-40 h-40 relative flex items-center justify-center bg-gray-100 rounded-full">
              <div 
                className={`absolute inset-4 rounded-full border-8 transition-colors ${
                  tuningStatus === 'in-tune' ? 'border-green-500' :
                  tuningStatus === 'too-high' ? 'border-yellow-500' :
                  tuningStatus === 'too-low' ? 'border-yellow-500' :
                  'border-gray-300'
                }`}
              ></div>
              <div className="text-4xl font-bold">
                {currentNote.note || '-'}{currentNote.octave || ''}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold mb-1">
                Tab: <span className="text-purple-700">{currentNote.tab || '-'}</span>
              </div>
              <div className="text-sm text-gray-600">
                Frequency: {currentFrequency ? Math.round(currentFrequency) : '--'} Hz
              </div>
              {tuningStatus && (
                <div className={`mt-2 text-sm font-medium ${
                  tuningStatus === 'in-tune' ? 'text-green-600' :
                  tuningStatus === 'too-high' ? 'text-yellow-600' :
                  tuningStatus === 'too-low' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {tuningStatus === 'in-tune' ? 'In Tune' :
                   tuningStatus === 'too-high' ? 'Slightly High' :
                   tuningStatus === 'too-low' ? 'Slightly Low' :
                   'Out of Tune'}
                </div>
              )}
            </div>
          </div>

          {/* String Reference */}
          <div className="pt-6 border-t">
            <h3 className="font-medium mb-3 text-purple-900">String Reference:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              {harpikaStrings.map((string, index) => (
                <div 
                  key={index}
                  className={`p-2 rounded-md flex justify-between ${
                    currentNote.tab === string.tab 
                      ? 'bg-purple-100 text-purple-900 font-medium' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span>{string.note}{string.octave}</span>
                  <span className="font-mono">{string.tab}</span>
                  <span className="text-gray-500">{string.freq} Hz</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!isListening && (
        <div className="text-center text-gray-600 p-4 bg-gray-50 rounded-lg">
          <Music className="w-8 h-8 mx-auto mb-3 text-gray-400" />
          <p>Click "Start Tuner" and play a string to begin tuning your harpika.</p>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500">
        <p>For best results:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Use in a quiet environment</li>
          <li>Hold your harpika close to the microphone</li>
          <li>Play one string at a time clearly</li>
          <li>Allow a moment for the tuner to stabilize</li>
        </ul>
      </div>
    </div>
  );
};

export default HarpikaTuner;
