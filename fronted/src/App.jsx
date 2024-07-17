import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { themesOptions } from "../styles/Themes.jsx";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import { GlobalStyles } from "../styles/GlobalStyles.jsx";

const App = () => {
  const [theme, setTheme] = useState(() => {
    return themesOptions[0].value;
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
