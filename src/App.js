import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import RootPage from "./pages/Root";
import ThreadCreate from "./pages/ThreadCreate";
import ThreadDetail from "./pages/ThreadDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<RootPage />} />
        <Route path={`/thread/new`} element={<ThreadCreate />} />
        <Route path={`/thread/:thread_id`} element={<ThreadDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
