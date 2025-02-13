import React, { useState } from 'react';
import KawaiiCompanions from './components/KawaiiCompanions';
import LearningSystem from './components/LearningSystem';

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Harpika Practice Companion</h1>
        
        {/* Kawaii Characters */}
        <KawaiiCompanions level={1} mood="happy" />
        
        {/* Learning System */}
        <div className="mt-6">
          <LearningSystem />
        </div>
      </div>
    </div>
  );
}

export default App;
