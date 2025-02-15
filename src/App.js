import React, { useState } from 'react';
import KawaiiCompanions from './components/KawaiiCompanions';
import LearningSystem from './components/LearningSystem';
import ReferenceGuide from './components/ReferenceGuide';
import BackgroundTheme from './components/BackgroundTheme';

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="min-h-screen">
      {/* Background */}
      <BackgroundTheme />
      
      {/* Main Content */}
      <div className="relative z-10 p-4">
        <div className="max-w-6xl mx-auto"> {/* Increased max-width for larger components */}
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            Harpika Practice Companion
          </h1>
          
          {/* Navigation */}
          <div className="flex gap-3 mb-6 justify-center">
            <button 
              onClick={() => setCurrentView('home')}
              className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                currentView === 'home' 
                  ? 'bg-purple-100 text-purple-700 shadow-md' 
                  : 'bg-white/80 hover:bg-purple-50'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentView('reference')}
              className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                currentView === 'reference' 
                  ? 'bg-purple-100 text-purple-700 shadow-md' 
                  : 'bg-white/80 hover:bg-purple-50'
              }`}
            >
              Reference Guide
            </button>
            <button 
              onClick={() => setCurrentView('practice')}
              className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                currentView === 'practice' 
                  ? 'bg-purple-100 text-purple-700 shadow-md' 
                  : 'bg-white/80 hover:bg-purple-50'
              }`}
            >
              Practice
            </button>
          </div>
          
          {/* Content */}
          <div className="space-y-6">
            {currentView === 'home' && (
              <>
                <div className="scale-150 transform origin-top mb-16"> {/* Increased size of Kawaii companion */}
                  <KawaiiCompanions level={1} mood="happy" />
                </div>
                <div className="mt-24"> {/* Added margin to account for larger companion */}
                  <LearningSystem />
                </div>
              </>
            )}

            {currentView === 'reference' && (
              <div className="bg-white/90 rounded-lg shadow-lg backdrop-blur-sm">
                <ReferenceGuide />
              </div>
            )}

            {currentView === 'practice' && (
              <div className="bg-white/90 rounded-lg shadow-lg backdrop-blur-sm">
                <LearningSystem />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
