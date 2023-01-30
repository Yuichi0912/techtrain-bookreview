import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Header } from "./components/Header";
import { LogIn } from "./components/LogIn";
import { SignUp } from "./components/SignUp";
import { Home } from "./components/Home";
import { useSelector } from "react-redux";
import { Profile } from "./components/Profile";

export const App = () => {
  const auth = useSelector((state) => state.auth.isLogIn);

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {auth ? (
            <>
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/signup" element={<Navigate to="/" />} />
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/profile" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};
