import React, { useState } from 'react';
import { Music, BookOpen, Star, Clock } from 'lucide-react';
import Practice from './Practice';

const LearningSystem = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedSong, setSelectedSong] = useState(null);
  const [practiceMinutes, setPracticeMinutes] = useState(0);

  // Song library stays the same

  return (
    <div className="learning-system space-y-6">
      {currentView === 'home' && (
        <>
          {/* Dashboard Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Practice Dashboard</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-purple-50/50 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-purple-50/80">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-purple-500" />
                  <div className="text-sm text-gray-600 mb-1">Practice Time</div>
                  <div className="text-2xl font-bold text-purple-700">{practiceMinutes} minutes</div>
                </div>
                <div className="text-center p-6 bg-pink-50/50 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-pink-50/80">
                  <Music className="w-12 h-12 mx-auto mb-3 text-pink-500" />
                  <div className="text-sm text-gray-600 mb-1">Songs Learning</div>
                  <div className="text-2xl font-bold text-pink-700">
                    {Object.values(songLibrary).reduce((total, category) => 
                      total + category.songs.length, 0
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Song Library */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Song Library</h2>
              {Object.entries(songLibrary).map(([category, data]) => (
                <div key={category} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-semibold mb-4 text-gray-700">{data.title}</h3>
                  <div className="grid gap-4">
                    {data.songs.map((song, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-5 bg-purple-50/50 rounded-xl hover:bg-purple-50/80 
                                 transition-all duration-300 transform hover:scale-[1.02] backdrop-blur-sm"
                        onClick={() => handleSongSelect(song)}
                      >
                        <div className="font-medium text-lg text-gray-800 mb-1">{song.title}</div>
                        <div className="text-sm text-purple-600 mb-2">{song.difficulty}</div>
                        {song.description && (
                          <div className="text-sm text-gray-600">{song.description}</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {currentView === 'practice' && selectedSong && (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <Practice 
            song={selectedSong}
            onPracticeTime={(minutes) => setPracticeMinutes(prev => prev + minutes)}
          />
        </div>
      )}
    </div>
  );
};

export default LearningSystem;
