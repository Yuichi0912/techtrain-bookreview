import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/authSlice";

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
      .get(
        "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/users",
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.name);
        setUsername(res.data.name);
      })
      .catch((err) => {
        setErrorMessage(`ユーザーネームの取得に失敗しました。${err}`);
      });
  }, []);

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleLogOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigate("/login");
  };

  return (
    <>
      <header>
        <h1>書籍レビューアプリ</h1>

        {auth ? (
          <>
            <p>ユーザー：{username}</p>
            <button onClick={handleLogOut}>ログアウト</button>
          </>
        ) : (
          <button onClick={handleLogIn}>ログイン</button>
        )}
      </header>
    </>
  );
};
