import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./components/pages/dashboard";
import SignupPage from "./components/pages/signup";
import LoginPage from "./components/pages/login";
import EventPage from "./components/pages/event";
import CompanyPage from "./components/pages/company";
import CompanyCreatePage from "./components/pages/company/create";
import ProfilePage from "./components/pages/signup/profile";
import EventCreatePage from "./components/pages/event/create";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="signup/profile" element={<ProfilePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="event/create" element={<EventCreatePage />} />
        <Route path="event/:eventId" element={<EventPage />} />
        <Route path="company/create" element={<CompanyCreatePage />} />
        <Route path="company/:companyId" element={<CompanyPage />} />
      </Routes>
    </>
  );
}

export default App;
