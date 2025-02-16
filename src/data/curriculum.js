const curriculum = {
 levels: {
   // Previous levels remain the same...
   7: {
     title: "Final Fantasy Collection",
     description: "Beloved melodies from the Final Fantasy series",
     unlockRequirement: "level-4",
     lessons: [
       {
         id: "ff-1",
         title: "Aerith's Theme (Simple Version)",
         type: "practice",
         verified: true,
         source: "Official Piano Collections",
         userModified: false,
         editNotes: "",
         content: {
           tab: [
             "7°  5°  3°  1°",
             "(1° 3° 5°)  3°  1°",
             "7  (1° 3°)  7  5"
           ]
         }
       },
       {
         id: "ff-2",
         title: "To Zanarkand",
         type: "practice",
         verified: false,
         source: "Community Arrangement",
         userModified: false,
         editNotes: "Needs verification - placeholder tab",
         content: {
           tab: [
             "// Placeholder tab - needs verification",
             "5°  3°  1°  6",
             "5  3  1  3"
           ]
         }
       }
     ]
   },
   8: {
     title: "The Witcher Series",
     description: "Songs from The Witcher",
     unlockRequirement: "level-4",
     lessons: [
       {
         id: "witcher-1",
         title: "Toss a Coin to Your Witcher (Simple Version)",
         type: "practice",
         verified: true,
         source: "Official Sheet Music",
         userModified: false,
         editNotes: "",
         content: {
           tab: [
             "5  3°  1°  5",
             "(1° 3° 5°)  3°  1°",
             "7  5  3  1"
           ]
         }
       },
       {
         id: "witcher-2",
         title: "Burn Butcher Burn",
         type: "practice",
         verified: false,
         source: "Pending Community Tab",
         userModified: false,
         editNotes: "Needs verified tab notation",
         content: {
           tab: [
             "// Placeholder - awaiting verified tab",
             "// Will be updated when verified"
           ]
         }
       }
     ]
   },
   9: {
     title: "Seasonal Songs",
     description: "Holiday favorites",
     unlockRequirement: "level-3",
     lessons: [
       {
         id: "christmas-1",
         title: "Silent Night",
         type: "practice",
         verified: true,
         source: "Traditional Arrangement",
         userModified: false,
         editNotes: "",
         content: {
           tab: [
             "5  5  1°",
             "7  7  3°",
             "(5 1° 3°)  (3 5 7)"
           ]
         }
       },
       {
         id: "halloween-1",
         title: "This Is Halloween (Simple Version)",
         type: "practice",
         verified: false,
         source: "Community Arrangement",
         userModified: false,
         editNotes: "Simple version - can be modified for complexity",
         content: {
           tab: [
             "5  5  5  3",
             "1  1  1  6",
             "(5 7 2°)  (1 3 5)"
           ]
         }
       }
     ]
   }
 }
};

// Add metadata for tab editing
const tabMetadata = {
 versionHistory: [], // Track changes
 lastModified: null,
 contributors: [],
 notes: ""
};

export { curriculum, tabMetadata };
