import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { url } from "../const";
import "./PostReview.scss";

export const PostReview = () => {
  const [title, setTitle] = useState("");
  const [bookurl, setBookUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [cookies] = useCookies();
  const handleTitle = (e) => setTitle(e.target.value);
  const handleUrl = (e) => setBookUrl(e.target.value);
  const handleDetail = (e) => setDetail(e.target.value);
  const handleReview = (e) => setReview(e.target.value);

  // 投稿フォームの実装
  const onCreacteReview = () => {
    const data = {
      title: title,
      url: bookurl,
      detail: detail,
      review: review,
    };
    console.log(data);
    axios
      .post(`${url}/books`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="registerbooks">
      <form className="registerbooks-form">
      <h2>書籍登録画面</h2>

      <label>タイトル</label>
      <input
        type="text"
        className="registerbooks-form__title"
        onChange={handleTitle}
      ></input>
      <label>URL</label>
      <input
        type="text"
        className="registerbooks-form__url"
        onChange={handleUrl}
      ></input>
      <label>詳細</label>
      <input
        type="text"
        className="registerbooks-form__detail"
        onChange={handleDetail}
      ></input>
      <label>レビュー</label>
      <input
        type="text"
        className="registerbooks-form__review"
        onChange={handleReview}
      ></input>
      <button className="registerbooks-form__button" onClick={onCreacteReview}>
        投稿する
      </button>
      </form>
    </div>
  );
};
