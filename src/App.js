// Version 1.1.0 - Added animations, song library and tuner
import React, { useState } from 'react';
import KawaiiCompanions from './components/KawaiiCompanions';
import ReferenceGuide from './components/ReferenceGuide';
import BackgroundTheme from './components/BackgroundTheme';
import LearningHub from './components/NewLearningHub';
import SongLibrary from './components/SongLibrary';
import TestComponent from './components/TestComponent';

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
          
          <TestComponent />
          
          {/* Navigation */}
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            <button 
              onClick={() => setCurrentView('home')}
              className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                currentView === 'home' 
                  ? 'bg-purple-200 text-purple-800 shadow-md' 
                  : 'bg-white/80 hover:bg-purple-50 text-purple-700'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentView('learn')}
              className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                currentView === 'learn' 
                  ? 'bg-purple-200 text-purple-800 shadow-md' 
                  : 'bg-white/80 hover:bg-purple-50 text-purple-700'
              }`}
            >
              Learn
            </button>
            <button 
              onClick={() => setCurrentView('songs')}
              className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                currentView === 'songs' 
                  ? 'bg-purple-200 text-purple-800 shadow-md' 
                  : 'bg-white/80 hover:bg-purple-50 text-purple-700'
              }`}
            >
              Song Library
            </button>
            <button 
              onClick={() => setCurrentView('reference')}
              className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                currentView === 'reference' 
                  ? 'bg-purple-200 text-purple-800 shadow-md' 
                  : 'bg-white/80 hover:bg-purple-50 text-purple-700'
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
                  <h2 className="text-2xl font-bold mb-4 text-purple-900">Welcome to Your Harpika Journey!</h2>
                  <p className="text-gray-600 mb-4">
                    Learn to play your harpika with fun, interactive lessons and a cute companion to guide you.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-6">
                    <button
                      onClick={() => setCurrentView('learn')}
                      className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Start Learning
                    </button>
                    <button
                      onClick={() => setCurrentView('songs')}
                      className="bg-purple-100 text-purple-700 px-6 py-3 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      Browse Songs
                    </button>
                  </div>
                </div>
              </>
            )}

            {currentView === 'learn' && (
              <div className="bg-white/90 rounded-lg shadow-lg backdrop-blur-sm">
                <LearningHub />
              </div>
            )}

            {currentView === 'songs' && (
              <div className="bg-white/90 rounded-lg shadow-lg backdrop-blur-sm p-6">
                <SongLibrary />
              </div>
            )}

            {currentView === 'reference' && (
              <div className="bg-white/90 rounded-lg shadow-lg backdrop-blur-sm">
                <ReferenceGuide />
              </div>
            )}
          </div>
          
          <div className="mt-12 text-center text-xs text-gray-500">
            <p>Version 1.1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
