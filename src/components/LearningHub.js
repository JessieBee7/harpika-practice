import React, { useState } from 'react';
import { BookOpen, Music, ChevronRight, Star } from 'lucide-react';
import KawaiiCompanions from './KawaiiCompanions';

const LearningHub = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  
  // Learning levels structure
  const levels = [
    {
      id: 1,
      title: "Absolute Basics",
      description: "Learn your first notes and proper finger positioning",
      color: "bg-green-100",
      icon: <BookOpen className="w-5 h-5 text-green-600" />,
      lessons: [
        {
          id: "1-1",
          title: "Getting Started",
          description: "Introduction to the harpika and basic positioning",
          content: (
            <div className="space-y-4">
              <p>Welcome to your harpika journey! In this lesson, you'll learn how to hold your instrument and play your first notes.</p>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Proper Position</h4>
                <p>Hold your harpika upright with the longest strings facing away from you. Rest it comfortably on your lap or use a stand if you have one.</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Your First Notes</h4>
                <p>The middle strings (1, 3, 5) form a basic C major chord. Try plucking each string gently with your fingertips.</p>
                <div className="font-mono bg-white p-2 mt-2 rounded">
                  <div>1 - C4</div>
                  <div>3 - E4</div>
                  <div>5 - G4</div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Practice Exercise</h4>
                <p>Play each note individually, then try playing them together as a chord.</p>
                <div className="font-mono bg-white p-2 mt-2 rounded">
                  <div>1 3 5</div>
                  <div>(1 3 5)</div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: "1-2",
          title: "Basic Notation",
          description: "Understanding harpika tab notation",
          content: (
            <div className="space-y-4">
              <p>Harpika uses a simple number system for notation. Let's learn how to read it.</p>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Understanding Numbers</h4>
                <p>Each string is numbered 1-7. The middle octave has no special marking.</p>
                <div className="font-mono bg-white p-2 mt-2 rounded">
                  <div>1 2 3 4 5 6 7</div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Octaves</h4>
                <p>Higher octaves use dots: ° for one octave up, °° for two octaves up.</p>
                <div className="font-mono bg-white p-2 mt-2 rounded">
                  <div>Middle: 1 3 5</div>
                  <div>Higher: 1° 3° 5°</div>
                  <div>Highest: 1°° 3°°</div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Chords</h4>
                <p>Notes in parentheses are played together as a chord.</p>
                <div className="font-mono bg-white p-2 mt-2 rounded">
                  <div>(1 3 5) - C major chord</div>
                  <div>(1 3 6) - A minor chord</div>
                </div>
              </div>
            </div>
          )
        }
      ],
      recommendedSongs: [
        { title: "Simple Scale Exercise", category: "Exercises" },
        { title: "Twinkle Twinkle Little Star (Simple)", category: "Beginner" }
      ]
    },
    {
      id: 2,
      title: "Beginning Techniques",
      description: "Learn simple scales and basic rhythms",
      color: "bg-blue-100",
      icon: <Music className="w-5 h-5 text-blue-600" />,
      lessons: [
        {
          id: "2-1",
          title: "Basic Scales",
          description: "Learn to play simple scales on your harpika",
          content: (
            <div className="space-y-4">
              <p>Scales are the building blocks of music. Let's learn the C major scale.</p>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">C Major Scale</h4>
                <p>Play these notes in sequence, using a steady rhythm:</p>
                <div className="font-mono bg-white p-2 mt-2 rounded">
                  <div>1 2 3 4 5 6 7 1°</div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Finger Technique</h4>
                <p>Use the pads of your fingers, not your fingernails. Keep your movements smooth and even.</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Practice Pattern</h4>
                <p>Try playing up and down the scale with a steady rhythm:</p>
                <div className="font-mono bg-white p-2 mt-2 rounded">
                  <div>1 2 3 4 5 6 7 1°</div>
                  <div>1° 7 6 5 4 3 2 1</div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: "2-2",
          title: "Basic Rhythms",
          description: "Introduction to rhythm patterns",
          content: (
            <div className="space-y-4">
              <p>Rhythm gives music its pulse and movement. Let's explore basic rhythm patterns.</p>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Quarter Notes</h4>
                <p>Play each note evenly, counting "1, 2, 3, 4"</p>
                <div className="font-mono bg-white p-2 mt-2 rounded">
                  <div>1 3 5 1°</div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Eighth Notes</h4>
                <p>Play twice as fast, counting "1 and 2 and 3 and 4 and"</p>
                <div className="font-mono bg-white p-2 mt-2 rounded">
                  <div>1 3 5 1° 5 3 1 3</div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Mixed Rhythms</h4>
                <p>Try combining quarter and eighth notes:</p>
                <div className="font-mono bg-white p-2 mt-2 rounded">
                  <div>1 3 5 5 1° 1° 5 3</div>
                </div>
              </div>
            </div>
          )
        }
      ],
      recommendedSongs: [
        { title: "C Major Scale Practice", category: "Exercises" },
        { title: "Mary Had a Little Lamb", category: "Beginner" }
      ]
    },
    {
      id: 3,
      title: "Early Intermediate",
      description: "Basic chords and simple songs",
      color: "bg-purple-100",
      icon: <Music className="w-5 h-5 text-purple-600" />,
      lessons: [
        {
          id: "3-1",
          title: "Basic Chords",
          description: "Learn fundamental chord patterns",
          content: (
            <div className="space-y-4">
              <p>Chords add harmony and richness to your playing. Let's learn some basic chords.</p>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Major Chords</h4>
                <p>Major chords have a bright, happy sound.</p>
                <div className="font-mono bg-white p-2 mt-2 rounded">
                  <div>C Major: (1 3 5)</div>
                  <div>F Major: (4 6 1°)</div>
                  <div>G Major: (5 7 2°)</div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Minor Chords</h4>
                <p>Minor chords have a more melancholy sound.</p>
                <div className="font-mono bg-white p-2 mt-2 rounded">
                  <div>A Minor: (6 1° 3°)</div>
                  <div>E Minor: (3 5 7)</div>
                  <div>D Minor: (2 4 6)</div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Chord Progressions</h4>
                <p>Try playing these chords in sequence:</p>
                <div className="font-mono bg-white p-2 mt-2 rounded">
                  <div>C - G - Am - F</div>
                  <div>(1 3 5) (5 7 2°) (6 1° 3°) (4 6 1°)</div>
                </div>
              </div>
            </div>
          )
        }
      ],
      recommendedSongs: [
        { title: "Ode to Joy (Simple)", category: "Classical" },
        { title: "Amazing Grace", category: "Folk" }
      ]
    },
    {
      id: 4,
      title: "Intermediate",
      description: "More complex chords and finger techniques",
      color: "bg-yellow-100",
      icon: <Star className="w-5 h-5 text-yellow-600" />,
      lessons: [],
      recommendedSongs: []
    },
    {
      id: 5,
      title: "Upper Intermediate",
      description: "Advanced scales and challenging songs",
      color: "bg-orange-100",
      icon: <Star className="w-5 h-5 text-orange-600" />,
      lessons: [],
      recommendedSongs: []
    },
    {
      id: 6,
      title: "Advanced",
      description: "Complex techniques and difficult songs",
      color: "bg-red-100",
      icon: <Star className="w-5 h-5 text-red-600" />,
      lessons: [],
      recommendedSongs: []
    },
    {
      id: 7,
      title: "Master",
      description: "Performance-level pieces and improvisation",
      color: "bg-indigo-100",
      icon: <Star className="w-5 h-5 text-indigo-600" />,
      lessons: [],
      recommendedSongs: []
    }
  ];

  // Render level selection view
  const renderLevelSelect = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">Learning Path</h2>
      <p className="text-gray-600 mb-6">
        Select a level to begin learning. Start from Level 1 and progress through each level for the best learning experience.
      </p>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {levels.map(level => (
          <button
            key={level.id}
            onClick={() => setSelectedLevel(level)}
            className={`p-6 rounded-xl text-left transition-all bg-white hover:bg-purple-50 relative ${
              level.lessons.length === 0 ? 'opacity-50' : ''
            }`}
          >
            <div className={`absolute top-0 left-0 w-2 h-full ${level.color} rounded-l-xl`}></div>
            <div className="flex justify-between items-start pl-2">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  {level.icon}
                  <span>Level {level.id}: {level.title}</span>
                </h3>
                <p className="text-sm text-gray-600 mt-2">{level.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <div className="mt-3 pl-2">
              <span className="text-sm text-gray-500">
                {level.lessons.length} {level.lessons.length === 1 ? 'lesson' : 'lessons'}
                {level.lessons.length === 0 && ' (Coming Soon)'}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // Render specific level view
  const renderLevelView = () => {
    if (!selectedLevel) return null;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-purple-900">
            Level {selectedLevel.id}: {selectedLevel.title}
          </h2>
          <button
            onClick={() => {
              setSelectedLevel(null);
              setSelectedLesson(null);
            }}
            className="text-purple-600 hover:text-purple-700"
          >
            Back to Levels
          </button>
        </div>
        
        <p className="text-gray-600">{selectedLevel.description}</p>
        
        {selectedLevel.lessons.length > 0 ? (
          <>
            <h3 className="text-lg font-medium mt-6 mb-3">Lessons:</h3>
            <div className="space-y-3">
              {selectedLevel.lessons.map(lesson => (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className="w-full p-4 text-left rounded-lg bg-white hover:bg-purple-50 transition-colors border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{lesson.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-purple-400" />
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="p-6 bg-purple-50 rounded-lg text-center">
            <h3 className="font-medium text-purple-800 mb-2">Coming Soon</h3>
            <p>Lessons for this level are under development. Check back later!</p>
          </div>
        )}
        
        {selectedLevel.recommendedSongs.length > 0 && (
          <>
            <h3 className="text-lg font-medium mt-6 mb-3">Recommended Songs:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedLevel.recommendedSongs.map((song, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-bold">{song.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{song.category}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  // Render specific lesson view
  const renderLessonView = () => {
    if (!selectedLesson) return null;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-purple-900">{selectedLesson.title}</h2>
          <button
            onClick={() => setSelectedLesson(null)}
            className="text-purple-600 hover:text-purple-700"
          >
            Back to Level
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          {selectedLesson.content}
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <div className="bg-purple-50 p-4 rounded-lg inline-flex gap-4 items-center">
            <KawaiiCompanions level={1} mood="happy" size="small" />
            <div>
              <p className="text-sm font-medium text-purple-900">Practice Tip:</p>
              <p className="text-sm text-purple-700">Start slowly and focus on accuracy before speed.</p>
            </div>
          </div>
          
          <button
            onClick={() => setSelectedLesson(null)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Complete & Continue
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {!selectedLevel && renderLevelSelect()}
      {selectedLevel && !selectedLesson && renderLevelView()}
      {selectedLesson && renderLessonView()}
    </div>
  );
};

export default LearningHub;
