const curriculum = {
 levels: {
   1: {
     title: "Getting Started",
     description: "Learn the basics of reading harpika tabs",
     unlockRequirement: null,
     lessons: [
       {
         id: "1-1",
         title: "Your First Notes",
         type: "identification",
         description: "Learn to identify the center strings",
         content: {
           questions: [
             {
               question: "Which string is highlighted?",
               stringHighlight: "C4",
               choices: [
                 { label: "C4 (1)", correct: true },
                 { label: "D4 (2)", correct: false },
                 { label: "E4 (3)", correct: false },
                 { label: "F4 (4)", correct: false }
               ]
             },
             {
               question: "Find this note:",
               stringHighlight: "E4",
               choices: [
                 { label: "E4 (3)", correct: true },
                 { label: "G4 (5)", correct: false },
                 { label: "F4 (4)", correct: false },
                 { label: "D4 (2)", correct: false }
               ]
             }
           ]
         }
       },
       {
         id: "1-2",
         title: "Practice Simple Notes",
         type: "practice",
         description: "Play your first sequence",
         content: {
           tab: ["1", "2", "3"],
           tempo: 60,
           requiresAudio: true,
           practiceNotes: "Play each note clearly and steadily"
         }
       },
       {
         id: "1-3",
         title: "One-Dot Notes",
         type: "identification",
         description: "Learn notes with one dot",
         content: {
           questions: [
             {
               question: "Which note has one dot?",
               stringHighlight: "C5",
               choices: [
                 { label: "C5 (1°)", correct: true },
                 { label: "C4 (1)", correct: false },
                 { label: "C6 (1°°)", correct: false },
                 { label: "G4 (5)", correct: false }
               ]
             }
           ]
         }
       }
     ],
     achievement: {
       title: "First Steps",
       icon: "🎵",
       description: "You can read your first tabs!"
     }
   },
   2: {
     title: "Single Dots",
     description: "Master notes with one dot",
     unlockRequirement: "level-1",
     lessons: [
       {
         id: "2-1",
         title: "Reading One-Dot Notes",
         type: "identification",
         content: {
           questions: [
             {
               question: "Find this one-dot note:",
               stringHighlight: "G5",
               choices: [
                 { label: "G5 (5°)", correct: true },
                 { label: "G4 (5)", correct: false },
                 { label: "A5 (6°)", correct: false },
                 { label: "F5 (4°)", correct: false }
               ]
             }
           ]
         }
       },
       {
         id: "2-2",
         title: "Practice with Dots",
         type: "practice",
         content: {
           tab: ["1", "3", "5", "3°", "1°"],
           tempo: 60,
           requiresAudio: true,
           practiceNotes: "Notice how dot notes are higher pitched"
         }
       }
     ],
     achievement: {
       title: "Dot Master",
       icon: "⭐",
       description: "You've mastered single-dot notes!"
     }
   },
   3: {
     title: "Double Dots",
     description: "Learn the highest notes",
     unlockRequirement: "level-2",
     lessons: [
       {
         id: "3-1",
         title: "Double-Dot Introduction",
         type: "identification",
         content: {
           questions: [
             {
               question: "Which note has two dots?",
               stringHighlight: "D6",
               choices: [
                 { label: "D6 (2°°)", correct: true },
                 { label: "D5 (2°)", correct: false },
                 { label: "D4 (2)", correct: false },
                 { label: "E6 (3°°)", correct: false }
               ]
             }
           ]
         }
       },
       {
         id: "3-2",
         title: "High Note Practice",
         type: "practice",
         content: {
           tab: ["1", "1°", "1°°", "1°", "1"],
           tempo: 60,
           requiresAudio: true,
           practiceNotes: "Try to hear the ascending pitch"
         }
       }
     ]
   },
   4: {
     title: "Simple Chords",
     description: "Learn to read and play multiple notes together",
     unlockRequirement: "level-3",
     lessons: [
       {
         id: "4-1",
         title: "Reading Chords",
         type: "identification",
         content: {
           questions: [
             {
               question: "What does this chord notation mean?",
               display: "(1 3 5)",
               choices: [
                 { label: "Play 1, 3, and 5 together", correct: true },
                 { label: "Play 1, then 3, then 5", correct: false },
                 { label: "Play either 1, 3, or 5", correct: false },
                 { label: "Repeat 1, 3, 5 three times", correct: false }
               ]
             }
           ]
         }
       },
       {
         id: "4-2",
         title: "First Chord Practice",
         type: "practice",
         content: {
           tab: ["(1 3 5)", "1", "3", "5", "(1 3 5)"],
           tempo: 50,
           requiresAudio: true,
           practiceNotes: "Take your time with the chords"
         }
       }
     ]
   },
   5: {
     title: "Combining Skills",
     description: "Mix chords with single and dotted notes",
     unlockRequirement: "level-4",
     lessons: [
       {
         id: "5-1",
         title: "Mixed Note Reading",
         type: "identification",
         content: {
           questions: [
             {
               question: "What's this combination?",
               display: "(1° 3° 5°)",
               choices: [
                 { label: "Play 1°, 3°, and 5° together", correct: true },
                 { label: "Play 1°, then 3°, then 5°", correct: false },
                 { label: "Three different one-dot notes", correct: false },
                 { label: "A high chord", correct: false }
               ]
             }
           ]
         }
       },
       {
         id: "5-2",
         title: "Advanced Practice",
         type: "practice",
         content: {
           tab: [
             "(1 3 5)",
             "7",
             "6",
             "(5° 2°)",
             "3°",
             "(2° 5)",
             "(1° 3)",
             "1"
           ],
           tempo: 60,
           requiresAudio: true,
           practiceNotes: "Focus on clean transitions between notes and chords"
         }
       }
     ],
     achievement: {
       title: "Tab Master",
       icon: "🏆",
       description: "You can read and play complex tab patterns!"
     }
   }
 }
};

export default curriculum;
