import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  fontSize: number;
  highContrast: boolean;
  grayscale: boolean;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  toggleHighContrast: () => void;
  toggleGrayscale: () => void;
  resetAll: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${fontSize}%`;
    
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (grayscale) {
      root.classList.add('grayscale-mode');
    } else {
      root.classList.remove('grayscale-mode');
    }
  }, [fontSize, highContrast, grayscale]);

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 10, 150));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 10, 80));
  const resetFontSize = () => setFontSize(100);
  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleGrayscale = () => setGrayscale(prev => !prev);
  
  const resetAll = () => {
    setFontSize(100);
    setHighContrast(false);
    setGrayscale(false);
  };

  return (
    <AccessibilityContext.Provider value={{
      fontSize,
      highContrast,
      grayscale,
      increaseFontSize,
      decreaseFontSize,
      resetFontSize,
      toggleHighContrast,
      toggleGrayscale,
      resetAll
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
