import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useParams } from "react-router-dom";
import { url } from "../const";
import "./Detail.scss"

export const Detail = () => {
  const [bookDetail, setBookDetail] = useState("");

  const [cookies] = useCookies();
  const {id} = useParams();
//   console.log(id);
//   const { state } = useLocation();
//   const id = state;

  // 詳細画面のAPI取得
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

  return (
    <div className="book-detail">
      <h2>詳細画面</h2>
      {bookDetail ? (
        <>
          <p className="book-detail__title">{bookDetail.title}</p>
          <p className="book-detail__detail">{bookDetail.detail}</p>
          <p className="book-detail__url">{bookDetail.url}</p>
          <p className="book-detail__reviewer">{bookDetail.reviewer}</p>
          <p className="book-detail__review">{bookDetail.review}</p>
        </>
      ) : (
        <p>読み込み中です...</p>
      )}
    </div>
  );
};
