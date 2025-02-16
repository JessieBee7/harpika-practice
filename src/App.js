import React, { useState } from 'react';
import KawaiiCompanions from './components/KawaiiCompanions';
import ReferenceGuide from './components/ReferenceGuide';
import BackgroundTheme from './components/BackgroundTheme';
import LearningHub from './components/LearningHub';

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="min-h-screen">
      {/* Background */}
      <BackgroundTheme />
      
      {/* Main Content */}
      <div className="relative z-10 p-4">
        <div className="max-w-6xl mx-auto">
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
              onClick={() => setCurrentView('learn')}
              className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                currentView === 'learn' 
                  ? 'bg-purple-100 text-purple-700 shadow-md' 
                  : 'bg-white/80 hover:bg-purple-50'
              }`}
            >
              Learn
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
          </div>
          
          {/* Content */}
          <div className="space-y-6">
            {currentView === 'home' && (
              <>
                <div className="scale-150 transform origin-top mb-16">
                  <KawaiiCompanions level={1} mood="happy" />
                </div>
                <div className="mt-24 bg-white/90 rounded-lg shadow-lg backdrop-blur-sm p-6">
                  <h2 className="text-2xl font-bold mb-4">Welcome to Your Harpika Journey!</h2>
                  <p className="text-gray-600 mb-4">
                    Learn to play your harpika with fun, interactive lessons and a cute companion to guide you.
                  </p>
                  <button
                    onClick={() => setCurrentView('learn')}
                    className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Start Learning
                  </button>
                </div>
              </>
            )}

            {currentView === 'learn' && (
              <div className="bg-white/90 rounded-lg shadow-lg backdrop-blur-sm">
                <LearningHub />
              </div>
            )}

            {currentView === 'reference' && (
              <div className="bg-white/90 rounded-lg shadow-lg backdrop-blur-sm">
                <ReferenceGuide />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
