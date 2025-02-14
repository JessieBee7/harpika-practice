import React from 'react';

const ReferenceGuide = () => {
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

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Harpika Reference Guide</h2>
      
      {/* Visual Layout */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">String Layout</h3>
        <div className="relative h-64 border rounded-lg p-4 bg-gray-50">
          <div className="flex justify-between h-full">
            {harpikaLayout.map((string, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Note name */}
                <div className="text-sm font-medium">{string.note}</div>
                {/* String representation */}
                <div className="flex-1 w-px bg-gray-400 my-2"></div>
                {/* Tab notation */}
                <div className="text-sm font-mono">{string.tab}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Notation Guide */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">How to Read Tabs</h3>
        <div className="space-y-2 text-sm">
          <p>• Numbers (1-7) represent the basic notes</p>
          <p>• ° (one dot) indicates a higher octave</p>
          <p>• °° (two dots) indicates the highest octave</p>
          <p>• (1 3 5) Notes in parentheses are played together</p>
          <p>• Read tabs from left to right</p>
        </div>
      </div>

      {/* Example Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Example</h3>
        <div className="font-mono bg-gray-50 p-4 rounded">
          <p className="mb-2">Simple scale:</p>
          <p>1 2 3 4 5 6 7 1° 2°</p>
          <p className="mt-4 mb-2">Chord example:</p>
          <p>(1 3 5) (1° 3° 5°)</p>
        </div>
      </div>
    </div>
  );
};

export default ReferenceGuide;
