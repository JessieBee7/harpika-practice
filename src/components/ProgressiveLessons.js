import React, { useState, useEffect } from 'react';
import { Star, Lock, Music, CheckCircle, Medal } from 'lucide-react';

const ProgressiveLessons = () => {
 const [currentLevel, setCurrentLevel] = useState(1);
 const [unlockedLevels, setUnlockedLevels] = useState([1]);
 const [currentLesson, setCurrentLesson] = useState(null);
 const [progress, setProgress] = useState({});

 // Level Structure
 const levels = {
   1: {
     title: "Understanding Your Harpika",
     lessons: [
       {
         id: "1-1",
         type: "identification",
         title: "Meet Your Strings",
         content: {
           question: "Which string is shown?",
           stringToIdentify: "center", // Points to C4 (1)
           choices: [
             { label: "C4 (1)", correct: true },
             { label: "D4 (2)", correct: false },
             { label: "E4 (3)", correct: false },
             { label: "F4 (4)", correct: false }
           ]
         }
       },
       {
         id: "1-2",
         type: "identification",
         title: "First Dots",
         content: {
           question: "Find this string:",
           stringToIdentify: "right-high", // Points to E6 (3°°)
           choices: [
             { label: "E6 (3°°)", correct: true },
             { label: "D6 (2°°)", correct: false },
             { label: "C6 (1°°)", correct: false },
             { label: "B5 (7°)", correct: false }
           ]
         }
       },
       {
         id: "1-3",
         type: "practice",
         title: "Play Your First Notes",
         content: {
           tab: ["1", "2", "3"],
           tempo: 60,
           requiresAudio: true
         }
       }
     ],
     achievement: {
       title: "Harpika Explorer",
       icon: "🎵",
       description: "You've learned to identify your first strings!"
     }
   },
   2: {
     title: "First Melodies",
     lessons: [
       {
         id: "2-1",
         type: "identification",
         title: "Single Dot Notes",
         content: {
           question: "Which note has one dot?",
           choices: [
             { label: "C5 (1°)", correct: true },
             { label: "C4 (1)", correct: false },
             { label: "C6 (1°°)", correct: false },
             { label: "B4 (7)", correct: false }
           ]
         }
       },
       {
         id: "2-2",
         type: "practice",
         title: "Simple Pattern",
         content: {
           tab: ["1", "3", "5", "3°", "1°"],
           tempo: 60,
           requiresAudio: true
         }
       }
     ],
     achievement: {
       title: "Melody Maker",
       icon: "🎼",
       description: "You can play your first melody!"
     }
   },
   3: {
     title: "Playing with Dots",
     lessons: [
       {
         id: "3-1",
         type: "identification",
         title: "Double Dots",
         content: {
           question: "Find the double-dotted note:",
           choices: [
             { label: "D6 (2°°)", correct: true },
             { label: "D5 (2°)", correct: false },
             { label: "D4 (2)", correct: false },
             { label: "B5 (7°)", correct: false }
           ]
         }
       }
     ]
   }
 };

 // Visual representation of the harpika for identification questions
 const HarpikaVisual = ({ highlightString, onStringClick }) => (
   <div className="relative w-full h-64 bg-purple-50 rounded-lg p-4">
     <svg viewBox="0 0 800 200" className="w-full h-full">
       {/* 17 strings with labels */}
       {Array.from({ length: 17 }).map((_, index) => (
         <g key={index} className="string-group">
           <line
             x1={50 + (index * 40)}
             y1="20"
             x2={50 + (index * 40)}
             y2="180"
             stroke={highlightString === index ? "#8B5CF6" : "#CBD5E0"}
             strokeWidth="2"
           />
           {/* String labels */}
           <text
             x={50 + (index * 40)}
             y="200"
             textAnchor="middle"
             className="text-xs"
             fill="#4B5563"
           >
             {getStringLabel(index)}
           </text>
         </g>
       ))}
       
       {/* Highlight arrow */}
       {highlightString !== null && (
         <path
           d="M50,100 L70,90 L70,110 Z"
           fill="#8B5CF6"
           transform={`translate(${highlightString * 40}, 0)`}
         />
       )}
     </svg>
   </div>
 );

 // Multiple choice component
 const MultipleChoice = ({ choices, onAnswer, answered }) => (
   <div className="grid grid-cols-1 gap-3 mt-4">
     {choices.map((choice, index) => (
       <button
         key={index}
         onClick={() => !answered && onAnswer(choice)}
         className={`p-4 rounded-lg text-left transition-all
           ${answered 
             ? choice.correct 
               ? 'bg-green-100 border-green-500'
               : 'bg-red-100 border-red-500'
             : 'bg-white hover:bg-purple-50 border-gray-200'
           } border-2`}
         disabled={answered}
       >
         {choice.label}
       </button>
     ))}
   </div>
 );

 // Render lesson content based on type
 const renderLesson = (lesson) => {
   switch (lesson.type) {
     case "identification":
       return (
         <div className="space-y-6">
           <h3 className="text-xl font-bold">{lesson.title}</h3>
           <p className="text-gray-600">{lesson.content.question}</p>
           <HarpikaVisual highlightString={lesson.content.stringToIdentify} />
           <MultipleChoice 
             choices={lesson.content.choices}
             onAnswer={handleAnswer}
             answered={progress[lesson.id]?.completed}
           />
         </div>
       );
     case "practice":
       return (
         <div className="space-y-6">
           <h3 className="text-xl font-bold">{lesson.title}</h3>
           <div className="font-mono bg-purple-50 p-4 rounded-lg">
             {lesson.content.tab.map((note, i) => (
               <span key={i} className="mr-4">{note}</span>
             ))}
           </div>
           {/* Practice interface with audio detection will go here */}
         </div>
       );
     default:
       return null;
   }
 };

 return (
   <div className="space-y-8">
     {/* Level Selection */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
       {Object.entries(levels).map(([level, levelData]) => (
         <button
           key={level}
           onClick={() => unlockedLevels.includes(Number(level)) && setCurrentLevel(Number(level))}
           className={`p-6 rounded-xl text-left transition-all ${
             unlockedLevels.includes(Number(level))
               ? 'bg-white hover:bg-purple-50'
               : 'bg-gray-100 cursor-not-allowed'
           }`}
         >
           <div className="flex justify-between items-start">
             <h3 className="text-lg font-bold">{levelData.title}</h3>
             {unlockedLevels.includes(Number(level)) 
               ? <Star className="w-5 h-5 text-yellow-400" />
               : <Lock className="w-5 h-5 text-gray-400" />
             }
           </div>
           <div className="mt-2 text-sm text-gray-600">
             {levelData.lessons.length} lessons
           </div>
         </button>
       ))}
     </div>

     {/* Current Lesson Display */}
     {currentLesson && (
       <div className="bg-white rounded-xl p-6 shadow-lg">
         {renderLesson(currentLesson)}
       </div>
     )}
   </div>
 );
};

export default ProgressiveLessons;
