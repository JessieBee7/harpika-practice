// FORCE NEW BUILD - VERSION 3 - TIMESTAMP: March 04, 2025 - FIXED LEARNING HUB
// Version 1.2.0 - Added functioning Learning Hub
import React, { useState, useEffect } from 'react';
import KawaiiCompanions from './components/KawaiiCompanions';
import ReferenceGuide from './components/ReferenceGuide';
import BackgroundTheme from './components/BackgroundTheme';
import LearningHub from './components/LearningHub'; // Import from LearningHub, not NewLearningHub
import SongLibrary from './components/SongLibrary';
import TestComponent from './components/TestComponent';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [customTabs, setCustomTabs] = useState([]);
  const [editingTab, setEditingTab] = useState(null);
  const [editingTabIndex, setEditingTabIndex] = useState(null);
  
  // Load any saved custom tabs from localStorage when app starts
  useEffect(() => {
    const savedTabs = localStorage.getItem('harpika-custom-tabs');
    if (savedTabs) {
      try {
        setCustomTabs(JSON.parse(savedTabs));
      } catch (err) {
        console.error('Error loading saved tabs:', err);
      }
    }
  }, []);
  
  // Save custom tabs to localStorage whenever they change
  useEffect(() => {
    if (customTabs.length > 0) {
      localStorage.setItem('harpika-custom-tabs', JSON.stringify(customTabs));
    }
  }, [customTabs]);

  // Handle saving a new tab or updating an existing one
  const handleSaveTab = (index, tabData, isEditing) => {
    if (isEditing && index !== null) {
      // Update existing tab
      setCustomTabs(prevTabs => {
        const newTabs = [...prevTabs];
        newTabs[index] = tabData;
        return newTabs;
      });
    } else {
      // Add new tab
      setCustomTabs(prevTabs => [...prevTabs, tabData]);
    }
    
    // Reset editing state
    setEditingTab(null);
    setEditingTabIndex(null);
    
    // Switch to Song Library view to see the changes
    setCurrentView('songs');
  };

  // Handle initiating edit of a tab
  const handleEditTab = (index, tab) => {
    setEditingTab(tab);
    setEditingTabIndex(index);
    setCurrentView('reference');
  };

  // Handle deleting a tab
  const handleDeleteTab = (index) => {
    setCustomTabs(prevTabs => prevTabs.filter((_, i) => i !== index));
  };

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
                <SongLibrary 
                  customTabs={customTabs} 
                  onEditTab={handleEditTab}
                  onDeleteTab={handleDeleteTab}
                />
              </div>
            )}

            {currentView === 'reference' && (
              <div className="bg-white/90 rounded-lg shadow-lg backdrop-blur-sm">
                <ReferenceGuide 
                  onSaveTab={handleSaveTab} 
                  editingTab={editingTab}
                  editingTabIndex={editingTabIndex}
                />
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
