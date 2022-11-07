import { createContext, useState } from "react";

const ThemeContext = createContext();
//es un Componentes, lo crea react con createContext()

function ThemeWrapper(props) {
  //creamos todos los estados y funciones que queremos pasar por contexto
  const [darkMode, setDarkMode] = useState(false);

  const darkTheme = {
    backgroundColor: "black",
    color: "darkGray",
  };

  const lightTheme = {
    backgroundColor: "white",
    color: "black",
  };

  const darkThemeBtn = {
    backgroundColor: "red",
  };

  const lighThemeBtn = {
    backgorundColor: "lightblue",
  };

  const switchThemeBtn = () => {
    return darkMode ? darkThemeBtn : lighThemeBtn;
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const switchTheme = () => {
    return !darkMode ? lightTheme : darkTheme;
  };

  const passedContext = {
    switchThemeBtn,
    toggleTheme,
    switchTheme,
  };

  return (
    <ThemeContext.Provider value={passedContext}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeWrapper, ThemeContext };
