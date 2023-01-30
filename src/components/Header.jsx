import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/authSlice";
import "./Header.scss";
import { url } from "../const";

export const Header = () => {
  const auth = useSelector((state) => state.auth.isLogIn); // authがサインイン状態かどうかはstateの状態により異なる
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [cookies, , removeCookie] = useCookies();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  // const auth = useSelector((state) => state.auth.isSignIn);

  useEffect(() => {
    axios
      .get(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.name);
        setUsername(res.data);
      })
      .catch((err) => {
        setErrorMessage(`ユーザーネームの取得に失敗しました。${err}`);
      });
  }, []);

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate("/profile");
  };

  const handleLogOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <h1>書籍レビューアプリ</h1>

      {auth ? (
        <>
          <p>ユーザー：{username.name}</p>
          <button onClick={handleLogOut} className="header__logout-button">
            ログアウト
          </button>
          <button onClick={handleEditProfile}>プロフィール画面へ</button>
        </>
      ) : (
        <button onClick={handleLogIn} className="header__login-button">
          ログイン
        </button>
      )}
    </header>
  );
};
