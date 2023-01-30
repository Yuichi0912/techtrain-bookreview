import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Compressor from "compressorjs";
import { url } from "../const";
import "./Profile.scss";

export const Profile = () => {
  const [cookies] = useCookies();
  const [username, setUsername] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [iconImg, setIconImg] = useState("");
  const [image, setImage] = useState("");
  const handleUsernameChange = (e) => setEditUsername(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  useEffect(() => {
    // ユーザー情報の取得
    axios
      .get(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setUsername(res.data.name);
        setIconImg(res.data.iconUrl);
      })
      .catch(() => {
        console.log("ユーザー情報を取得できませんでした ");
      });
  }, []);

  // ユーザー名の変更
  const onEditUser = () => {
    const data = { name: editUsername };
    axios
      .put(`${url}/users`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log();
        setUsername(res.data.name);
      })
      .catch(() => {
        console.log("ユーザー名を変更できませんでした ");
      });
  };

  // アイコンの変更
  const onChangeImage = () => {
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
          .post(`${url}/uploads`, formData, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          })
          .then((res) => {
            setIconImg(res.data.iconUrl);
            console.log(res);
            console.log("Upload success");
          });
      },
    });
  };
  return (
    <div className="profile">
      <img src={iconImg} alt="" className="profile__icon"/>
      <input
        type="file"
        className="profile__changeicon"
        accept="image/png, image/jpg"
        onChange={handleImageChange}
      ></input>

      <button onClick={onChangeImage} className="profile__submit-changicon">
        アイコンを変更する
      </button>

      <h2 className="profile__username-tag">ユーザーネーム</h2>
      <p className="profile__username">{username}</p>
      <input
        type="text"
        name="name"
        className="profile__edituser"
        onChange={handleUsernameChange}
        value={editUsername}
      ></input>
      <button onClick={onEditUser} className="profile__submit-edituser">
        変更する
      </button>
    </div>
  );
};
