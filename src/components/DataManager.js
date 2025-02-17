import React, { useState } from 'react';
import { Download, Upload, RefreshCw, Save, AlertCircle } from 'lucide-react';
import StorageUtils from '../utils/storage';

const DataManager = ({ onDataChange }) => {
 const [message, setMessage] = useState(null);
 const [isProcessing, setIsProcessing] = useState(false);

 // Show feedback message
 const showMessage = (text, type = 'info') => {
   setMessage({ text, type });
   setTimeout(() => setMessage(null), 3000);
 };

 // Handle backup creation
 const handleCreateBackup = async () => {
   setIsProcessing(true);
   const success = await StorageUtils.createBackup();
   if (success) {
     showMessage('Backup created successfully!', 'success');
   } else {
     showMessage('Failed to create backup', 'error');
   }
   setIsProcessing(false);
 };

 // Handle data export
 const handleExport = async () => {
   setIsProcessing(true);
   const success = await StorageUtils.exportUserData();
   if (success) {
     showMessage('Data exported successfully!', 'success');
   } else {
     showMessage('Failed to export data', 'error');
   }
   setIsProcessing(false);
 };

 // Handle data import
 const handleImport = async (event) => {
   const file = event.target.files[0];
   if (file) {
     setIsProcessing(true);
     try {
       const success = await StorageUtils.importUserData(file);
       if (success) {
         showMessage('Data imported successfully!', 'success');
         onDataChange && onDataChange();
       } else {
         showMessage('Failed to import data', 'error');
       }
     } catch (error) {
       showMessage('Invalid data file', 'error');
     }
     setIsProcessing(false);
   }
 };

 // Handle restore from backup
 const handleRestore = async () => {
   if (window.confirm('Restore from latest backup? Current progress will be replaced.')) {
     setIsProcessing(true);
     const success = await StorageUtils.restoreFromBackup();
     if (success) {
       showMessage('Restored from backup successfully!', 'success');
       onDataChange && onDataChange();
     } else {
       showMessage('Failed to restore from backup', 'error');
     }
     setIsProcessing(false);
   }
 };

 // Handle reset
 const handleReset = async () => {
   if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
     setIsProcessing(true);
     const success = await StorageUtils.clearAllData();
     if (success) {
       showMessage('Progress reset successfully', 'success');
       onDataChange && onDataChange();
     } else {
       showMessage('Failed to reset progress', 'error');
     }
     setIsProcessing(false);
   }
 };

 return (
   <div className="bg-white rounded-lg shadow-lg p-6">
     <h3 className="text-lg font-bold mb-4">Data Management</h3>
     
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
           onClick={handleExport}
           disabled={isProcessing}
           className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50"
         >
           <Download className="w-4 h-4" />
           Export Data
         </button>
         <label className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 cursor-pointer disabled:opacity-50">
           <Upload className="w-4 h-4" />
           Import Data
           <input
             type="file"
             accept=".json"
             onChange={handleImport}
             disabled={isProcessing}
             className="hidden"
           />
         </label>
       </div>
     </div>

     {/* Reset Button */}
     <div className="border-t pt-4">
       <button
         onClick={handleReset}
         disabled={isProcessing}
         className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50"
       >
         <AlertCircle className="w-4 h-4" />
         Reset All Progress
       </button>
     </div>

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
