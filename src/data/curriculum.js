const curriculum = {
  levels: {
    1: {
      title: "Getting Started",
      description: "Learn to read and play basic harpika tabs",
      unlockRequirement: null, // First level is always unlocked
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
    // Your existing levels 7-9 remain the same here
    7: {
      // Your Final Fantasy Collection level...
    },
    8: {
      // Your Witcher Series level...
    },
    9: {
      // Your Seasonal Songs level...
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
