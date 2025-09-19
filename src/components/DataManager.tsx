"use client";

import { useState, useRef, useEffect } from 'react';
import { 
  exportLocalStorageData, 
  importLocalStorageData, 
  downloadDataAsFile, 
  readFileAsText,
  getDataSummary,
  clearAllData
} from '../utils/dataExport';

export default function DataManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleExport = async () => {
    try {
      setIsLoading(true);
      const data = exportLocalStorageData();
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `listening-aptis-data-${timestamp}.json`;
      downloadDataAsFile(data, filename);
      showMessage('Data exported successfully!', 'success');
    } catch (error) {
      showMessage(error instanceof Error ? error.message : 'Export failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const content = await readFileAsText(file);
      importLocalStorageData(content);
      showMessage('Data imported successfully!', 'success');
      
      // Refresh the page to update all components
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      showMessage(error instanceof Error ? error.message : 'Import failed', 'error');
    } finally {
      setIsLoading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all progress data? This action cannot be undone.')) {
      try {
        clearAllData();
        showMessage('All data cleared successfully!', 'success');
        
        // Refresh the page to update all components
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        showMessage(error instanceof Error ? error.message : 'Failed to clear data', 'error');
      }
    }
  };

  const dataSummary = isMounted ? getDataSummary() : { totalProgress: 0, incorrectAnswers: 0, lastUpdated: null };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-secondary"
        style={{
          padding: '8px 12px',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
        title="Data Export/Import"
      >
        💾 Data
      </button>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
        onClick={() => setIsOpen(false)}
      >
        {/* Modal */}
        <div
          style={{
            backgroundColor: 'var(--card-background)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            border: '1px solid var(--border-color)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: 'var(--foreground)',
              margin: 0
            }}>
              💾 Data Management
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: 'var(--card-text)',
                padding: '4px'
              }}
            >
              ×
            </button>
          </div>

          {/* Data Summary */}
          <div className="card" style={{
            marginBottom: '24px',
            backgroundColor: 'var(--background)',
            padding: '16px'
          }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--foreground)',
              marginBottom: '12px'
            }}>
              📊 Current Data Summary
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '12px',
              fontSize: '14px',
              color: 'var(--card-text)'
            }}>
              <div>
                <strong>Progress Items:</strong><br />
                {dataSummary.totalProgress}
              </div>
              <div>
                <strong>Incorrect Answers:</strong><br />
                {dataSummary.incorrectAnswers}
              </div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              backgroundColor: messageType === 'success' ? '#dcfce7' : '#fee2e2',
              border: `1px solid ${messageType === 'success' ? '#10b981' : '#ef4444'}`,
              color: messageType === 'success' ? '#065f46' : '#991b1b',
              fontSize: '14px'
            }}>
              {message}
            </div>
          )}

          {/* Actions */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Export */}
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--foreground)',
                marginBottom: '8px'
              }}>
                📤 Export Data
              </h4>
              <p style={{
                fontSize: '14px',
                color: 'var(--card-text)',
                marginBottom: '12px',
                lineHeight: '1.4'
              }}>
                Download your progress data as a JSON file to backup or transfer to another computer.
              </p>
              <button
                onClick={handleExport}
                disabled={isLoading}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                {isLoading ? '⏳ Exporting...' : '📤 Export Data'}
              </button>
            </div>

            {/* Import */}
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--foreground)',
                marginBottom: '8px'
              }}>
                📥 Import Data
              </h4>
              <p style={{
                fontSize: '14px',
                color: 'var(--card-text)',
                marginBottom: '12px',
                lineHeight: '1.4'
              }}>
                Upload a previously exported JSON file to restore your progress data.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid var(--border-color)',
                  backgroundColor: 'var(--card-background)',
                  color: 'var(--card-text)',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Clear Data */}
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--foreground)',
                marginBottom: '8px'
              }}>
                🗑️ Clear All Data
              </h4>
              <p style={{
                fontSize: '14px',
                color: 'var(--card-text)',
                marginBottom: '12px',
                lineHeight: '1.4'
              }}>
                Remove all progress data and start fresh. This action cannot be undone.
              </p>
              <button
                onClick={handleClearData}
                disabled={isLoading}
                className="btn btn-danger"
                style={{ width: '100%' }}
              >
                🗑️ Clear All Data
              </button>
            </div>
          </div>

          {/* Info */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: 'var(--background)',
            borderRadius: '8px',
            fontSize: '12px',
            color: 'var(--card-text)',
            lineHeight: '1.4'
          }}>
            <strong>💡 Tip:</strong> Export your data regularly to backup your progress. 
            The exported file can be imported on any device to restore your learning progress.
          </div>
        </div>
      </div>
    </>
  );
}