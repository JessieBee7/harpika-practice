import React, { useState } from 'react';
import KawaiiCompanions from './KawaiiCompanions';
import { Star } from 'lucide-react';

const PracticeSession = ({ lessonData, currentLevel }) => {
  const [characterMood, setCharacterMood] = useState('happy');

  return (
    <div className="space-y-6">
      {/* Kawaii Character */}
      <div className="relative">
        <KawaiiCompanions 
          mood={characterMood}
          level={currentLevel || 1}
        />
      </div>

      {/* Lesson Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">{lessonData?.title || 'Practice Session'}</h2>
        
        {lessonData?.content?.tab && (
          <div className="font-mono text-lg bg-purple-50 p-4 rounded-lg mb-4">
            {lessonData.content.tab.map((line, index) => (
              <div key={index} className="mb-1">{line}</div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <h3 className="font-medium mb-2">Practice Tips:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Start slowly and focus on accuracy</li>
            <li>• Make sure each note is clear</li>
            <li>• Pay attention to the dots in notation</li>
            <li>• Practice difficult sections separately</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PracticeSession;
