import React, { useState } from 'react';
import { BookOpen, Star, ArrowRight } from 'lucide-react';

const LearningHub = () => {
  const [currentView, setCurrentView] = useState('levels');
  const [currentLevel, setCurrentLevel] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  // Sample lesson data
  const levels = {
    1: {
      title: "Getting Started",
      description: "Learn the basics",
      lessons: [
        { id: "1-1", title: "Your First Notes", description: "Learn basic notes" },
        { id: "1-2", title: "Simple Scales", description: "Practice scales" }
      ]
    },
    2: {
      title: "Intermediate",
      description: "Expand your skills",
      lessons: [
        { id: "2-1", title: "Dot Notation", description: "Learn higher notes" },
        { id: "2-2", title: "Basic Songs", description: "Play simple songs" }
      ]
    }
  };

  // Handle level selection
  const handleLevelSelect = (level) => {
    setCurrentLevel(level);
    setCurrentView('lessons');
  };

  // Handle lesson selection
  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
    setCurrentView('practice');
  };

  // Handle back navigation
  const handleBackToLevels = () => {
    setCurrentLevel(null);
    setCurrentView('levels');
  };

  // Render level selection
  const renderLevelSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(levels).map(([levelNum, level]) => (
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
    if (!currentLevel) return null;
    
    const levelData = levels[currentLevel];
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{levelData.title}</h2>
          <button
            onClick={handleBackToLevels}
            className="text-purple-600 hover:text-purple-700"
          >
            Back to Levels
          </button>
        </div>
        
        <div className="grid gap-4">
          {levelData.lessons.map((lesson) => (
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
    <div className="p-6 space-y-8">
      {currentView === 'levels' && renderLevelSelection()}
      {currentView === 'lessons' && renderLessonSelection()}
      {currentView === 'practice' && (
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {currentLesson?.title || "Practice"}
            </h2>
            <button
              onClick={() => setCurrentView('lessons')}
              className="text-purple-600 hover:text-purple-700"
            >
              Back to Lessons
            </button>
          </div>
          <p className="bg-purple-50 p-4 rounded-lg">
            Practice content would go here.
          </p>
        </div>
      )}
    </div>
  );
};

export default LearningHub;
