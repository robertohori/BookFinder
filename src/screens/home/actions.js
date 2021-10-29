import axios from "axios";
import { REQUEST_BOOKS, RECEIVE_BOOKS } from "./actionTypes";

export const requestBooks = (query) => ({
  type: REQUEST_BOOKS,
  query,
});

export const receiveBooks = ({ status, payload }) => ({
  type: RECEIVE_BOOKS,
  status,
  payload,
});

export const getBooks = ({ query, sort, qtdPage, page }) => {
  return function (dispatch) {
    dispatch(requestBooks(query));

    const url = `http://openlibrary.org/search.json?q=${query}${`&limit=10`}&page=${
      page ? page : 1
    }${
      sort === "title_desc" || sort === "title_asc"
        ? ""
        : sort
        ? `&sort=${sort}`
        : ""
    }`;
    return axios
      .get(url)
      .then((response) => {
        if (sort === "title_asc") {
          response.data.docs.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sort === "title_desc") {
          response.data.docs.sort((b, a) => a.title.localeCompare(b.title));
        }
        dispatch(
          receiveBooks({
            status: "success",
            payload: response.data,
          })
        );
      })
      .catch((error) => {
        dispatch(
          receiveBooks({
            status: "error",
            payload: error,
          })
        );
      });
  };
};
