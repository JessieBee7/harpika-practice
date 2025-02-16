import React, { useState, useEffect } from 'react';
import Practice from './Practice';
import KawaiiCompanions from './KawaiiCompanions';
import { Star, Medal } from 'lucide-react';

const PracticeSession = ({ lessonData, onProgress, currentLevel }) => {
 const [practiceState, setPracticeState] = useState('ready'); // ready, practicing, success, completed
 const [characterMood, setCharacterMood] = useState('happy');
 const [encouragement, setEncouragement] = useState(null);
 const [achievements, setAchievements] = useState([]);

 // Character reactions based on practice events
 const characterReactions = {
   correctNote: [
     "That's it! Keep going! 🎵",
     "Beautiful note! ✨",
     "You're getting it! 🌟",
     "Perfect! Next note! 🎼"
   ],
   streak: [
     "Amazing streak! 🎵✨",
     "You're on fire! 🔥",
     "Keep that rhythm going! 🎼"
   ],
   completion: [
     "You did it! 🎉",
     "What a performance! 🌟",
     "That was beautiful! ✨"
   ]
 };

 // Handle note detection success
 const handleNoteSuccess = () => {
   // Choose random encouragement
   const messages = characterReactions.correctNote;
   const randomMessage = messages[Math.floor(Math.random() * messages.length)];
   setEncouragement(randomMessage);
   setCharacterMood('excited');

   // Reset character mood after a delay
   setTimeout(() => {
     setCharacterMood('happy');
     setEncouragement(null);
   }, 2000);
 };

 // Handle practice completion
 const handlePracticeComplete = () => {
   setPracticeState('completed');
   setCharacterMood('excited');
   const message = characterReactions.completion[
     Math.floor(Math.random() * characterReactions.completion.length)
   ];
   setEncouragement(message);

   // Update progress
   onProgress({
     lessonCompleted: true,
     levelProgress: currentLevel
   });
 };

 return (
   <div className="space-y-6">
     {/* Character Display */}
     <div className="relative">
       <KawaiiCompanions 
         mood={characterMood}
         level={currentLevel}
       />
       
       {/* Encouragement Bubble */}
       {encouragement && (
         <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4
                       bg-white rounded-xl p-4 shadow-lg animate-bounce">
           <p className="text-lg">{encouragement}</p>
         </div>
       )}
     </div>

     {/* Practice Interface */}
     <Practice
       song={lessonData.content}
       onNoteSuccess={handleNoteSuccess}
       onComplete={handlePracticeComplete}
     />

     {/* Achievement Display */}
     {achievements.length > 0 && (
       <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
         <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
           <Medal className="w-5 h-5 text-yellow-500" />
           Achievements
         </h3>
         <div className="space-y-2">
           {achievements.map((achievement, index) => (
             <div key={index} className="flex items-center gap-2">
               <Star className="w-4 h-4 text-yellow-500" />
               <span>{achievement}</span>
             </div>
           ))}
         </div>
       </div>
     )}

     {/* Progress Status */}
     <div className="text-center text-sm text-gray-600">
       {practiceState === 'ready' && "Ready to practice!"}
       {practiceState === 'practicing' && "Keep going, you're doing great!"}
       {practiceState === 'completed' && (
         <div className="bg-green-50 p-4 rounded-lg">
           <p className="text-green-700 font-bold">Lesson Completed! 🎉</p>
           <p className="mt-2">Ready for the next challenge?</p>
         </div>
       )}
     </div>
   </div>
 );
};

export default PracticeSession;
