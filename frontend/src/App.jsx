import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/client/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
// import Navbar from "./components/shared/Navbar";
// import Footer from "./components/shared/Footer";
import Jobs from "./components/client/Jobs";
import Browse from "./components/client/Browse";
import Profile from "./components/client/Profile";
import JobDescription from "./components/client/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJobs from "./components/admin/PostJobs";
import AppliedApplicants from "./components/admin/AppliedApplicants";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobdescription/:id" element={<JobDescription />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
        {/* Admin login */}
        <Route path="/admin/companies" element={<Companies />} />
        <Route path="/admin/companies/create" element={<CompanyCreate />} />
        <Route path="/admin/companies/:id" element={<CompanySetup />} />
        <Route path="/admin/adminjobs" element={<AdminJobs />} />
        <Route path="/admin/postjobs" element={<PostJobs />} />
        <Route path="/admin/appliedApplicants/:jobid" element={<AppliedApplicants />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
