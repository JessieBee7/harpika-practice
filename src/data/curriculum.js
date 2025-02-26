const curriculum = {
  levels: {
    1: {
      title: "Getting Started",
      description: "Learn to read and play basic harpika tabs",
      unlockRequirement: null, // First level is always unlocked
      forceUnlock: true,
      lessons: [
        {
          id: "1-1",
          title: "Understanding Your Strings",
          type: "identification",
          verified: true,
          description: "Learn to identify your first notes",
          content: {
            tab: [
              "1  2  3  4  5",
              "Practice each note slowly"
            ]
          }
        },
        {
          id: "1-2",
          title: "First Scale",
          type: "practice",
          verified: true,
          description: "Play your first sequence",
          content: {
            tab: [
              "1  2  3  4  5  6  7",
              "Play each note clearly"
            ]
          }
        }
      ]
    },
    2: {
      title: "One-Dot Notes",
      description: "Learn notes with one dot",
      unlockRequirement: "level-1",
      forceUnlock: true,
      lessons: [
        {
          id: "2-1",
          title: "High Notes Introduction",
          type: "practice",
          verified: true,
          description: "Learn to play notes with one dot",
          content: {
            tab: [
              "1  1°  2  2°  3  3°",
              "Compare regular and dot notes"
            ]
          }
        },
        {
          id: "2-2",
          title: "Simple Melody",
          type: "practice",
          verified: true,
          description: "Combine regular and dot notes",
          content: {
            tab: [
              "1  3  5  3°  1°",
              "5  3  1  3°  5°"
            ]
          }
        }
      ]
    },
    3: {
      title: "Double Dots",
      description: "Master the highest notes",
      unlockRequirement: "level-2",
      forceUnlock: true,
      lessons: [
        {
          id: "3-1",
          title: "Double Dot Introduction",
          type: "practice",
          verified: true,
          description: "Learn to play double-dot notes",
          content: {
            tab: [
              "1  1°  1°°",
              "2  2°  2°°",
              "3  3°  3°°"
            ]
          }
        },
        {
          id: "3-2",
          title: "High Note Practice",
          type: "practice",
          verified: true,
          description: "Combine all types of notes",
          content: {
            tab: [
              "1  1°  1°°  1°  1",
              "2  2°  2°°  2°  2"
            ]
          }
        }
      ]
    },
    4: {
      title: "Basic Chords",
      description: "Learn to play multiple notes together",
      unlockRequirement: "level-3",
      forceUnlock: true,
      lessons: [
        {
          id: "4-1",
          title: "First Chords",
          type: "practice",
          verified: true,
          description: "Learn to play simple chords",
          content: {
            tab: [
              "(1 3 5)  1  3  5",
              "(1° 3° 5°)  1°  3°  5°"
            ]
          }
        },
        {
          id: "4-2",
          title: "Chord Patterns",
          type: "practice",
          verified: true,
          description: "Practice chord progressions",
          content: {
            tab: [
              "(1 3 5)  (2 4 6)",
              "(3 5 7)  (1° 3° 5°)"
            ]
          }
        }
      ]
    },
    5: {
      title: "Simple Songs",
      description: "Start playing complete melodies",
      unlockRequirement: "level-4",
      forceUnlock: true,
      lessons: [
        {
          id: "5-1",
          title: "Peaceful Melody",
          type: "practice",
          verified: true,
          description: "A gentle practice song",
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
          id: "5-2",
          title: "Evening Song",
          type: "practice",
          verified: true,
          description: "Practice with a calming tune",
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
    6: {
      title: "Advanced Techniques",
      description: "Master complex patterns",
      unlockRequirement: "level-5",
      forceUnlock: true,
      lessons: [
        {
          id: "6-1",
          title: "Quick Patterns",
          type: "practice",
          verified: true,
          description: "Practice faster note sequences",
          content: {
            tab: [
              "(1° 3° 5°)  7°  6°  (5° 2°)",
              "3°  (2° 5)  (1° 3)  1"
            ]
          }
        },
        {
          id: "6-2",
          title: "Advanced Combinations",
          type: "practice",
          verified: true,
          description: "Complex note and chord combinations",
          content: {
            tab: [
              "(1°° 3°° 5°)  7°  5°  3°",
              "(1° 3° 5°)  7  5  3",
              "(1 3 5)  1°  7  5"
            ]
          }
        }
      ]
    },
    7: {
      title: "Final Fantasy Collection",
      description: "Beloved melodies from the Final Fantasy series",
      unlockRequirement: "level-4",
      forceUnlock: true,
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
      forceUnlock: true,
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
      forceUnlock: true,
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

const tabMetadata = {
  versionHistory: [],
  lastModified: null,
  contributors: [],
  notes: ""
};

export { curriculum, tabMetadata };
