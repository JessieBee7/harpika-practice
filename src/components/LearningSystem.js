import React, { useState } from 'react';
import { Music, BookOpen, Star, Clock } from 'lucide-react';

const LearningSystem = () => {
  const [currentView, setCurrentView] = useState('home');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [practiceMinutes, setPracticeMinutes] = useState(0);
  const [selectedSong, setSelectedSong] = useState(null);

  // Updated song library with proper tab notation
  const songLibrary = {
    beginner: {
      title: "Beginner Songs",
      songs: [
        {
          title: "Basic Scale Practice",
          difficulty: "Beginner",
          description: "Practice moving up and down the scale",
          tab: [
            "Going up:",
            "1  2  3  4  5  6  7",
            "1°  2°  3°",
            "",
            "Coming down:",
            "3°  2°  1°",
            "7  6  5  4  3  2  1"
          ]
        },
        {
          title: "Simple Chords",
          difficulty: "Beginner",
          description: "Basic chord practice",
          tab: [
            "Major chords:",
            "(1 3 5)    Rest    (1° 3° 5°)",
            "",
            "Practice slowly:",
            "(1 3 5)  5  3  1"
          ]
        }
      ]
    },
    intermediate: {
      title: "Intermediate Practice",
      songs: [
        {
          title: "Chord Progressions",
          difficulty: "Intermediate",
          description: "Common chord patterns",
          tab: [
            "(1 3 5)    (6 1° 3°)    (5 7 2°)",
            "",
            "Practice pattern:",
            "(1 3 5)  5  (6 1° 3°)  3°  (5 7 2°)  2°"
          ]
        }
      ]
    },
    advanced: {
      title: "Advanced Songs",
      songs: [
        {
          title: "Complex Patterns",
          difficulty: "Advanced",
          description: "Advanced finger patterns",
          tab: [
            "(1° 3° 5°)  7°  6°  (5° 2°)",
            "3°  (2° 5)  (1° 3)  1",
            "",
            "Practice slowly at first"
          ]
        }
      ]
    }
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setCurrentView('practice');
  };

  const renderSongLibrary = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Song Library</h2>
        {Object.entries(songLibrary).map(([category, data]) => (
          <div key={category} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{data.title}</h3>
            <div className="grid gap-2">
              {data.songs.map((song, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 bg-gray-50 rounded hover:bg-gray-100"
                  onClick={() => handleSongSelect(song)}
                >
                  <div className="font-medium">{song.title}</div>
                  <div className="text-sm text-gray-600">{song.difficulty}</div>
                  {song.description && (
                    <div className="text-sm text-gray-500">{song.description}</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPracticeView = () => (
    <div className="space-y-4">
      {selectedSong && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold mb-2">{selectedSong.title}</h2>
          <div className="text-sm text-gray-600 mb-4">{selectedSong.difficulty}</div>
          <div className="font-mono text-sm bg-gray-50 p-4 rounded whitespace-pre-wrap">
            {selectedSong.tab.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="learning-system">
      {currentView === 'home' && (
        <>
          <div className="bg-white rounded-lg shadow mb-4">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Practice Dashboard</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-sm text-gray-600">Practice Time</div>
                  <div className="text-lg font-bold">{practiceMinutes} minutes</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Music className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-sm text-gray-600">Songs Learning</div>
                  <div className="text-lg font-bold">{Object.values(songLibrary).reduce((total, category) => total + category.songs.length, 0)}</div>
                </div>
              </div>
            </div>
          </div>

          {renderSongLibrary()}
        </>
      )}

      {currentView === 'practice' && renderPracticeView()}
    </div>
  );
};

export default LearningSystem;
