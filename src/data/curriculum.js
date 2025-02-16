const curriculum = {
 levels: {
   1: {
     title: "Getting Started",
     description: "Learn to read and play basic harpika tabs",
     unlockRequirement: null,
     lessons: [
       {
         id: "1-1",
         title: "Understanding Your Strings",
         type: "identification",
         description: "Learn to identify your first notes",
         content: {
           questions: [
             {
               question: "Which string is this?",
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
               stringHighlight: "G4",
               choices: [
                 { label: "G4 (5)", correct: true },
                 { label: "A4 (6)", correct: false },
                 { label: "B4 (7)", correct: false },
                 { label: "F4 (4)", correct: false }
               ]
             }
           ]
         }
       },
       {
         id: "1-2",
         title: "First Scale",
         type: "practice",
         description: "Play your first sequence of notes",
         content: {
           tab: [
             "1  2  3  4  5  6  7",
             "Practice slowly and clearly"
           ],
           tempo: 60,
           requiresAudio: true
         }
       }
     ]
   },
   2: {
     title: "One-Dot Notes",
     description: "Learn notes with one dot",
     unlockRequirement: "level-1",
     lessons: [
       {
         id: "2-1",
         title: "Understanding Dots",
         type: "identification",
         content: {
           questions: [
             {
               question: "Which is a one-dot note?",
               choices: [
                 { label: "C5 (1°)", correct: true },
                 { label: "C4 (1)", correct: false },
                 { label: "C6 (1°°)", correct: false },
                 { label: "G4 (5)", correct: false }
               ]
             }
           ]
         }
       },
       {
         id: "2-2",
         title: "Simple Folk Song",
         type: "practice",
         description: "A gentle folk melody using basic notes",
         content: {
           tab: [
             "5  3  1  3  5  5  5",
             "3  3  3  5  3  1"
           ],
           tempo: 60
         }
       }
     ]
   },
   3: {
     title: "Double Dots & Chords",
     description: "Learn highest notes and playing multiple notes together",
     unlockRequirement: "level-2",
     lessons: [
       {
         id: "3-1",
         title: "Two-Dot Notes",
         type: "practice",
         content: {
           tab: [
             "1  1°  1°°",
             "Practice ascending and descending"
           ]
         }
       },
       {
         id: "3-2",
         title: "First Chords",
         type: "practice",
         description: "Learn to play notes together",
         content: {
           tab: [
             "(1 3 5)  1  3  5",
             "(1° 3° 5°)  1°  3°  5°"
           ]
         }
       }
     ]
   },
   4: {
     title: "Simple Songs",
     description: "Start playing complete melodies",
     unlockRequirement: "level-3",
     lessons: [
       {
         id: "4-1",
         title: "Peaceful Waters (Simple Version)",
         type: "practice",
         content: {
           tab: [
             "5  3°  1°  5",
             "3  1°  6  3",
             "1  6  5  3",
             "(1 3 5)"
           ]
         }
       },
       {
         id: "4-2",
         title: "Evening Star",
         type: "practice",
         content: {
           tab: [
             "7°  5°  3°  1°",
             "6  (1° 3°)  5",
             "3  (1 3)  1"
           ]
         }
       }
     ]
   },
   5: {
     title: "Skyrim Beginnings",
     description: "Simple versions of Skyrim melodies",
     unlockRequirement: "level-4",
     lessons: [
       {
         id: "5-1",
         title: "Secunda (Simple Version)",
         type: "practice",
         content: {
           tab: [
             "5°  3°  1°  6",
             "5  3  1  3",
             "5  (3° 5°)  (1° 3°)  1°"
           ]
         }
       },
       {
         id: "5-2",
         title: "Streets of Whiterun (Basic Pattern)",
         type: "practice",
         content: {
           tab: [
             "1°  6  5  3",
             "(1 3 5)  5  3  1",
             "1°  7  6  5",
             "(3° 5°)  1°"
           ]
         }
       }
     ]
   },
   6: {
     title: "Advanced Techniques",
     description: "Complex patterns and full songs",
     unlockRequirement: "level-5",
     lessons: [
       {
         id: "6-1",
         title: "Quick Patterns",
         type: "practice",
         content: {
           tab: [
             "(1° 3° 5°)  7°  6°  (5° 2°)",
             "3°  (2° 5)  (1° 3)  1"
           ]
         }
       },
       {
         id: "6-2",
         title: "Ancient Stones (Simplified)",
         type: "practice",
         content: {
           tab: [
             "(1°° 3°° 5°)  7°  5°  3°",
             "(1° 3° 5°)  7  5  3",
             "(1 3 5)  1°  7  5"
           ]
         }
       }
     ]
   }
 }
};

export default curriculum;
