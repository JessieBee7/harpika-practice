// storage.js
const STORAGE_KEYS = {
 PROGRESS: 'harpikaProgress',
 MODIFICATIONS: 'harpikaSongModifications',
 SETTINGS: 'harpikaSettings',
 BACKUP: 'harpikaBackup'
};

export const StorageUtils = {
 // Save modifications
 saveSongModification: (songId, modifications) => {
   try {
     const savedMods = localStorage.getItem(STORAGE_KEYS.MODIFICATIONS);
     const allModifications = savedMods ? JSON.parse(savedMods) : {};
     
     allModifications[songId] = {
       ...modifications,
       lastModified: new Date().toISOString(),
       version: (allModifications[songId]?.version || 0) + 1
     };

     localStorage.setItem(
       STORAGE_KEYS.MODIFICATIONS, 
       JSON.stringify(allModifications)
     );

     // Create backup
     StorageUtils.createBackup();
     
     return true;
   } catch (error) {
     console.error('Error saving modification:', error);
     return false;
   }
 },

 // Load all modifications
 loadModifications: () => {
   try {
     const savedMods = localStorage.getItem(STORAGE_KEYS.MODIFICATIONS);
     return savedMods ? JSON.parse(savedMods) : {};
   } catch (error) {
     console.error('Error loading modifications:', error);
     return {};
   }
 },

 // Get specific song with modifications
 getModifiedSong: (songId) => {
   try {
     const allMods = StorageUtils.loadModifications();
     return allMods[songId] || null;
   } catch (error) {
     console.error('Error getting modified song:', error);
     return null;
   }
 },

 // Save progress
 saveProgress: (progress) => {
   try {
     localStorage.setItem(
       STORAGE_KEYS.PROGRESS, 
       JSON.stringify(progress)
     );
     return true;
   } catch (error) {
     console.error('Error saving progress:', error);
     return false;
   }
 },

 // Load progress
 loadProgress: () => {
   try {
     const savedProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
     return savedProgress ? JSON.parse(savedProgress) : null;
   } catch (error) {
     console.error('Error loading progress:', error);
     return null;
   }
 },

 // Create backup
 createBackup: () => {
   try {
     const backup = {
       modifications: StorageUtils.loadModifications(),
       progress: StorageUtils.loadProgress(),
       timestamp: new Date().toISOString()
     };

     localStorage.setItem(
       STORAGE_KEYS.BACKUP, 
       JSON.stringify(backup)
     );
     
     return true;
   } catch (error) {
     console.error('Error creating backup:', error);
     return false;
   }
 },

 // Restore from backup
 restoreFromBackup: () => {
   try {
     const backup = localStorage.getItem(STORAGE_KEYS.BACKUP);
     if (!backup) return false;

     const { modifications, progress } = JSON.parse(backup);
     
     localStorage.setItem(
       STORAGE_KEYS.MODIFICATIONS, 
       JSON.stringify(modifications)
     );
     localStorage.setItem(
       STORAGE_KEYS.PROGRESS, 
       JSON.stringify(progress)
     );

     return true;
   } catch (error) {
     console.error('Error restoring from backup:', error);
     return false;
   }
 },

 // Export user data
 exportUserData: () => {
   try {
     const userData = {
       modifications: StorageUtils.loadModifications(),
       progress: StorageUtils.loadProgress(),
       timestamp: new Date().toISOString()
     };

     const blob = new Blob(
       [JSON.stringify(userData, null, 2)], 
       { type: 'application/json' }
     );
     const url = URL.createObjectURL(blob);
     
     const a = document.createElement('a');
     a.href = url;
     a.download = `harpika-data-${new Date().toISOString().split('T')[0]}.json`;
     a.click();
     
     URL.revokeObjectURL(url);
     return true;
   } catch (error) {
     console.error('Error exporting user data:', error);
     return false;
   }
 },

 // Import user data
 importUserData: async (file) => {
   try {
     const text = await file.text();
     const userData = JSON.parse(text);

     if (userData.modifications && userData.progress) {
       localStorage.setItem(
         STORAGE_KEYS.MODIFICATIONS, 
         JSON.stringify(userData.modifications)
       );
       localStorage.setItem(
         STORAGE_KEYS.PROGRESS, 
         JSON.stringify(userData.progress)
       );
       StorageUtils.createBackup();
       return true;
     }
     return false;
   } catch (error) {
     console.error('Error importing user data:', error);
     return false;
   }
 },

 // Clear all data
 clearAllData: () => {
   try {
     // Create backup before clearing
     StorageUtils.createBackup();
     
     localStorage.removeItem(STORAGE_KEYS.MODIFICATIONS);
     localStorage.removeItem(STORAGE_KEYS.PROGRESS);
     return true;
   } catch (error) {
     console.error('Error clearing data:', error);
     return false;
   }
 }
};

export default StorageUtils;
