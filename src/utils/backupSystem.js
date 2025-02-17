// backupSystem.js
import StorageUtils from './storage';

const BACKUP_KEYS = {
 AUTO: 'harpikaAutoBackup',
 MANUAL: 'harpikaManualBackup',
 VERSION: 'harpikaBackupVersion',
 HISTORY: 'harpikaBackupHistory'
};

const BackupSystem = {
 // Create timestamped backup
 createBackup: async (isAutomatic = false) => {
   try {
     const timestamp = new Date().toISOString();
     const backupData = {
       modifications: StorageUtils.loadModifications(),
       progress: StorageUtils.loadProgress(),
       timestamp,
       version: isAutomatic ? 'auto' : 'manual',
       songs: {}, // Will store song-specific backups
     };

     // Store in appropriate backup slot
     const storageKey = isAutomatic ? BACKUP_KEYS.AUTO : BACKUP_KEYS.MANUAL;
     localStorage.setItem(storageKey, JSON.stringify(backupData));

     // Update backup history
     const history = BackupSystem.getBackupHistory();
     history.unshift({
       timestamp,
       type: isAutomatic ? 'Automatic' : 'Manual',
       version: backupData.version
     });
     
     // Keep only last 10 entries in history
     if (history.length > 10) history.pop();
     localStorage.setItem(BACKUP_KEYS.HISTORY, JSON.stringify(history));

     return true;
   } catch (error) {
     console.error('Backup creation failed:', error);
     return false;
   }
 },

 // Restore from backup
 restoreFromBackup: async (backupType = 'manual') => {
   try {
     const storageKey = backupType === 'auto' ? BACKUP_KEYS.AUTO : BACKUP_KEYS.MANUAL;
     const backupData = localStorage.getItem(storageKey);
     
     if (!backupData) {
       throw new Error('No backup found');
     }

     const { modifications, progress } = JSON.parse(backupData);

     // Create safety backup before restore
     await BackupSystem.createBackup(true);

     // Restore data
     StorageUtils.saveSongModification('all', modifications);
     StorageUtils.saveProgress(progress);

     return true;
   } catch (error) {
     console.error('Restore failed:', error);
     return false;
   }
 },

 // Get backup history
 getBackupHistory: () => {
   try {
     const history = localStorage.getItem(BACKUP_KEYS.HISTORY);
     return history ? JSON.parse(history) : [];
   } catch (error) {
     console.error('Failed to get backup history:', error);
     return [];
   }
 },

 // Create song-specific backup
 createSongBackup: async (songId, songData) => {
   try {
     const backupData = localStorage.getItem(BACKUP_KEYS.MANUAL);
     const backup = backupData ? JSON.parse(backupData) : { songs: {} };
     
     backup.songs[songId] = {
       data: songData,
       timestamp: new Date().toISOString()
     };

     localStorage.setItem(BACKUP_KEYS.MANUAL, JSON.stringify(backup));
     return true;
   } catch (error) {
     console.error('Song backup failed:', error);
     return false;
   }
 },

 // Restore specific song
 restoreSongBackup: async (songId) => {
   try {
     const backupData = localStorage.getItem(BACKUP_KEYS.MANUAL);
     if (!backupData) return null;

     const backup = JSON.parse(backupData);
     return backup.songs[songId] || null;
   } catch (error) {
     console.error('Song restore failed:', error);
     return null;
   }
 },

 // Schedule automatic backup
 scheduleAutoBackup: (intervalMinutes = 30) => {
   setInterval(() => {
     BackupSystem.createBackup(true);
   }, intervalMinutes * 60 * 1000);
 },

 // Clear old backups
 clearOldBackups: () => {
   try {
     const history = BackupSystem.getBackupHistory();
     const thirtyDaysAgo = new Date();
     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

     const filteredHistory = history.filter(backup => 
       new Date(backup.timestamp) > thirtyDaysAgo
     );

     localStorage.setItem(BACKUP_KEYS.HISTORY, JSON.stringify(filteredHistory));
     return true;
   } catch (error) {
     console.error('Failed to clear old backups:', error);
     return false;
   }
 },

 // Export backup
 exportBackup: async () => {
   try {
     const backupData = {
       manual: localStorage.getItem(BACKUP_KEYS.MANUAL),
       auto: localStorage.getItem(BACKUP_KEYS.AUTO),
       history: BackupSystem.getBackupHistory(),
       exportDate: new Date().toISOString()
     };

     const blob = new Blob([JSON.stringify(backupData, null, 2)], {
       type: 'application/json'
     });
     
     const url = URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = `harpika-backup-${new Date().toLocaleDateString()}.json`;
     a.click();
     
     URL.revokeObjectURL(url);
     return true;
   } catch (error) {
     console.error('Backup export failed:', error);
     return false;
   }
 }
};

export default BackupSystem;
