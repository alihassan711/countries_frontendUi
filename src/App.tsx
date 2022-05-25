import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Dashboard from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";

const theme = {
  typography: {
    h1: {
      fontSize: "clamp(16px, 2vw, 20px)",
      fontWeight: 800,
    },
    h2: {
      fontSize: "17px",
      fontWeight: 800,
      marginBottom: "1rem",
    },
    body1: {
      fontSize: "14px",
      fontWeight: 300,
    },
    body2: {
      fontSize: "14px",
      fontWeight: 600,
    },
  },
};

function App() {
  const [state, setState] = React.useState("light");

  return (
    <ThemeProvider theme={createMuiTheme(theme)}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Dashboard state={state} setState={setState} />}
          />
          <Route
            path="/:name"
            element={<CountryDetails state={state} setState={setState} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
