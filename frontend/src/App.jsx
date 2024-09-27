import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/client/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Jobs from "./components/client/Jobs";
import Browse from "./components/client/Browse";
import Profile from "./components/client/Profile";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
