// import { createContext, useContext, useState } from 'react';

// const ThemeContext = createContext();

// const themes = {
//   default: {
//     name: 'Default',
//     bgColor: 'bg-white',
//     textColor: 'text-gray-800',
//     iconColor: 'text-gray-800',
//   },
//   dark: {
//     name: 'Dark',
//     bgColor: 'bg-gray-900',
//     textColor: 'text-white',
//     iconColor: 'text-white',
//   },
//   blue: {
//     name: 'Blue',
//     bgColor: 'bg-blue-500',
//     textColor: 'text-white',
//     iconColor: 'text-white',
//   },
//   green: {
//     name: 'Green',
//     bgColor: 'bg-green-500',
//     textColor: 'text-white',
//     iconColor: 'text-white',
//   },
//   red: {
//     name: 'Red',
//     bgColor: 'bg-red-500',
//     textColor: 'text-white',
//     iconColor: 'text-white',
//   },
// };

// export const ThemeProvider = ({ children }) => {
//   const [currentTheme, setCurrentTheme] = useState(themes.default);

//   const changeTheme = (themeKey) => {
//     setCurrentTheme(themes[themeKey]);
//   };

//   return (
//     <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
