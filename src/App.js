import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import RootPage from "./pages/Root";
import ThreadCreate from "./pages/ThreadCreate";
import ThreadDetail from "./pages/ThreadDetail";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import Header from "./Header";

const App = () => {
  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#FFC107',
      },
      secondary: {
        main: '#795548',
      },
    }
  });
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={`/`} element={<RootPage />} />
          <Route path={`/thread/new`} element={<ThreadCreate />} />
          <Route path={`/thread/:thread_id`} element={<ThreadDetail />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
