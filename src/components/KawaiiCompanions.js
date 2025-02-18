import React, { useState } from 'react';
import { Music, Star, Volume2 } from 'lucide-react';

const KawaiiCompanions = ({ level, mood, onInteract }) => {
  const [activeCharacter, setActiveCharacter] = useState(0);
  const [animation, setAnimation] = useState('idle');
  const [message, setMessage] = useState('');

  const renderKawaiiCloud = (colors) => (
    <g className={`kawaii-cloud ${animation}`}>
      <path 
        d="M30 40 C30 20, 45 10, 60 15 C65 0, 90 0, 95 15 C110 10, 125 20, 125 40 C125 65, 30 65, 30 40" 
        fill={colors.primary}
      />
      {mood === 'happy' ? (
        <>
          <circle cx="65" cy="35" r="3" fill="#333"/>
          <circle cx="90" cy="35" r="3" fill="#333"/>
          <path 
            d="M70 45 Q77.5 50 85 45" 
            fill="none" 
            stroke="#333" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <circle cx="65" cy="35" r="3" fill="#333"/>
          <circle cx="90" cy="35" r="3" fill="#333"/>
          <path 
            d="M70 48 Q77.5 45 85 48" 
            fill="none" 
            stroke="#333" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </>
      )}
    </g>
  );

  const renderKawaiiCat = (colors) => (
    <g className={`kawaii-cat ${animation}`}>
      <ellipse cx="80" cy="50" rx="30" ry="25" fill={colors.cat} />
      <path d="M60 30 L70 45 L80 30 Z" fill={colors.cat} />
      <path d="M80 30 L90 45 L100 30 Z" fill={colors.cat} />
      {mood === 'happy' ? (
        <>
          <circle cx="70" cy="45" r="3" fill="#333"/>
          <circle cx="90" cy="45" r="3" fill="#333"/>
          <path d="M75 55 Q80 58 85 55" stroke="#333" strokeWidth="2" fill="none"/>
        </>
      ) : (
        <>
          <path d="M67 45 L73 45" stroke="#333" strokeWidth="2"/>
          <path d="M87 45 L93 45" stroke="#333" strokeWidth="2"/>
          <path d="M75 55 Q80 52 85 55" stroke="#333" strokeWidth="2" fill="none"/>
        </>
      )}
    </g>
  );

  const renderKawaiiCupcake = (colors) => (
    <g className={`kawaii-cupcake ${animation}`}>
      <path d="M65 40 Q80 20 95 40" fill={colors.secondary} />
      <circle cx="80" cy="40" r="15" fill={colors.secondary} />
      <path d="M70 40 L90 40 L85 60 L75 60 Z" fill={colors.primary} />
      {mood === 'happy' ? (
        <>
          <circle cx="75" cy="45" r="2" fill="#333"/>
          <circle cx="85" cy="45" r="2" fill="#333"/>
          <path d="M77 50 Q80 53 83 50" stroke="#333" strokeWidth="1.5" fill="none"/>
        </>
      ) : (
        <>
          <path d="M73 45 L77 45" stroke="#333" strokeWidth="1.5"/>
          <path d="M83 45 L87 45" stroke="#333" strokeWidth="1.5"/>
          <path d="M77 50 Q80 48 83 50" stroke="#333" strokeWidth="1.5" fill="none"/>
        </>
      )}
    </g>
  );

  const renderKawaiiStarFruit = (colors) => (
    <g className={`kawaii-starfruit ${animation}`}>
      <path d="M80 20 L95 50 L80 80 L65 50 Z" fill={colors.fruit}/>
      <path d="M60 50 L100 50" fill={colors.fruit}/>
      {mood === 'happy' ? (
        <>
          <circle cx="75" cy="45" r="2.5" fill="#333"/>
          <circle cx="85" cy="45" r="2.5" fill="#333"/>
          <path d="M77 52 Q80 55 83 52" stroke="#333" strokeWidth="2" fill="none"/>
        </>
      ) : (
        <>
          <path d="M72 45 L78 45" stroke="#333" strokeWidth="2"/>
          <path d="M82 45 L88 45" stroke="#333" strokeWidth="2"/>
          <path d="M77 52 Q80 49 83 52" stroke="#333" strokeWidth="2" fill="none"/>
        </>
      )}
    </g>
  );

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
              onClick={() => setActiveCharacter(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KawaiiCompanions;
