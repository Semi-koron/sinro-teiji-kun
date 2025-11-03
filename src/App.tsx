import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./components/pages/dashboard";
import SignupPage from "./components/pages/signup";
import LoginPage from "./components/pages/login";
import EventPage from "./components/pages/event";
import CompanyPage from "./components/pages/company";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="event/:eventId" element={<EventPage />} />
        <Route path="company/:companyId" element={<CompanyPage />} />
      </Routes>
    </>
  );
}

export default App;
