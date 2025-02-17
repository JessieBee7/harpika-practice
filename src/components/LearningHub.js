import React, { useState, useEffect } from 'react';
import PracticeSession from './PracticeSession';
import { curriculum } from '../data/curriculum';
import StorageUtils from '../utils/storage';
import { BookOpen, Star, ArrowRight, Lock, Edit2, Download, Upload, RefreshCw } from 'lucide-react';

const LearningHub = () => {
 const [currentLevel, setCurrentLevel] = useState(1);
 const [currentLesson, setCurrentLesson] = useState(null);
 const [userProgress, setUserProgress] = useState({
   levels: { 1: { unlocked: true } },
   lessons: {},
   achievements: []
 });
 const [modifiedSongs, setModifiedSongs] = useState({});
 const [showDataControls, setShowDataControls] = useState(false);

 // Load saved data on mount
 useEffect(() => {
   const loadSavedData = () => {
     const savedProgress = StorageUtils.loadProgress();
     const savedModifications = StorageUtils.loadModifications();
     
     if (savedProgress) {
       setUserProgress(savedProgress);
     }
     if (savedModifications) {
       setModifiedSongs(savedModifications);
     }
   };

   loadSavedData();
 }, []);

 // Handle song update
 const handleSongUpdate = (updatedSong) => {
   StorageUtils.saveSongModification(updatedSong.id, updatedSong);
   setModifiedSongs(StorageUtils.loadModifications());
 };

 // Handle progress update
 const handleProgress = (progressData) => {
   const newProgress = {
     ...userProgress,
     lessons: {
       ...userProgress.lessons,
       [progressData.lessonId]: {
         completed: true,
         lastPracticed: new Date().toISOString()
       }
     }
   };

   if (progressData.levelCompleted) {
     newProgress.levels[progressData.level + 1] = { unlocked: true };
   }

   StorageUtils.saveProgress(newProgress);
   setUserProgress(newProgress);
 };

 // Handle data import
 const handleImport = async (event) => {
   const file = event.target.files[0];
   if (file) {
     const success = await StorageUtils.importUserData(file);
     if (success) {
       // Reload data after import
       setUserProgress(StorageUtils.loadProgress());
       setModifiedSongs(StorageUtils.loadModifications());
     }
   }
 };

 // Handle data export
 const handleExport = () => {
   StorageUtils.exportUserData();
 };

 // Handle data reset
 const handleReset = () => {
   if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
     StorageUtils.clearAllData();
     setUserProgress({
       levels: { 1: { unlocked: true } },
       lessons: {},
       achievements: []
     });
     setModifiedSongs({});
   }
 };

 // Add Data Controls UI
 const DataControls = () => (
   <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
     <div className="flex items-center justify-between mb-4">
       <h3 className="font-bold">Data Management</h3>
       <button
         onClick={() => setShowDataControls(false)}
         className="text-gray-500 hover:text-gray-700"
       >
         Close
       </button>
     </div>
     <div className="flex gap-4">
       <button
         onClick={handleExport}
         className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
       >
         <Download className="w-4 h-4" />
         Export Data
       </button>
       <label className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 cursor-pointer">
         <Upload className="w-4 h-4" />
         Import Data
         <input
           type="file"
           accept=".json"
           onChange={handleImport}
           className="hidden"
         />
       </label>
       <button
         onClick={handleReset}
         className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
       >
         <RefreshCw className="w-4 h-4" />
         Reset Progress
       </button>
     </div>
   </div>
 );

 // Rest of your existing render code...

 return (
   <div className="space-y-8">
     <div className="flex justify-end">
       <button
         onClick={() => setShowDataControls(!showDataControls)}
         className="text-purple-600 hover:text-purple-700"
       >
         Manage Data
       </button>
     </div>

     {showDataControls && <DataControls />}

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
