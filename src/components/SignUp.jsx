import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Compressor from "compressorjs";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../redux/authSlice";
import { useEffect } from "react";

export const SignUp = () => {
  const auth = useSelector((state) => state.auth.isLogIn);
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

 useEffect(() => {
    if (auth) return navigate("/");
  }, []);

  const onSignUp = () => {
    // ユーザー情報のPOST
    const data = values;
    console.log(data);
    axios
      .post(
        "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/users",
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
                "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/uploads",
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
      <>
        <main>
          <h1>SignUpページ</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">ユーザー名</label>
            <br />
            <input
              type="text"
              name="name"
              // nameとvalueの値一緒にしたら打てるようになった
              className="username-input"
              onChange={handleChange}
              value={values.name}
            />
            <br />
            {errors.name && <div>{errors.name}</div>}
            <br />
            <label htmlFor="email">メールアドレス</label>
            <br />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
            />
            <br />
            {errors.email && <div>{errors.email}</div>}
            <br />
            <label htmlFor="password">パスワード</label>
            <br />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
            />
            <br />
            {errors.password && <div>{errors.password}</div>}
            <br />
            <label>ユーザーアイコンの登録</label>
            <br />
            <input
              type="file"
              accept="image/png, image/jpg"
              onChange={handleImageChange}
            ></input>
            <br />
            {/* <img src={image} alt="" /> */}
            <br />
            <button type="submit" onClick={onSignUp}>
              登録する
            </button>
          </form>
          <Link to="/login">ログインはこちら</Link>
          {/* <img src={image} alt="" /> */}
          <p>{errorDataMsg}</p>
        </main>
      </>
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
