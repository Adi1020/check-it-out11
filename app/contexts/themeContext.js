import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

const lightTheme = {
  background: '#fff',
  text: '#000',
  button: '#89D3DF',
  buttonText: '#fff',
  header: '#4285F4',
  headerText: '#fff',
};

const darkTheme = {
  background: '#000',
  text: '#fff',
  button: '#333',
  buttonText: '#fff',
  header: '#1E1E1E',
  headerText: '#fff',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
