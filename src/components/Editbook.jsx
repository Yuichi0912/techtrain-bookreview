import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../const";
import { useState } from "react";
import "./Editbook.scss";

export const Editbook = () => {
  const [title, setTitle] = useState("");
  const [bookurl, setBookUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const handleTitle = (e) => setTitle(e.target.value);
  const handleUrl = (e) => setBookUrl(e.target.value);
  const handleDetail = (e) => setDetail(e.target.value);
  const handleReview = (e) => setReview(e.target.value);
  const [cookies] = useCookies();
  const [bookDetail, setBookDetail] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // 一覧の取得
  useEffect(() => {
    axios
      .get(`${url}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setBookDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 情報の更新
  const onEditBook = () => {
    const data = {
      title: title,
      url: bookurl,
      detail: detail,
      review: review,
    };

    axios
      .put(`${url}/books/${id}`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log(res);

        axios
          .get(`${url}/books/${id}`, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          })
          .then((res) => {
            setBookDetail(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 情報の削除
  const onDeleteBook = () => {
    axios
      .delete(`${url}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="book-detail">
      <h2>編集画面</h2>

      {bookDetail ? (
        <>
          <p className="book-detail__title">{bookDetail.title}</p>
          <input
            type="text"
            className="editbooks-form__title"
            onChange={handleTitle}
            // value={bookDetail.title}
          />
          <p className="book-detail__detail">{bookDetail.detail}</p>
          <input
            type="text"
            className="editbooks-form__detail"
            onChange={handleDetail}
          />
          <p className="book-detail__url">{bookDetail.url}</p>
          <input
            type="text"
            className="editbooks-form__url"
            onChange={handleUrl}
          />
          <p className="book-detail__review">{bookDetail.review}</p>
          <input
            type="text"
            className="editbooks-form__review"
            onChange={handleReview}
          />
          <button onClick={onEditBook} className="editbooks-form__changebutton">
            変更する
          </button>
          <button
            onClick={onDeleteBook}
            className="editbooks-form__deletebutton"
          >
            レビューを削除する
          </button>
        </>
      ) : (
        <p>読み込み中です...</p>
      )}
    </div>
  );
};
