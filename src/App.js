import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { LogIn } from "./components/LogIn";
import { SignUp } from "./components/SignUp";
import { UserPage } from "./components/UserPage";
import { Home } from "./components/Home";

export const App = () => {

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Home />} />
              <Route path="/userpage" element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  );
};
