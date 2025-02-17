import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Edit } from 'lucide-react';
import AudioDetector from './AudioDetector';
import TabEditor from './TabEditor';

const Practice = ({ song, onComplete, onSongUpdate }) => {
 const [isPlaying, setIsPlaying] = useState(false);
 const [tempo, setTempo] = useState(60);
 const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
 const [feedback, setFeedback] = useState(null);
 const [isListening, setIsListening] = useState(false);
 const [showEditor, setShowEditor] = useState(false);

 // Handle song update from editor
 const handleSongEdit = (updatedSong) => {
   onSongUpdate(updatedSong);
   setShowEditor(false);
 };

 return (
   <div className="space-y-6 p-6 bg-white rounded-xl shadow-lg">
     <div className="flex justify-between items-center">
       <h2 className="text-xl font-bold">{song?.title || 'Practice'}</h2>
       <div className="flex items-center gap-4">
         {/* Tempo control */}
         <div className="flex items-center gap-2">
           <span className="text-sm">Tempo:</span>
           <input
             type="range"
             min="40"
             max="120"
             value={tempo}
             onChange={(e) => setTempo(Number(e.target.value))}
             className="w-32"
           />
           <span className="text-sm w-12">{tempo} BPM</span>
         </div>
         
         {/* Edit button */}
         <button
           onClick={() => setShowEditor(!showEditor)}
           className="p-2 rounded-full bg-purple-100 hover:bg-purple-200"
         >
           <Edit className="w-5 h-5 text-purple-700" />
         </button>

         {/* Play/Stop button */}
         <button
           onClick={() => setIsListening(!isListening)}
           className={`p-3 rounded-full ${
             isListening ? 'bg-red-100' : 'bg-green-100'
           }`}
         >
           {isListening ? 
             <Pause className="w-6 h-6" /> : 
             <Play className="w-6 h-6" />
           }
         </button>
       </div>
     </div>

     {/* Tab Editor */}
     {showEditor && (
       <div className="mt-4">
         <TabEditor 
           song={song}
           onSave={handleSongEdit}
         />
       </div>
     )}

     {/* Practice Interface (show when not editing) */}
     {!showEditor && (
       <>
         {/* Tab display */}
         <div className="font-mono text-lg bg-purple-50 p-4 rounded-lg overflow-x-auto whitespace-nowrap">
           {song?.content.tab.map((line, index) => (
             <div key={index} className="mb-1">
               {line}
             </div>
           ))}
         </div>

         {/* Current note display */}
         <div className="text-center p-4 bg-purple-50 rounded-lg">
           <div className="text-sm text-gray-600">Current Note</div>
           <div className="text-3xl font-bold text-purple-700">
             {song?.content.tab[currentNoteIndex]}
           </div>
         </div>

         {/* Audio detector */}
         <AudioDetector 
           isListening={isListening}
           onNoteDetected={handleNoteDetected}
         />

         {/* Feedback display */}
         {feedback && (
           <div className={`p-4 rounded-lg text-center ${
             feedback.type === 'success' 
               ? 'bg-green-100 text-green-700'
               : 'bg-red-100 text-red-700'
           }`}>
             {feedback.message}
           </div>
         )}

         {/* Practice tips */}
         <div className="mt-6">
           <h3 className="font-medium mb-2">Tips:</h3>
           <ul className="text-sm text-gray-600 space-y-1">
             <li>• Play at a comfortable tempo</li>
             <li>• Focus on accuracy before speed</li>
             <li>• Make sure each note is clear</li>
             <li>• Watch for dots in the notation</li>
           </ul>
         </div>
       </>
     )}
   </div>
 );
};

export default Practice;
