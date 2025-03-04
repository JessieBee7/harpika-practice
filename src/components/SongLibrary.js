import React, { useState } from 'react';
import { Music, Search, ChevronRight } from 'lucide-react';

const SongLibrary = ({ customTabs = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Song categories
  const songCategories = {
    custom: {
      title: "My Custom Tabs",
      songs: []  // This will be populated with user-created tabs
    },
    skyrim: {
      title: "Skyrim",
      songs: [
        {
          title: "Dragonborn",
          tab: [
            "7°  5°  3°  1°",
            "(1° 3° 5°)  3°  1°",
            "7  (1° 3°)  7  5"
          ]
        },
        {
          title: "Streets of Whiterun",
          tab: [
            "1°  6  5  3",
            "(1 3 5)  5  3  1",
            "1°  7  6  5",
            "(3° 5°)  1°"
          ]
        },
        {
          title: "Secunda",
          tab: [
            "5°  3°  1°  6",
            "5  3  1  3",
            "5  (3° 5°)  (1° 3°)  1°"
          ]
        }
      ]
    },
    anime: {
      title: "Anime",
      songs: [
        {
          title: "Inuyasha's Lullaby",
          tab: [
            "3  5  1°  7",
            "6  1°  5  3",
            "(3 1° 5°)  (1 3 5)"
          ]
        },
        {
          title: "Bleach - Never Meant to Belong",
          tab: [
            "1  3  5  1°",
            "7  5  3  1",
            "(1 3 5)  (5 7 2°)"
          ]
        }
      ]
    },
    finalFantasy: {
      title: "Final Fantasy",
      songs: [
        {
          title: "Aerith's Theme (Simple)",
          tab: [
            "7°  5°  3°  1°",
            "(1° 3° 5°)  3°  1°",
            "7  (1° 3°)  7  5"
          ]
        },
        {
          title: "To Zanarkand (Intro)",
          tab: [
            "5°  3°  1°  6",
            "5  3  1  3",
            "1  (3 5 1°)"
          ]
        }
      ]
    },
    witcher: {
      title: "The Witcher",
      songs: [
        {
          title: "Toss a Coin to Your Witcher",
          tab: [
            "5  3°  1°  5",
            "(1° 3° 5°)  3°  1°",
            "7  5  3  1"
          ]
        },
        {
          title: "Geralt of Rivia",
          tab: [
            "1  3  5  1°",
            "3  5  7  3°",
            "(1 3 5)  (3° 5° 7°)"
          ]
        }
      ]
    },
    disney: {
      title: "Disney",
      songs: [
        {
          title: "A Whole New World",
          tab: [
            "5  3°  1°  5",
            "(1° 3° 5°)  3°  1°",
            "7  5  3  1"
          ]
        },
        {
          title: "Let It Go (Chorus)",
          tab: [
            "1  1  5  3",
            "1  1  6  5",
            "(1 3 5)  (1° 3° 6)"
          ]
        }
      ]
    },
    seasonal: {
      title: "Seasonal",
      songs: [
        {
          title: "Silent Night",
          tab: [
            "5  5  1°",
            "7  7  3°",
            "(5 1° 3°)  (3 5 7)"
          ]
        },
        {
          title: "Jingle Bells",
          tab: [
            "3  3  3  3  3  5  1  2  3",
            "5  5  5  5  5  3  3  3  3",
            "(1 3 5)  (5 7 2°)  (1° 3° 5°)"
          ]
        },
        {
          title: "This Is Halloween",
          tab: [
            "5  5  5  3",
            "1  1  1  6",
            "(5 7 2°)  (1 3 5)"
          ]
        }
      ]
    }
  };

  // Add custom tabs to the appropriate categories
  if (customTabs && customTabs.length > 0) {
    customTabs.forEach(tab => {
      // Make sure the category exists
      if (!songCategories[tab.category]) {
        songCategories[tab.category] = {
          title: tab.category.charAt(0).toUpperCase() + tab.category.slice(1),
          songs: []
        };
      }
      
      // Add the tab to the appropriate category
      songCategories[tab.category].songs.push(tab);
    });
  }

  // Filtered songs based on search
  const getFilteredSongs = () => {
    if (!searchQuery) return songCategories;
    
    const filtered = {};
    Object.entries(songCategories).forEach(([key, category]) => {
      const filteredSongs = category.songs.filter(song => 
        song.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (filteredSongs.length > 0) {
        filtered[key] = {
          ...category,
          songs: filteredSongs
        };
      }
    });
    
    return filtered;
  };

  const filteredCategories = getFilteredSongs();

  // Render song viewer
  const renderSongViewer = () => {
    if (!selectedSong) return null;
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-purple-900">{selectedSong.title}</h2>
          <button
            onClick={() => setSelectedSong(null)}
            className="text-purple-600 hover:text-purple-700"
          >
            Back to Songs
          </button>
        </div>
        
        <div className="font-mono text-lg bg-purple-50 p-4 rounded-lg mb-4">
          {selectedSong.tab.map((line, index) => (
            <div key={index} className="mb-1">{line}</div>
          ))}
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>Practice Tips:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Start slowly and focus on accuracy</li>
            <li>Practice difficult sections separately</li>
            <li>Use a metronome to maintain rhythm</li>
            <li>Gradually increase tempo as you improve</li>
          </ul>
        </div>
      </div>
    );
  };

  // Render category view
  const renderCategoryView = () => {
    if (!selectedCategory) return null;
    
    const category = songCategories[selectedCategory];
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-purple-900">{category.title} Songs</h2>
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-purple-600 hover:text-purple-700"
          >
            Back to Categories
          </button>
        </div>
        
        <div className="grid gap-4">
          {category.songs.map((song, index) => (
            <button
              key={index}
              onClick={() => setSelectedSong(song)}
              className="p-4 rounded-lg text-left transition-all bg-white hover:bg-purple-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">{song.title}</h3>
                </div>
                <ChevronRight className="w-5 h-5 text-purple-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Render categories overview
  const renderCategoriesOverview = () => (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search songs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(filteredCategories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className="p-6 rounded-xl text-left transition-all bg-white hover:bg-purple-50"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-purple-900">{category.title}</h3>
              <Music className="w-5 h-5 text-purple-400" />
            </div>
            <div className="mt-4 text-sm text-gray-600">
              {category.songs.length} songs
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {selectedSong && renderSongViewer()}
      {!selectedSong && selectedCategory && renderCategoryView()}
      {!selectedSong && !selectedCategory && renderCategoriesOverview()}
    </div>
  );
};

export default SongLibrary;
