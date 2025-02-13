import React, { useState } from 'react';
import { Music, BookOpen, Star, Clock } from 'lucide-react';
import AudioPractice from './AudioPractice';

const LearningSystem = () => {
  const [currentView, setCurrentView] = useState('home');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [practiceMinutes, setPracticeMinutes] = useState(0);
  const [selectedSong, setSelectedSong] = useState(null);

  // Song library structure
  const songLibrary = {
    skyrim: {
      title: "Skyrim Collection",
      songs: [
        {
          title: "Dragonborn",
          difficulty: "Intermediate",
          tab: [
            "e|------------------------",
            "B|------------------------",
            "G|----0-2-0--------------",
            "D|----------3-0----------",
            "A|----------------3-0----",
            "E|------------------------"
          ],
          quickLearn: true
        },
        {
          title: "Streets of Whiterun",
          difficulty: "Beginner",
          tab: [
            "e|------------------------",
            "B|------------------------",
            "G|------------------------",
            "D|------------------------",
            "A|------------------------",
            "E|------------------------"
          ],
          quickLearn: true
        }
      ]
    },
    disney: {
      title: "Disney Songs",
      songs: [
        {
          title: "A Whole New World",
          difficulty: "Beginner",
          tab: [
            "e|------------------------",
            "B|------------------------",
            "G|------------------------",
            "D|------------------------",
            "A|------------------------",
            "E|------------------------"
          ]
        }
      ]
    }
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setCurrentView('practice');
  };

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
                  <div className="text-lg font-bold">2</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow mb-4">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Quick Start</h2>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100"
                  onClick={() => setCurrentView('practice')}
                >
                  <BookOpen className="w-6 h-6 mx-auto mb-2" />
                  Practice Now
                </button>
                <button 
                  className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100"
                  onClick={() => setCurrentView('songs')}
                >
                  <Music className="w-6 h-6 mx-auto mb-2" />
                  Song Library
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {currentView === 'songs' && (
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
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentView === 'practice' && (
        <div className="space-y-4">
          {selectedSong && (
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-bold mb-2">{selectedSong.title}</h2>
              <div className="font-mono text-sm bg-gray-50 p-4 rounded">
                {selectedSong.tab.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          )}
          
          <AudioPractice 
            song={selectedSong}
            onProgress={(note) => {
              setPracticeMinutes(prev => prev + 1);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default LearningSystem;
