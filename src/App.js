import "./App.css";
import LogInPage from "./pages/LogInPage";
import PortScreen from "./pages/PortScreen";
import MenuPage from "./pages/MenuPage"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/PortScreen" element={<PortScreen />} />
        <Route path="/MenuPage" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}

export default App;
