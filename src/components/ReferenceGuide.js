import React, { useState } from 'react';
import HarpikaTuner from './HarpikaTuner';
import TabCreator from './TabCreator';
import { Music, BookOpen, Info, Edit } from 'lucide-react';

const ReferenceGuide = ({ onSaveTab }) => {
  const [activeTab, setActiveTab] = useState('harpika');
  
  const harpikaLayout = [
    { note: 'D6', tab: '2°°', position: 1 },
    { note: 'B5', tab: '7°', position: 2 },
    { note: 'G5', tab: '5°', position: 3 },
    { note: 'E5', tab: '3°', position: 4 },
    { note: 'C5', tab: '1°', position: 5 },
    { note: 'A4', tab: '6', position: 6 },
    { note: 'F4', tab: '4', position: 7 },
    { note: 'D4', tab: '2', position: 8 },
    { note: 'C4', tab: '1', position: 9 },
    { note: 'E4', tab: '3', position: 10 },
    { note: 'G4', tab: '5', position: 11 },
    { note: 'B4', tab: '7', position: 12 },
    { note: 'D5', tab: '2°', position: 13 },
    { note: 'F5', tab: '4°', position: 14 },
    { note: 'A5', tab: '6°', position: 15 },
    { note: 'C6', tab: '1°°', position: 16 },
    { note: 'E6', tab: '3°°', position: 17 }
  ];

  // Tabs navigation
  const tabs = [
    { id: 'harpika', label: 'Harpika Guide', icon: <Info className="w-4 h-4" /> },
    { id: 'tuner', label: 'Tuner', icon: <Music className="w-4 h-4" /> },
    { id: 'notation', label: 'Tab Notation', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'creator', label: 'Tab Creator', icon: <Edit className="w-4 h-4" /> }
  ];

  // Tabs content
  const renderTabContent = () => {
    switch(activeTab) {
      case 'harpika':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4 text-purple-900">Harpika String Layout</h2>
            
            {/* Visual Layout */}
            <div className="mb-8">
              <div className="relative h-64 border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between h-full">
                  {harpikaLayout.map((string, index) => (
                    <div key={index} className="flex flex-col items-center group">
                      {/* Note name */}
                      <div className="text-sm font-medium text-purple-700 mb-1">{string.note}</div>
                      {/* String representation */}
                      <div className="flex-1 w-px bg-gray-400 group-hover:bg-purple-500 transition-colors"></div>
                      {/* Tab notation */}
                      <div className="text-sm font-mono mt-1">{string.tab}</div>
                      {/* Position number */}
                      <div className="text-xs text-gray-500 mt-1">{string.position}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Tab Notation Guide */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-purple-900">How to Read Tabs</h3>
              <div className="space-y-2 text-sm">
                <p>• Numbers (1-7) represent the basic notes</p>
                <p>• ° (one dot) indicates a higher octave</p>
                <p>• °° (two dots) indicates the highest octave</p>
                <p>• (1 3 5) Notes in parentheses are played together</p>
                <p>• Read tabs from left to right</p>
              </div>
            </div>

            {/* Example Section */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-purple-900">Examples</h3>
              <div className="font-mono bg-gray-50 p-4 rounded">
                <p className="mb-2">Simple scale:</p>
                <p>1 2 3 4 5 6 7 1° 2°</p>
                <p className="mt-4 mb-2">Chord example:</p>
                <p>(1 3 5) (1° 3° 5°)</p>
              </div>
            </div>
          </div>
        );
      
      case 'tuner':
        return <HarpikaTuner />;
      
      case 'notation':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4 text-purple-900">Tab Notation Guide</h2>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-purple-900">Understanding Tab Notation</h3>
              <p className="mb-4">Tablature ("tabs") for harpika uses a simple number system to indicate which strings to play:</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-purple-800">Basic Numbers (1-7)</h4>
                  <p className="text-sm text-gray-600 mb-2">The numbers 1-7 represent the middle octave notes.</p>
                  <div className="font-mono bg-gray-50 p-2 rounded">1 2 3 4 5 6 7</div>
                </div>
                
                <div>
                  <h4 className="font-medium text-purple-800">Dots (°)</h4>
                  <p className="text-sm text-gray-600 mb-2">Dots indicate higher octaves. One dot (°) represents the next octave up, two dots (°°) represent two octaves up.</p>
                  <div className="font-mono bg-gray-50 p-2 rounded">
                    <div>Middle: 1 2 3 4 5 6 7</div>
                    <div>Higher: 1° 2° 3° 4° 5° 6° 7°</div>
                    <div>Highest: 1°° 2°° 3°°</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-purple-800">Chords</h4>
                  <p className="text-sm text-gray-600 mb-2">Notes in parentheses are played together as a chord.</p>
                  <div className="font-mono bg-gray-50 p-2 rounded">
                    <div>(1 3 5) - play these three notes together</div>
                    <div>(1° 3° 5°) - play higher octave notes together</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-purple-800">Reading Order</h4>
                  <p className="text-sm text-gray-600 mb-2">Always read tabs from left to right, just like normal text.</p>
                  <div className="font-mono bg-gray-50 p-2 rounded">
                    <div>1 3 5 (1 3 5) 5° 3° 1°</div>
                    <div>↑ Play this first → → → → → → → → →</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'creator':
        return <TabCreator onSaveTab={onSaveTab} />;
        
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-purple-900">Reference Guide</h1>
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-purple-500 text-purple-700'
                : 'border-transparent text-gray-500 hover:text-purple-500'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ReferenceGuide;
