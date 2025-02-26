import React, { useState } from 'react';
import PracticeSession from './PracticeSession';
import { curriculum } from '../data/curriculum';
import { BookOpen, Star, ArrowRight } from 'lucide-react';

const LearningHub = () => {
  const [currentLevel, setCurrentLevel] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  // Handle level selection
  const handleLevelSelect = (level) => {
    setCurrentLevel(level);
    setCurrentLesson(null);
  };

  // Handle lesson selection
  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
  };

  // Render level selection
  const renderLevelSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(curriculum.levels).map(([levelNum, level]) => (
        <button
          key={levelNum}
          onClick={() => handleLevelSelect(Number(levelNum))}
          className="p-6 rounded-xl text-left transition-all bg-white hover:bg-purple-50"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold">{level.title}</h3>
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-sm text-gray-600 mt-2">{level.description}</p>
          <div className="mt-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-500" />
            <span className="text-sm">{level.lessons.length} lessons</span>
          </div>
        </button>
      ))}
    </div>
  );

  // Render lesson selection
  const renderLessonSelection = () => {
    const currentLevelData = curriculum.levels[currentLevel];
    if (!currentLevelData) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{currentLevelData.title}</h2>
          <button
            onClick={() => setCurrentLevel(null)}
            className="text-purple-600 hover:text-purple-700"
          >
            Back to Levels
          </button>
        </div>
        
        <div className="grid gap-4">
          {currentLevelData.lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => handleLessonSelect(lesson)}
              className="p-4 rounded-lg text-left transition-all bg-white hover:bg-purple-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">{lesson.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {lesson.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-purple-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {!currentLesson && currentLevel === null && renderLevelSelection()}
      {!currentLesson && currentLevel !== null && renderLessonSelection()}
      {currentLesson && (
        <PracticeSession
          lessonData={currentLesson}
          currentLevel={currentLevel}
        />
      )}
    </div>
  );
};

export default LearningHub;
