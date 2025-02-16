import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, Edit2, CheckCircle, AlertCircle } from 'lucide-react';

const TabEditor = ({ song, onSave }) => {
 const [editedTab, setEditedTab] = useState(song.content.tab);
 const [editNotes, setEditNotes] = useState(song.editNotes || '');
 const [isEditing, setIsEditing] = useState(false);
 const [showPreview, setShowPreview] = useState(false);
 const [validationMessage, setValidationMessage] = useState('');

 // Reset if song changes
 useEffect(() => {
   setEditedTab(song.content.tab);
   setEditNotes(song.editNotes || '');
 }, [song]);

 // Validate tab notation
 const validateTab = (tab) => {
   // Check for proper notation format
   const validNotation = tab.every(line => {
     // Allow empty lines and comments
     if (line.trim() === '' || line.startsWith('//')) return true;
     
     // Check for valid note patterns
     const notePattern = /^[1-7](°{1,2})?$/;
     const chordPattern = /^\([1-7](°{1,2})?\s+[1-7](°{1,2})?\s+[1-7](°{1,2})?\)$/;
     
     const tokens = line.split(/\s+/).filter(token => token.length > 0);
     return tokens.every(token => 
       notePattern.test(token) || chordPattern.test(token)
     );
   });

   if (!validNotation) {
     setValidationMessage('Please check tab notation format');
     return false;
   }

   setValidationMessage('');
   return true;
 };

 // Handle tab changes
 const handleTabChange = (index, value) => {
   const newTab = [...editedTab];
   newTab[index] = value;
   setEditedTab(newTab);
 };

 // Handle save
 const handleSave = () => {
   if (validateTab(editedTab)) {
     onSave({
       ...song,
       content: { ...song.content, tab: editedTab },
       editNotes,
       userModified: true,
       lastModified: new Date().toISOString()
     });
     setIsEditing(false);
   }
 };

 return (
   <div className="bg-white rounded-lg shadow-lg p-6">
     <div className="flex justify-between items-center mb-4">
       <h2 className="text-xl font-bold">{song.title}</h2>
       <div className="flex gap-2">
         {!isEditing ? (
           <button
             onClick={() => setIsEditing(true)}
             className="flex items-center gap-1 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
           >
             <Edit2 className="w-4 h-4" />
             Edit Tab
           </button>
         ) : (
           <>
             <button
               onClick={() => {
                 setEditedTab(song.content.tab);
                 setIsEditing(false);
               }}
               className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
             >
               <RotateCcw className="w-4 h-4" />
               Cancel
             </button>
             <button
               onClick={handleSave}
               className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
             >
               <Save className="w-4 h-4" />
               Save Changes
             </button>
           </>
         )}
       </div>
     </div>

     {/* Verification Status */}
     <div className="flex items-center gap-2 mb-4">
       {song.verified ? (
         <div className="flex items-center gap-1 text-green-600">
           <CheckCircle className="w-4 h-4" />
           <span className="text-sm">Verified Tab</span>
         </div>
       ) : (
         <div className="flex items-center gap-1 text-yellow-600">
           <AlertCircle className="w-4 h-4" />
           <span className="text-sm">Community Tab - Needs Verification</span>
         </div>
       )}
     </div>

     {/* Tab Editor */}
     <div className="space-y-4">
       {isEditing ? (
         <>
           {editedTab.map((line, index) => (
             <input
               key={index}
               type="text"
               value={line}
               onChange={(e) => handleTabChange(index, e.target.value)}
               className="w-full p-2 font-mono border rounded focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
             />
           ))}
           <button
             onClick={() => setEditedTab([...editedTab, ''])}
             className="text-purple-600 hover:text-purple-700 text-sm"
           >
             + Add Line
           </button>
         </>
       ) : (
         <div className="font-mono bg-gray-50 p-4 rounded">
           {editedTab.map((line, index) => (
             <div key={index}>{line}</div>
           ))}
         </div>
       )}

       {/* Validation Message */}
       {validationMessage && (
         <div className="text-red-500 text-sm mt-2">
           {validationMessage}
         </div>
       )}

       {/* Edit Notes */}
       <div className="mt-4">
         <h3 className="font-medium mb-2">Notes:</h3>
         {isEditing ? (
           <textarea
             value={editNotes}
             onChange={(e) => setEditNotes(e.target.value)}
             className="w-full p-2 border rounded h-24 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
             placeholder="Add any notes about your modifications..."
           />
         ) : (
           editNotes && (
             <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
               {editNotes}
             </div>
           )
         )}
       </div>

       {/* Preview Button */}
       {isEditing && (
         <button
           onClick={() => setShowPreview(!showPreview)}
           className="mt-4 text-purple-600 hover:text-purple-700"
         >
           {showPreview ? 'Hide Preview' : 'Show Preview'}
         </button>
       )}
     </div>
   </div>
 );
};

export default TabEditor;
