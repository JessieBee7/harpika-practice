import React, { useState, useEffect } from 'react';
import { BookOpen, Star, ArrowRight, CheckCircle, LockClosed, Play, Award } from 'lucide-react';
import KawaiiCompanions from './KawaiiCompanions';

const NewLearningHub = () => {
  const [currentView, setCurrentView] = useState('levels');
  const [currentLevel, setCurrentLevel] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [progress, setProgress] = useState(() => {
    // Load progress from localStorage if available
    const savedProgress = localStorage.getItem('harpika-progress');
    return savedProgress ? JSON.parse(savedProgress) : {
      completedLessons: [],
      currentLevel: 1,
      experience: 0
    };
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('harpika-progress', JSON.stringify(progress));
  }, [progress]);

  // Calculate user level based on experience
  const calculateLevel = (experience) => {
    return Math.floor(experience / 100) + 1;
  };

  // Helper to check if a lesson is completed
  const isLessonCompleted = (lessonId) => {
    return progress.completedLessons.includes(lessonId);
  };

  // Helper to check if a lesson is unlocked
  const isLessonUnlocked = (lessonId, levelNum) => {
    // Level 1 lessons are always unlocked
    if (levelNum === 1) return true;
    
    // Other levels are unlocked when the previous level has at least one completed lesson
    const previousLevelLessons = Object.values(levels[levelNum - 1].lessons);
    return previousLevelLessons.some(lesson => isLessonCompleted(lesson.id));
  };

  // Complete a lesson and gain experience
  const completeLesson = (lessonId, expGain = 20) => {
    setProgress(prev => {
      // Check if lesson is already completed
      if (prev.completedLessons.includes(lessonId)) {
        return prev;
      }
      
      // Add to completed lessons
      const completedLessons = [...prev.completedLessons, lessonId];
      
      // Add experience
      const experience = prev.experience + expGain;
      
      // Calculate new level
      const currentLevel = calculateLevel(experience);
      
      return {
        completedLessons,
        experience,
        currentLevel
      };
    });
  };

  // Sample lesson data with more structure
  const levels = {
    1: {
      title: "Getting Started",
      description: "Learn the basics of the harpika",
      color: "bg-green-100 text-green-800",
      icon: <BookOpen className="w-5 h-5 text-green-500" />,
      lessons: {
        "1-1": { 
          id: "1-1", 
          title: "Your First Notes", 
          description: "Learn the basic notes and how to play them",
          content: {
            sections: [
              {
                title: "Introduction to Harpika",
                text: "The harpika is a beautiful string instrument with 17 strings arranged in a unique pattern. In this lesson, you'll learn how to play your first notes.",
                image: null
              },
              {
                title: "Basic Position",
                text: "Hold your harpika upright with the longest strings facing away from you. Rest it comfortably on your lap or use a stand if you have one.",
                image: null
              },
              {
                title: "Playing Your First Notes",
                text: "Start with the middle octave. Try playing the number 1 string (C4) by gently plucking it with your finger. Then try 3 (E4) and 5 (G4) to play a simple C major chord.",
                tabs: ["1", "3", "5"]
              },
              {
                title: "Practice Exercise",
                text: "Practice playing these notes in sequence, then try playing them together as a chord: (1 3 5)",
                tabs: ["1", "3", "5", "(1 3 5)"]
              }
            ],
            quiz: [
              {
                question: "Which string is C4 on the harpika?",
                options: ["String 1", "String 2", "String 3", "String 5"],
                answer: 0
              },
              {
                question: "How do you play a chord on the harpika?",
                options: [
                  "Play strings one after another quickly",
                  "Play multiple strings at the same time",
                  "Strum across all strings",
                  "Tap the body of the instrument"
                ],
                answer: 1
              }
            ]
          },
          expGain: 20
        },
        "1-2": { 
          id: "1-2", 
          title: "Simple Scales", 
          description: "Practice basic scales and finger patterns",
          content: {
            sections: [
              {
                title: "Understanding Scales",
                text: "A scale is a sequence of notes played in ascending or descending order. On the harpika, we'll use numbers 1-7 to represent the notes of a scale.",
                image: null
              },
              {
                title: "C Major Scale",
                text: "The C major scale uses all the white keys on a piano. On the harpika, we'll play: 1, 2, 3, 4, 5, 6, 7",
                tabs: ["1", "2", "3", "4", "5", "6", "7"]
              },
              {
                title: "Finger Technique",
                text: "Use the pads of your fingers, not your fingernails. Practice playing the scale smoothly, with even timing between each note.",
                image: null
              },
              {
                title: "Practice Exercise",
                text: "Play the C major scale up and down slowly. Focus on clean, clear sounds for each string.",
                tabs: ["1", "2", "3", "4", "5", "6", "7", "6", "5", "4", "3", "2", "1"]
              }
            ],
            quiz: [
              {
                question: "How many notes are in a complete major scale?",
                options: ["5", "6", "7", "8"],
                answer: 2
              },
              {
                question: "Which part of your fingers should you use to play the harpika?",
                options: [
                  "Fingernails",
                  "Fingertips",
                  "Pads of fingers",
                  "Knuckles"
                ],
                answer: 2
              }
            ]
          },
          expGain: 25
        }
      }
    },
    2: {
      title: "Intermediate",
      description: "Expand your skills with more techniques",
      color: "bg-blue-100 text-blue-800",
      icon: <Star className="w-5 h-5 text-blue-500" />,
      lessons: {
        "2-1": { 
          id: "2-1", 
          title: "Dot Notation", 
          description: "Learn how to read and play higher octaves",
          content: {
            sections: [
              {
                title: "Understanding Octaves",
                text: "An octave is the interval between one musical note and another with half or double its frequency. On the harpika, we use dots (°) to indicate higher octaves.",
                image: null
              },
              {
                title: "Reading Dot Notation",
                text: "One dot (°) indicates the next octave up, two dots (°°) indicate two octaves up. For example, 1 is C4, 1° is C5, and 1°° is C6.",
                tabs: ["1", "1°", "1°°"]
              },
              {
                title: "Higher Octaves",
                text: "Try playing the same note in different octaves to hear the difference in pitch.",
                tabs: ["1", "1°", "1°°", "3", "3°", "3°°", "5", "5°", "5°°"]
              },
              {
                title: "Practice Exercise",
                text: "Play this sequence that moves between octaves:",
                tabs: ["1", "3", "5", "1°", "3°", "5°", "3°", "1°", "5", "3", "1"]
              }
            ],
            quiz: [
              {
                question: "What does the notation 3° represent?",
                options: [
                  "The third string in the lowest octave",
                  "The E note in the middle octave",
                  "The E note one octave higher than the middle octave",
                  "Three notes played simultaneously"
                ],
                answer: 2
              },
              {
                question: "How many octaves can the harpika play?",
                options: ["1", "2", "3", "4"],
                answer: 2
              }
            ]
          },
          expGain: 30
        },
        "2-2": { 
          id: "2-2", 
          title: "Basic Songs", 
          description: "Play your first complete songs",
          content: {
            sections: [
              {
                title: "Simple Melodies",
                text: "Now that you know basic notes and dot notation, we can start playing simple songs. We'll start with 'Twinkle Twinkle Little Star'.",
                image: null
              },
              {
                title: "Twinkle Twinkle Little Star",
                text: "This song uses just a few notes in a simple pattern:",
                tabs: ["1", "1", "5", "5", "6", "6", "5", "4", "4", "3", "3", "2", "2", "1"]
              },
              {
                title: "Adding Chords",
                text: "Try adding simple chords as accompaniment. Play these chords after each line:",
                tabs: ["(1 3 5)", "(4 6 1°)", "(1 3 5)"]
              },
              {
                title: "Practice Song",
                text: "Now try 'Mary Had a Little Lamb':",
                tabs: ["3", "2", "1", "2", "3", "3", "3", "2", "2", "2", "3", "5", "5", "3", "2", "1", "2", "3", "3", "3", "2", "2", "3", "2", "1"]
              }
            ],
            quiz: [
              {
                question: "What is the first note in 'Twinkle Twinkle Little Star'?",
                options: ["1", "3", "5", "6"],
                answer: 0
              },
              {
                question: "How do you indicate a chord in harpika notation?",
                options: [
                  "With a slash between notes: 1/3/5",
                  "With a plus sign: 1+3+5",
                  "With parentheses: (1 3 5)",
                  "With a dot: 1.3.5"
                ],
                answer: 2
              }
            ]
          },
          expGain: 35
        }
      }
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

  // Handle back to lessons navigation
  const handleBackToLessons = () => {
    setCurrentLesson(null);
    setCurrentView('lessons');
  };

  // Handle completing a lesson
  const handleCompleteLesson = () => {
    if (currentLesson) {
      completeLesson(currentLesson.id, currentLesson.expGain || 20);
      // Show completion message or animation here
      setTimeout(() => {
        handleBackToLessons();
      }, 1500);
    }
  };

  // Progress bar component
  const ProgressBar = ({ value, max, className }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    return (
      <div className={`h-2 bg-gray-200 rounded-full ${className}`}>
        <div
          className="h-full bg-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  // Render a lesson quiz
  const renderQuiz = (quiz) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState(0);
    
    const handleAnswerSelect = (answerIndex) => {
      setSelectedAnswer(answerIndex);
      const correct = answerIndex === quiz[currentQuestion].answer;
      setIsCorrect(correct);
      
      if (correct) {
        setScore(prev => prev + 1);
      }
      
      // Move to next question after a delay
      setTimeout(() => {
        if (currentQuestion < quiz.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setSelectedAnswer(null);
          setIsCorrect(null);
        } else {
          setQuizCompleted(true);
        }
      }, 1000);
    };
    
    if (quizCompleted) {
      const passed = score / quiz.length >= 0.7; // 70% or better to pass
      
      return (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Quiz Completed!</h3>
          <p className="mb-2">Your score: {score} / {quiz.length}</p>
          <ProgressBar value={score} max={quiz.length} className="mb-4" />
          
          {passed ? (
            <div className="text-green-600 flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5" />
              <span>You passed! Great job!</span>
            </div>
          ) : (
            <div className="text-yellow-600 mb-4">
              <p>You need 70% to pass. Try reviewing the lesson and taking the quiz again.</p>
            </div>
          )}
          
          {passed && (
            <button
              onClick={handleCompleteLesson}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Complete Lesson
            </button>
          )}
        </div>
      );
    }
    
    const question = quiz[currentQuestion];
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Quiz</h3>
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {quiz.length}
          </span>
        </div>
        
        <ProgressBar value={currentQuestion} max={quiz.length - 1} className="mb-4" />
        
        <p className="text-lg mb-4">{question.question}</p>
        
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedAnswer === index
                  ? isCorrect
                    ? 'bg-green-100 border-green-500 border'
                    : 'bg-red-100 border-red-500 border'
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Render level selection
  const renderLevelSelection = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <KawaiiCompanions level={progress.currentLevel} mood="happy" />
            <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
              {progress.currentLevel}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-1">Your Progress</h2>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">
                Level {progress.currentLevel} Harpika Player
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {progress.experience} XP • {progress.completedLessons.length} lessons completed
            </p>
            <ProgressBar 
              value={progress.experience % 100} 
              max={100} 
              className="w-full"
            />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2">Learning Path</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(levels).map(([levelNum, level]) => {
          const totalLessons = Object.keys(level.lessons).length;
          const completedCount = Object.keys(level.lessons).filter(lessonId => 
            isLessonCompleted(level.lessons[lessonId].id)
          ).length;
          
          return (
            <button
              key={levelNum}
              onClick={() => handleLevelSelect(Number(levelNum))}
              className={`p-6 rounded-xl text-left transition-all bg-white hover:bg-purple-50 relative ${
                Number(levelNum) > progress.currentLevel + 1 ? 'opacity-50' : ''
              }`}
            >
              <div className={`absolute top-0 left-0 w-2 h-full ${level.color} rounded-l-xl`}></div>
              <div className="flex justify-between items-start pl-2">
                <h3 className="text-lg font-bold">{level.title}</h3>
                <div className="flex items-center">
                  {level.icon}
                  {Number(levelNum) > progress.currentLevel + 1 && (
                    <LockClosed className="w-4 h-4 text-gray-400 ml-2" />
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2 pl-2">{level.description}</p>
              <div className="mt-4 pl-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">
                    {completedCount} of {totalLessons} completed
                  </span>
                  <span className="text-sm font-medium">
                    {Math.round((completedCount / totalLessons) * 100)}%
                  </span>
                </div>
                <ProgressBar 
                  value={completedCount} 
                  max={totalLessons} 
                  className="w-full" 
                />
              </div>
            </button>
          );
        })}
      </div>
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
        
        <div className="space-y-4">
          {Object.values(levelData.lessons).map((lesson) => {
            const isCompleted = isLessonCompleted(lesson.id);
            const isUnlocked = isLessonUnlocked(lesson.id, currentLevel);
            
            return (
              <button
                key={lesson.id}
                onClick={() => isUnlocked && handleLessonSelect(lesson)}
                disabled={!isUnlocked}
                className={`p-4 rounded-lg text-left transition-all w-full ${
                  isUnlocked 
                    ? isCompleted
                      ? 'bg-green-50 hover:bg-green-100 border border-green-200'
                      : 'bg-white hover:bg-purple-50 border border-gray-200'
                    : 'bg-gray-100 cursor-not-allowed border border-gray-200 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">{lesson.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {lesson.description}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {isCompleted ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-xs font-medium">Completed</span>
                      </div>
                    ) : isUnlocked ? (
                      <ArrowRight className="w-5 h-5 text-purple-400" />
                    ) : (
                      <LockClosed className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
                {isUnlocked && !isCompleted && (
                  <div className="mt-2 text-xs flex justify-between items-center">
                    <div className="flex items-center gap-1 text-purple-600">
                      <Play className="w-3 h-3" />
                      <span>Start Lesson</span>
                    </div>
                    <div className="text-gray-500">
                      +{lesson.expGain || 20} XP
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Render lesson content
  const renderLessonContent = () => {
    if (!currentLesson) return null;
    
    const isCompleted = isLessonCompleted(currentLesson.id);
    const { content } = currentLesson;
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {currentLesson.title}
            {isCompleted && (
              <span className="text-sm ml-2 text-green-600 font-normal">
                (Completed)
              </span>
            )}
          </h2>
          <button
            onClick={handleBackToLessons}
            className="text-purple-600 hover:text-purple-700"
          >
            Back to Lessons
          </button>
        </div>
        
        <div className="space-y-8">
          {content.sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-purple-900">
                {section.title}
              </h3>
              
              <p className="mb-4">{section.text}</p>
              
              {section.image && (
                <img 
                  src={section.image} 
                  alt={section.title} 
                  className="mb-4 rounded-lg max-w-full" 
                />
              )}
              
              {section.tabs && (
                <div className="font-mono bg-purple-50 p-4 rounded my-4">
                  {section.tabs.map((tab, i) => (
                    <div key={i} className="mb-1">{tab}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {content.quiz && content.quiz.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Test Your Knowledge</h3>
              {renderQuiz(content.quiz)}
            </div>
          )}
          
          {(!content.quiz || content.quiz.length === 0) && !isCompleted && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleCompleteLesson}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Complete Lesson
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-8">
      {currentView === 'levels' && renderLevelSelection()}
      {currentView === 'lessons' && renderLessonSelection()}
      {currentView === 'practice' && renderLessonContent()}
    </div>
  );
};

export default NewLearningHub;
