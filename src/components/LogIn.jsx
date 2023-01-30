import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/authSlice";
import { useEffect } from "react";
import "./LogIn.scss";
import { url } from "../const";

export const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorLogInMsg, setErrorLogInMsg] = useState("");
  const [, setCookie] = useCookies();

  const schema = yup.object({
    email: yup
      .string()
      .email("正しいメールアドレスの形式ではありません。")
      .required("・入力が必須の項目です。"),
    password: yup.string().required("・入力が必須の項目です。"),
  });

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: schema,
  });

  const onLogIn = () => {
    const data = values;
    console.log(data);

    axios
      .post(`${url}/signin`, data)
      .then((res) => {
        console.log(res.data.token);
        const token = res.data.token;
        setCookie("token", token);
        dispatch(logIn());
        navigate("/");
        // throw new Error(res);
      })
      .catch(() => {
        setErrorLogInMsg("ログインに失敗しました。");
      });
  };

  return (
    <div>
      <main className="login-page">
        <h1>ログインする</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <label className="email-label" data-testid="email-label">
            メールアドレス
          </label>
          <input
            type="email"
            name="email"
            className="email-input"
            data-testid="email-input"
            onChange={handleChange}
            value={values.email}
            // required
          />
          {errors.email && <div>{errors.email}</div>}
          <label className="password-label" data-testid="password-label">
            パスワード
          </label>
          <input
            type="password"
            name="password"
            className="password-input"
            data-testid="password-input"
            onChange={handleChange}
            value={values.password}
            // required
          />
          {errors.password && <div>{errors.password}</div>}
          <button
            type="button"
            className="login-button"
            data-testid="login-button"
            onClick={onLogIn}
          >
            ログイン
          </button>
        </form>

        <Link to="/signup" className="new-account">
          アカウントの新規作成はこちら
        </Link>
        <p className="error-message">{errorLogInMsg}</p>
      </main>
    </div>
  );
};
