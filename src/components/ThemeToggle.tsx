"use client";
import { useTheme } from '../contexts/ThemeContext';
import { useState, useEffect, useRef } from 'react';

interface ThemeToggleProps {
  isMobile?: boolean;
}

export default function ThemeToggle({ isMobile = false }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const themes = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '🌗' }
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[0];

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as 'light' | 'dark' | 'system');
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="theme-toggle-mobile"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '12px 16px',
            background: 'var(--card-background)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            color: 'var(--card-text)',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            width: '100%'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>{currentTheme.icon}</span>
            <span>Theme: {currentTheme.label}</span>
          </div>
          <span style={{ fontSize: '14px', color: 'var(--card-text)' }}>
            {isOpen ? '▲' : '▼'}
          </span>
        </button>
        
        {isOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            background: 'var(--card-background)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            overflow: 'hidden'
          }}>
            {themes.map((themeOption) => (
              <button
                key={themeOption.value}
                onClick={() => handleThemeChange(themeOption.value)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  width: '100%',
                  background: theme === themeOption.value ? 'var(--border-color)' : 'transparent',
                  border: 'none',
                  color: 'var(--card-text)',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (theme !== themeOption.value) {
                    e.currentTarget.style.backgroundColor = 'var(--border-color)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (theme !== themeOption.value) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '18px' }}>{themeOption.icon}</span>
                <span>{themeOption.label}</span>
                {theme === themeOption.value && (
                  <span style={{ marginLeft: 'auto', color: 'var(--card-text)' }}>✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="theme-toggle-desktop"
        title="Select theme"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          background: 'var(--card-background)',
          border: '1px solid var(--border-color)',
          borderRadius: '6px',
          color: 'var(--card-text)',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <span style={{ fontSize: '16px' }}>{currentTheme.icon}</span>
        <span className="theme-label">{currentTheme.label}</span>
        <span style={{ fontSize: '12px', marginLeft: '4px' }}>
          {isOpen ? '▲' : '▼'}
        </span>
      </button>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '4px',
          background: 'var(--card-background)',
          border: '1px solid var(--border-color)',
          borderRadius: '6px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          minWidth: '140px',
          overflow: 'hidden'
        }}>
          {themes.map((themeOption) => (
            <button
              key={themeOption.value}
              onClick={() => handleThemeChange(themeOption.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                width: '100%',
                background: theme === themeOption.value ? 'var(--border-color)' : 'transparent',
                border: 'none',
                color: 'var(--card-text)',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                if (theme !== themeOption.value) {
                  e.currentTarget.style.backgroundColor = 'var(--border-color)';
                }
              }}
              onMouseLeave={(e) => {
                if (theme !== themeOption.value) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '14px' }}>{themeOption.icon}</span>
              <span>{themeOption.label}</span>
              {theme === themeOption.value && (
                <span style={{ marginLeft: 'auto', fontSize: '12px' }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}