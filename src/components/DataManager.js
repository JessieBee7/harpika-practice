// Updated DataManager.js
import React, { useState, useEffect } from 'react';
import { Download, Upload, RefreshCw, Save, AlertCircle, Clock } from 'lucide-react';
import StorageUtils from '../utils/storage';
import BackupSystem from '../utils/backupSystem';

const DataManager = ({ onDataChange }) => {
 const [message, setMessage] = useState(null);
 const [isProcessing, setIsProcessing] = useState(false);
 const [backupHistory, setBackupHistory] = useState([]);
 const [lastBackup, setLastBackup] = useState(null);

 // Load backup info on mount
 useEffect(() => {
   const history = BackupSystem.getBackupHistory();
   setBackupHistory(history);
   setLastBackup(history[0]); // Most recent backup
 }, []);

 // Show feedback message
 const showMessage = (text, type = 'info') => {
   setMessage({ text, type });
   setTimeout(() => setMessage(null), 3000);
 };

 // Handle manual backup
 const handleCreateBackup = async () => {
   setIsProcessing(true);
   const success = await BackupSystem.createBackup(false); // manual backup
   if (success) {
     const newHistory = BackupSystem.getBackupHistory();
     setBackupHistory(newHistory);
     setLastBackup(newHistory[0]);
     showMessage('Backup created successfully!', 'success');
   } else {
     showMessage('Failed to create backup', 'error');
   }
   setIsProcessing(false);
 };

 // Handle restore
 const handleRestore = async () => {
   if (window.confirm('Restore from latest backup? Current progress will be replaced.')) {
     setIsProcessing(true);
     const success = await BackupSystem.restoreFromBackup('manual');
     if (success) {
       showMessage('Restored from backup successfully!', 'success');
       onDataChange && onDataChange();
     } else {
       showMessage('Failed to restore from backup', 'error');
     }
     setIsProcessing(false);
   }
 };

 // Handle backup export
 const handleExportBackup = async () => {
   setIsProcessing(true);
   const success = await BackupSystem.exportBackup();
   if (success) {
     showMessage('Backup exported successfully!', 'success');
   } else {
     showMessage('Failed to export backup', 'error');
   }
   setIsProcessing(false);
 };

 return (
   <div className="bg-white rounded-lg shadow-lg p-6">
     <h3 className="text-lg font-bold mb-4">Data Management</h3>
     
     {/* Last Backup Info */}
     {lastBackup && (
       <div className="mb-4 p-3 bg-gray-50 rounded-lg">
         <div className="flex items-center gap-2 text-sm text-gray-600">
           <Clock className="w-4 h-4" />
           Last backup: {new Date(lastBackup.timestamp).toLocaleString()}
           <span className="text-xs bg-gray-200 px-2 py-1 rounded">
             {lastBackup.type}
           </span>
         </div>
       </div>
     )}

     <div className="grid grid-cols-2 gap-4 mb-6">
       {/* Backup & Restore */}
       <div className="space-y-2">
         <button
           onClick={handleCreateBackup}
           disabled={isProcessing}
           className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 disabled:opacity-50"
         >
           <Save className="w-4 h-4" />
           Create Backup
         </button>
         <button
           onClick={handleRestore}
           disabled={isProcessing}
           className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50"
         >
           <RefreshCw className="w-4 h-4" />
           Restore Backup
         </button>
       </div>

       {/* Export & Import */}
       <div className="space-y-2">
         <button
           onClick={handleExportBackup}
           disabled={isProcessing}
           className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50"
         >
           <Download className="w-4 h-4" />
           Export Backup
         </button>
       </div>
     </div>

     {/* Backup History */}
     {backupHistory.length > 0 && (
       <div className="mt-4 border-t pt-4">
         <h4 className="font-medium mb-2">Backup History</h4>
         <div className="space-y-2 max-h-40 overflow-y-auto">
           {backupHistory.map((backup, index) => (
             <div key={index} className="text-sm flex items-center justify-between p-2 bg-gray-50 rounded">
               <span>{new Date(backup.timestamp).toLocaleString()}</span>
               <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                 {backup.type}
               </span>
             </div>
           ))}
         </div>
       </div>
     )}

     {/* Message Display */}
     {message && (
       <div className={`mt-4 p-3 rounded-lg text-center ${
         message.type === 'success' ? 'bg-green-100 text-green-700' :
         message.type === 'error' ? 'bg-red-100 text-red-700' :
         'bg-blue-100 text-blue-700'
       }`}>
         {message.text}
       </div>
     )}
   </div>
 );
};

export default DataManager;
