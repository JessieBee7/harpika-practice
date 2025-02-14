import React, { useState, useEffect } from 'react';
import { Music, Star, Volume2 } from 'lucide-react';

const KawaiiCompanions = ({ level, mood, onInteract }) => {
  const [activeCharacter, setActiveCharacter] = useState(0);
  const [animation, setAnimation] = useState('idle');
  const [message, setMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  // Updated character messages to include music notation references
  const characterMessages = {
    cloud: {
      practice: [
        "Let's practice your 1° notes first! ♪",
        "Try the (1 3 5) chord slowly! ☁️",
        "Remember to read left to right! 🎵"
      ],
      achievement: [
        "Perfect (1° 3° 5°) chord! ⭐",
        "Your scales are getting smoother! ☁️✨"
      ]
    },
    cat: {
      practice: [
        "Purr-fect time to practice those 2°° notes! 🐱",
        "Let's try some gentle (7 2° 4°) chords! 🎵"
      ],
      achievement: [
        "Those high notes were purr-fect! 🐱✨",
        "Your chord transitions are meow-velous! 🎵"
      ]
    },
    cupcake: {
      practice: [
        "Start with simple 1-2-3 patterns! 🧁",
        "Ready to try (1 3° 5°)? So sweet! 🎵"
      ],
      achievement: [
        "Sweet progress on those dot notes! 🧁✨",
        "Your practice is the cherry on top! 🎵"
      ]
    },
    starfruit: {
      practice: [
        "Let's shine with some 5° practice! ⭐",
        "Time for those stellar (1°° 3°° 5°) chords! 🌟"
      ],
      achievement: [
        "You're mastering those double dots! ✨",
        "Your high notes are stellar! 🌟"
      ]
    }
  };

  // Rest of the component remains the same
  // (keeping all the rendering functions and SVG content)

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="relative w-full h-64">
          <svg viewBox="0 0 400 200" className="w-full h-full">
            <style>
              {`
                .kawaii-cloud, .kawaii-cat, .kawaii-cupcake, .kawaii-starfruit {
                  transition: transform 0.3s ease;
                }
                .kawaii-cloud:hover, .kawaii-cat:hover, .kawaii-cupcake:hover, .kawaii-starfruit:hover {
                  transform: scale(1.1);
                }
              `}
            </style>
            <g transform="translate(100,25)">
              {activeCharacter === 0 && renderKawaiiCloud({ primary: '#F8F8FF', secondary: '#9BB7D4' })}
              {activeCharacter === 1 && renderKawaiiCat({ cat: '#FFE5B4' })}
              {activeCharacter === 2 && renderKawaiiCupcake({ primary: '#FFB7DC', secondary: '#B57EDC' })}
              {activeCharacter === 3 && renderKawaiiStarFruit({ fruit: '#FFD700' })}
            </g>
          </svg>
        </div>

        {message && (
          <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <p className="text-center py-2">{message}</p>
          </div>
        )}

        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeCharacter === index ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              onClick={() => {
                setActiveCharacter(index);
                // Show a random practice message when changing characters
                const character = ['cloud', 'cat', 'cupcake', 'starfruit'][index];
                const messages = characterMessages[character].practice;
                setMessage(messages[Math.floor(Math.random() * messages.length)]);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KawaiiCompanions;
