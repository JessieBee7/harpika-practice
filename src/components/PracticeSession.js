import React, { useState } from 'react';
import Practice from './Practice';
import KawaiiCompanions from './KawaiiCompanions';
import { Star } from 'lucide-react';

const PracticeSession = ({ lessonData, onProgress, currentLevel }) => {
  const [practiceState, setPracticeState] = useState('ready'); // ready, practicing, completed
  const [characterMood, setCharacterMood] = useState('happy');

  // Handle practice completion
  const handlePracticeComplete = () => {
    setPracticeState('completed');
    setCharacterMood('excited');
    onProgress({
      lessonId: lessonData.id,
      level: currentLevel,
      levelCompleted: false // This would be determined by curriculum progress
    });
  };

  // Handle note detection success
  const handleNoteSuccess = () => {
    if (characterMood !== 'excited') {
      setCharacterMood('excited');
      setTimeout(() => setCharacterMood('happy'), 1000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Kawaii Character */}
      <div className="relative">
        <KawaiiCompanions 
          mood={characterMood}
          level={currentLevel}
        />
      </div>

      {/* Practice Interface */}
      <Practice
        song={lessonData}
        onComplete={handlePracticeComplete}
        onNoteSuccess={handleNoteSuccess}
      />

      {/* Completion Message */}
      {practiceState === 'completed' && (
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <p className="text-green-700 font-bold">Great job!</p>
          <p className="text-sm text-green-600 mt-1">Lesson completed! 🎉</p>
        </div>
      )}
    </div>
  );
};

export default PracticeSession;
