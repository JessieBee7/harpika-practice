import React, { useState, useEffect } from 'react';
import PracticeSession from './PracticeSession';
import { curriculum, tabMetadata } from '../data/curriculum';
import { BookOpen, Star, ArrowRight, Lock, Edit2 } from 'lucide-react';

const LearningHub = () => {
 const [currentLevel, setCurrentLevel] = useState(1);
 const [currentLesson, setCurrentLesson] = useState(null);
 const [userProgress, setUserProgress] = useState({
   levels: { 1: { unlocked: true } },
   lessons: {},
   achievements: []
 });
 const [modifiedSongs, setModifiedSongs] = useState({});

 // Load saved progress and modifications
 useEffect(() => {
   const savedProgress = localStorage.getItem('harpikaProgress');
   const savedModifications = localStorage.getItem('harpikaSongModifications');
   if (savedProgress) {
     setUserProgress(JSON.parse(savedProgress));
   }
   if (savedModifications) {
     setModifiedSongs(JSON.parse(savedModifications));
   }
 }, []);

 // Handle song modifications
 const handleSongUpdate = (updatedSong) => {
   const newModifications = {
     ...modifiedSongs,
     [updatedSong.id]: {
       ...updatedSong,
       lastModified: new Date().toISOString(),
       userModified: true
     }
   };
   setModifiedSongs(newModifications);
   localStorage.setItem('harpikaSongModifications', JSON.stringify(newModifications));
 };

 // Get song with any user modifications
 const getSongWithModifications = (song) => {
   return modifiedSongs[song.id] || song;
 };

 // Render level selection
 const renderLevelSelection = () => (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
     {Object.entries(curriculum.levels).map(([levelNum, level]) => (
       <button
         key={levelNum}
         onClick={() => handleLevelSelect(Number(levelNum))}
         className={`p-6 rounded-xl text-left transition-all ${
           isLevelUnlocked(Number(levelNum))
             ? 'bg-white hover:bg-purple-50'
             : 'bg-gray-100 cursor-not-allowed'
         }`}
         disabled={!isLevelUnlocked(Number(levelNum))}
       >
         <div className="flex justify-between items-start">
           <h3 className="text-lg font-bold">{level.title}</h3>
           {isLevelUnlocked(Number(levelNum)) 
             ? <Star className="w-5 h-5 text-yellow-400" />
             : <Lock className="w-5 h-5 text-gray-400" />
           }
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

 // Render lesson selection with modification indicators
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
         {currentLevelData.lessons.map((lesson) => {
           const modifiedLesson = getSongWithModifications(lesson);
           return (
             <button
               key={lesson.id}
               onClick={() => handleLessonSelect(modifiedLesson)}
               className={`p-4 rounded-lg text-left transition-all ${
                 isLessonCompleted(lesson.id)
                   ? 'bg-green-50 hover:bg-green-100'
                   : 'bg-white hover:bg-purple-50'
               }`}
             >
               <div className="flex items-center justify-between">
                 <div>
                   <div className="flex items-center gap-2">
                     <h3 className="font-bold">{lesson.title}</h3>
                     {modifiedLesson.userModified && (
                       <Edit2 className="w-4 h-4 text-purple-500" />
                     )}
                   </div>
                   <p className="text-sm text-gray-600 mt-1">
                     {lesson.description}
                   </p>
                   {modifiedLesson.userModified && (
                     <p className="text-xs text-purple-600 mt-1">
                       Modified: {new Date(modifiedLesson.lastModified).toLocaleDateString()}
                     </p>
                   )}
                 </div>
                 {isLessonCompleted(lesson.id) ? (
                   <Star className="w-5 h-5 text-yellow-400" />
                 ) : (
                   <ArrowRight className="w-5 h-5 text-purple-400" />
                 )}
               </div>
             </button>
           );
         })}
       </div>
     </div>
   );
 };

 return (
   <div className="space-y-8">
     {!currentLesson && !currentLevel && renderLevelSelection()}
     {!currentLesson && currentLevel && renderLessonSelection()}
     {currentLesson && (
       <PracticeSession
         lessonData={currentLesson}
         onProgress={handleProgress}
         onSongUpdate={handleSongUpdate}
         currentLevel={currentLevel}
       />
     )}
   </div>
 );
};

export default LearningHub;
