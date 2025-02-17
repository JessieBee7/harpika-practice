import React, { useState, useEffect } from 'react';
import { Save, Check, AlertCircle, Clock } from 'lucide-react';
import BackupSystem from '../utils/backupSystem';

const BackupIndicator = ({ className }) => {
 const [status, setStatus] = useState('idle'); // idle, backing-up, success, error
 const [lastBackup, setLastBackup] = useState(null);
 const [showNotification, setShowNotification] = useState(false);

 // Load initial backup info
 useEffect(() => {
   const history = BackupSystem.getBackupHistory();
   if (history.length > 0) {
     setLastBackup(history[0]);
   }
 }, []);

 // Subscribe to backup events
 useEffect(() => {
   const handleBackupStart = () => {
     setStatus('backing-up');
     setShowNotification(true);
   };

   const handleBackupComplete = (success) => {
     setStatus(success ? 'success' : 'error');
     const history = BackupSystem.getBackupHistory();
     if (history.length > 0) {
       setLastBackup(history[0]);
     }
     
     // Hide notification after 3 seconds
     setTimeout(() => {
       setShowNotification(false);
       setStatus('idle');
     }, 3000);
   };

   // Listen for backup events
   window.addEventListener('backupStart', handleBackupStart);
   window.addEventListener('backupComplete', handleBackupComplete);

   return () => {
     window.removeEventListener('backupStart', handleBackupStart);
     window.removeEventListener('backupComplete', handleBackupComplete);
   };
 }, []);

 return (
   <div className={`relative ${className}`}>
     {/* Status Icon */}
     <div className="flex items-center gap-2">
       {status === 'idle' && lastBackup && (
         <div className="text-xs text-gray-500 flex items-center gap-1">
           <Clock className="w-3 h-3" />
           Last backup: {new Date(lastBackup.timestamp).toLocaleTimeString()}
         </div>
       )}
       {status === 'backing-up' && (
         <Save className="w-4 h-4 text-blue-500 animate-spin" />
       )}
       {status === 'success' && (
         <Check className="w-4 h-4 text-green-500" />
       )}
       {status === 'error' && (
         <AlertCircle className="w-4 h-4 text-red-500" />
       )}
     </div>

     {/* Notification Popup */}
     {showNotification && (
       <div className={`absolute bottom-full right-0 mb-2 p-2 rounded-lg shadow-lg text-sm whitespace-nowrap
         ${status === 'backing-up' ? 'bg-blue-50 text-blue-700' :
           status === 'success' ? 'bg-green-50 text-green-700' :
           status === 'error' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-700'}
       `}>
         {status === 'backing-up' && 'Creating backup...'}
         {status === 'success' && 'Backup created successfully!'}
         {status === 'error' && 'Backup failed. Please try again.'}
       </div>
     )}
   </div>
 );
};

export default BackupIndicator;
