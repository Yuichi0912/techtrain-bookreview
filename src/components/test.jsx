export function SignUp() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessge] = useState();
  const [files, setFiles] = useState("");
  const [cookies, setCookie] = useCookies();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${url}users`, data)
      .then((res) => {
        const token = res.data.token;
        setCookie("token", res.data.token);
        dispatch(signIn());

        const file = files[0];
        console.log(file);
        if (!file) {
          return;
        }
        new Compressor(file, {
          quality: 0.6,
          success(result) {
            const formData = new FormData();
            console.log(result);
            formData.append("file", result, result.name);
            console.log(formData);
            axios
              .post(`${url}/uploads`, formData, {
                headers: {
                  Authorization: `Bearer ` + token,
                },
              })
              .then(() => {
                console.log("Upload success");
                navigate("/");
              });
          },
          error(err) {
            console.log(err.message);
          },
        });
      })
      .catch((err) => {
        setErrorMessge(`サインアップに失敗しました。 ${err}`);
      });

    if (auth) return <Navigate to="/" replace />;
  };

  const fileSet = (e) => {
    setFiles(e.target.files);
    console.log(e.target.files[0]);
  };

  return (
    <div>
      <Header />
      <main className="signup">
        <h2>ユーザー作成</h2>
        <p className="error-message">{errorMessage}</p>
        <div className="icon">
          <input id="file" type="file" onChange={fileSet}></input>
        </div>
        <img src={files} id="preview" alt="" />
        <br />
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">メールアドレス</label>
          <br />
          <input
            type="email"
            placeholder="email"
            className="email-input"
            {...register("email", {
              required: {
                value: true,
                message: "入力が必須の項目です。",
              },
            })}
          />
          {errors.email && <div>入力が必須の項目です</div>}
          <br />
          <label htmlFor="username">ユーザ名</label>
          <br />
          <input
            type="text"
            placeholder="username"
            className="name-input"
            {...register("name", {
              required: {
                value: true,
                message: "入力が必須の項目です。",
              },
            })}
          />
          <br />
          <label htmlFor="password">パスワード</label>
          <br />
          <input
            type="password"
            placeholder="password"
            className="password-input"
            {...register("password", {
              required: {
                value: true,
                message: "入力が必須の項目です。",
              },
              minLength: {
                value: 8,
                message: "8文字以上入力してください。",
              },
            })}
          />
          {errors.password && <div>入力が必須の項目です</div>}
          <br />
          <button type="submit" className="signup-button">
            作成
          </button>
        </form>
        <Link to="/login" className="login">
          ログイン
        </Link>
      </main>
    </div>
  );
}
