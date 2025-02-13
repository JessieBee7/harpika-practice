import React, { useState } from 'react';
import { Music, BookOpen, Star, Clock } from 'lucide-react';

const LearningSystem = () => {
  const [currentView, setCurrentView] = useState('home');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [practiceMinutes, setPracticeMinutes] = useState(0);

  // Sample song library structure
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

  return (
    <div className="learning-system">
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
    </div>
  );
};

export default LearningSystem;
