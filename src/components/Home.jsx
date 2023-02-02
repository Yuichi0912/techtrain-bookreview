import { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./Home.scss";
import { url } from "../const";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const [cookies] = useCookies();
  const [lists, setLists] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // レビュー一覧画面の実装
  useEffect(() => {
    axios
      .get(
        `${url}/books?offset=0`, // 1件目のデータが先頭に表示されている状態
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then((res) => {
        setLists(res.data);
      })
      .catch((err) => {
        setErrorMessage(`一覧の取得に失敗しました。${err}`);
      });
  }, []);

  // ページ番号クリック→遷移の実装
  const handlePageClick = (e) => {
    const offsetNumber = e.selected * 10; // e.selected: クリックした数字-1が取得できている

    axios
      .get(
        `${url}/books?offset=${offsetNumber}`, // 1件目のデータが先頭に表示されている状態
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then((res) => {
        setLists(res.data);
      })
      .catch((err) => {
        setErrorMessage(`一覧の取得に失敗しました。${err}`);
      });
  };

  // logの送信
  const onPostLogs = (id) => {
    console.log(id);
    const log = { selectBookId: id };
    axios
      .post(`${url}/logs`, log, {
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
    <div className="review-page">
      <main>
        <p className="review-list__errormsg">{errorMessage}</p>
        <h1>書籍レビュー一覧</h1>
        <button className="review-list__registerbutton" onClick={() => navigate("/new")}>書籍を登録する</button>
        {lists.map((lists) => {
          // console.log(lists);
          return (
            <div key={lists.id} className="review-lists">
              <Link
                to={`/detail/${lists.id}`}
                // state={lists.id}
                className="review-lists__title"
                onClick={() => onPostLogs(lists.id)}
              >
                {lists.title}
              </Link>
              <p className="review-lists__reviewer">
                レビュワー:{lists.reviewer}
              </p>
              <a href={lists.url} className="review-lists__url">
                {lists.url} 
              </a>
              <p className="review-lists__review">▶︎{lists.review}</p>
              
            </div>
          );
        })}

        <ReactPaginate
          breakLabel={"..."}
          //   marginPagesDisplayed={1}
          //   pageRangeDisplayed={2}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          previousLabel="<"
          previousClassName="pagination__previous"
          nextLabel=">"
          nextClassName="pagination__next"
          activeClassName={"active"}
          onPageChange={handlePageClick}
          pageCount={6}
        />
      </main>
    </div>
  );
};
