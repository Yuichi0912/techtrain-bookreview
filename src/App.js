// import { Router } from "react-router-dom";
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
import { PostReview } from "./components/PostReview";
import {Detail} from "./components/Detail"
import { Editbook } from "./components/Editbook";

export const App = () => {
  // return(
  // <div>
  //   <Router />
  // </div>
  // )
  const auth = useSelector((state) => state.auth.isLogIn);
  // console.log(state);

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
              <Route path="/new" element={<PostReview />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/edit/:id" element={<Editbook />} />
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
