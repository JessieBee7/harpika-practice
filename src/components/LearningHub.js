import React, { useState } from 'react';
import PracticeSession from './PracticeSession';
import { curriculum } from '../data/curriculum';
import { BookOpen, Star, ArrowRight } from 'lucide-react';

const LearningHub = () => {
  const [currentView, setCurrentView] = useState('levels');
  const [currentLevel, setCurrentLevel] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

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
  const handleBackToLessons = () => {
    setCurrentLesson(null);
    setCurrentView('lessons');
  };

  // Handle back to levels
  const handleBackToLevels = () => {
    setCurrentLevel(null);
    setCurrentView('levels');
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
