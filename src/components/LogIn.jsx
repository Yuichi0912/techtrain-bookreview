import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../redux/authSlice";
import { useEffect } from "react";


export const LogIn = () => {
  const auth = useSelector((state)=>state.auth.isLogIn)
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

  useEffect(()=>{
    if (auth) return navigate("/");  
  },[])

  const onLogIn = () => {
    const data = values;
    console.log(data);

    axios
      .post(
        "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/signin",
        data
      )
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
      <main className="login">
        <h1>Signinページ</h1>
        <form onSubmit={handleSubmit}>
          <label className="email-label" data-testid="email-label">
            メールアドレス
          </label>
          <br />
          <input
            type="email"
            name="email"
            className="email-input"
            data-testid="email-input"
            onChange={handleChange}
            value={values.email}
            // required
          />
          <br />
          {errors.email && <div>{errors.email}</div>}
          <br />
          <label className="password-label" data-testid="password-label">
            パスワード
          </label>
          <br />
          <input
            type="password"
            name="password"
            className="password-input"
            data-testid="password-input"
            onChange={handleChange}
            value={values.password}
            // required
          />
          <br />
          {errors.password && <div>{errors.password}</div>}
          <br />
          <button
            type="button"
            className="login-button"
            data-testid="login-button"
            onClick={onLogIn}
          >
            ログイン
          </button>
          <br />
          <br />
        </form>

        <Link to="/signup">アカウントの新規作成はこちら</Link>
        <p>{errorLogInMsg}</p>
      </main>
    </div>
  );
};