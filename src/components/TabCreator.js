import React, { useState, useEffect } from 'react';
import { Plus, Save, Trash, Music, AlertCircle } from 'lucide-react';

const TabCreator = ({ onSaveTab, editingTab = null, editingIndex = null }) => {
  const [tabTitle, setTabTitle] = useState('');
  const [tabLines, setTabLines] = useState(['']);
  const [category, setCategory] = useState('custom');
  const [previewMode, setPreviewMode] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Initialize form if editing an existing tab
  useEffect(() => {
    if (editingTab) {
      setTabTitle(editingTab.title || '');
      setTabLines(editingTab.tab || ['']);
      setCategory(editingTab.category || 'custom');
      setIsEditing(true);
    } else {
      setTabTitle('');
      setTabLines(['']);
      setCategory('custom');
      setIsEditing(false);
    }
  }, [editingTab]);

  // Available categories for songs
  const categories = [
    { id: 'custom', name: 'Custom' },
    { id: 'skyrim', name: 'Skyrim' },
    { id: 'anime', name: 'Anime' },
    { id: 'finalFantasy', name: 'Final Fantasy' },
    { id: 'witcher', name: 'The Witcher' },
    { id: 'disney', name: 'Disney' },
    { id: 'seasonal', name: 'Seasonal' }
  ];

  // Handle adding a new line
  const handleAddLine = () => {
    setTabLines([...tabLines, '']);
  };

  // Handle updating a specific line
  const handleLineChange = (index, value) => {
    const updatedLines = [...tabLines];
    updatedLines[index] = value;
    setTabLines(updatedLines);
  };

  // Handle removing a line
  const handleRemoveLine = (index) => {
    if (tabLines.length > 1) {
      const updatedLines = tabLines.filter((_, i) => i !== index);
      setTabLines(updatedLines);
    }
  };

  // Validate the tab before saving
  const validateTab = () => {
    if (!tabTitle.trim()) {
      setErrorMessage('Please enter a title for your tab.');
      return false;
    }

    if (tabLines.every(line => !line.trim())) {
      setErrorMessage('Please add at least one line of tab notation.');
      return false;
    }

    // Clear any previous error
    setErrorMessage('');
    return true;
  };

  // Handle saving the tab
  const handleSaveTab = () => {
    if (!validateTab()) return;

    const tabData = {
      title: tabTitle,
      tab: tabLines.filter(line => line.trim()),
      category
    };

    if (isEditing && editingIndex !== null) {
      onSaveTab(editingIndex, tabData, true);
    } else {
      onSaveTab(null, tabData, false);
    }
    
    // Reset form after saving
    setTabTitle('');
    setTabLines(['']);
    setCategory('custom');
    setErrorMessage('');
    setIsEditing(false);
    
    // Show confirmation
    alert(`Your tab has been ${isEditing ? 'updated' : 'saved'} to the Song Library!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-purple-900">
          {isEditing ? 'Edit Tab' : 'Create Your Own Tabs'}
        </h2>
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="text-purple-600 flex items-center gap-1 text-sm"
        >
          <AlertCircle className="w-4 h-4" />
          {showHelp ? 'Hide Help' : 'Show Help'}
        </button>
      </div>

      {showHelp && (
        <div className="bg-purple-50 p-4 rounded-lg text-sm">
          <h3 className="font-medium mb-2">How to Use the Tab Creator:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use numbers (1-7) for the basic notes</li>
            <li>Add ° (one dot) for higher octave (example: 1°)</li>
            <li>Add °° (two dots) for highest octave (example: 1°°)</li>
            <li>Use parentheses for chords: (1 3 5)</li>
            <li>Add multiple lines for different parts of the song</li>
            <li>Choose a category and give your tab a title</li>
            <li>Click Save to add it to your Song Library</li>
          </ul>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      <div className="space-y-4">
        {/* Tab Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tab Title
            </label>
            <input
              type="text"
              value={tabTitle}
              onChange={(e) => setTabTitle(e.target.value)}
              placeholder="Enter your tab title"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab Editor */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Tab Notation
            </label>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="text-purple-600 text-sm flex items-center gap-1"
            >
              <Music className="w-4 h-4" />
              {previewMode ? 'Edit Mode' : 'Preview Mode'}
            </button>
          </div>

          {previewMode ? (
            // Preview Mode
            <div className="min-h-24 p-4 border border-gray-300 rounded-md bg-purple-50 font-mono">
              {tabLines.map((line, index) => (
                <div key={index} className="mb-1">
                  {line || <span className="text-gray-400">(empty line)</span>}
                </div>
              ))}
            </div>
          ) : (
            // Edit Mode
            <div className="space-y-2">
              {tabLines.map((line, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={line}
                    onChange={(e) => handleLineChange(index, e.target.value)}
                    placeholder="Enter tab notation (e.g., 1 3 5 7 or (1 3 5))"
                    className="flex-1 p-2 border border-gray-300 rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={() => handleRemoveLine(index)}
                    disabled={tabLines.length === 1}
                    className={`p-2 rounded-md ${
                      tabLines.length === 1
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-red-50 text-red-500 hover:bg-red-100'
                    }`}
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {!previewMode && (
            <button
              onClick={handleAddLine}
              className="mt-2 flex items-center text-sm text-purple-600 hover:text-purple-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Line
            </button>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveTab}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isEditing ? 'Update Tab' : 'Save to Library'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabCreator;
