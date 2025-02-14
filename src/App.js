import React, { useState } from 'react';
import KawaiiCompanions from './components/KawaiiCompanions';
import LearningSystem from './components/LearningSystem';
import ReferenceGuide from './components/ReferenceGuide';

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Harpika Practice Companion</h1>
        
        {/* Navigation */}
        <div className="flex gap-2 mb-6">
          <button 
            onClick={() => setCurrentView('home')}
            className={`px-4 py-2 rounded ${currentView === 'home' ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentView('reference')}
            className={`px-4 py-2 rounded ${currentView === 'reference' ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            Reference Guide
          </button>
          <button 
            onClick={() => setCurrentView('practice')}
            className={`px-4 py-2 rounded ${currentView === 'practice' ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            Practice
          </button>
        </div>
        
        {/* Content */}
        {currentView === 'home' && (
          <>
            <KawaiiCompanions level={1} mood="happy" />
            <div className="mt-6">
              <LearningSystem />
            </div>
          </>
        )}

        {currentView === 'reference' && (
          <ReferenceGuide />
        )}

        {currentView === 'practice' && (
          <div className="mt-6">
            <LearningSystem />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
