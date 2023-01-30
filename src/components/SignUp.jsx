import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Compressor from "compressorjs";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch} from "react-redux";
import { logIn } from "../redux/authSlice";
import { useEffect } from "react";
import "./SignUp.scss";
import { url } from "../const";

export const SignUp = () => {
  const [image, setImage] = useState("");
  const [cookies, setCookie] = useCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const [errorDataMsg, setErrorDataMsg] = useState("");

  // バリデーションの設定

  const schema = yup.object({
    name: yup.string().required("・入力が必須の項目です。"),
    email: yup
      .string()
      .email("正しいメールアドレスの形式ではありません。")
      .required("・入力が必須の項目です。"),
    password: yup.string().required("・入力が必須の項目です。"),
  });

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: schema,
  });

  // console.log(values);
  // valuesにFormikで渡した値が入っている


  const onSignUp = () => {
    // ユーザー情報のPOST
    const data = values;
    console.log(data);
    axios
      .post(
        `${url}/users`,
        data
      )
      .then((res) => {
        console.log(res.data.token);
        const token = res.data.token;
        setCookie("token", token);
        dispatch(logIn());
        // ↓ユーザーアイコンのPOST

        console.log(image);
        if (!image) {
          return;
        }
        new Compressor(image, {
          quality: 0.6,
          success(result) {
            const formData = new FormData();
            // console.log(result);
            formData.append("icon", result, result.name);
            console.log(formData.get("icon"));
            // const toPostImgae = { iconUrl: formData };
            // console.log(toPostImgae);
            console.log(formData);
            axios
              .post(
                `${url}/uploads`,
                formData,
                {
                  headers: {
                    // "Content-Type": 'multipart/form-data',
                    Authorization: `Bearer ${cookies.token}`,
                  },
                }
              )
              .then(() => {
                console.log("Upload success");
                navigate("/");
              });
          },
          error(err) {
            console.log(err.message);
          },
        });
        throw new Error(res);
      })
      .catch(() => {
        setErrorDataMsg("アカウントを作成できませんでした ");
      });

    // console.log(image);
  };

  return (
    <div>
      <main className="signup">
        <h1>SignUpページ</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="username">ユーザー名</label>
          <input
            type="text"
            name="name"
            // nameとvalueの値一緒にしたら打てるようになった
            className="name-input"
            onChange={handleChange}
            value={values.name}
          />
          {errors.name && <div>{errors.name}</div>}
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            className="email-input"
          />
          {errors.email && <div>{errors.email}</div>}
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            className="password-input" 
          />
          {errors.password && <div>{errors.password}</div>}
          <label>ユーザーアイコンの登録</label>
          <input
            type="file"
            accept="image/png, image/jpg"
            onChange={handleImageChange}
            className="icon"
          ></input>
          {/* <img src={image} alt="" /> */}
          <button type="submit" onClick={onSignUp} className="signup-button">
            登録する
          </button>
        </form>
        <Link to="/login" className="login">ログインはこちら</Link>
        {/* <img src={image} alt="" /> */}
        <p className="error-message">{errorDataMsg}</p>
      </main>
    </div>
  );
};

// const options = {
//   method: "POST",
//   body: JSON.stringify(formdata),
//   headers: {
//     Accept: "*/*",
//     "Content-Type": "multipart/form-data",
//     authorization: `Bearer ${cookies.token}`,
//   },
// };
// delete options.headers["Content-Type"];
// console.log(options);
