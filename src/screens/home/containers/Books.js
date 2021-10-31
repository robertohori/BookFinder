import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import isEmpty from "lodash/isEmpty";
import BookList from "../components/BookList";
import Pagination from "../../../components/Pagination";
import { getBooks } from "../actions";
import debounce from "lodash/debounce";
const renderBooksList = (callOrderBy, data, query, currentPage, sort) => {
  if (isEmpty(data)) {
    return null;
  }
  let { numFound } = data;

  return (
    <>
      <p role="alert" className="sr-only">
        End of loading
      </p>
      <h2>{`Search results for: ${query}`}</h2>
      <p>Total results: {numFound}</p>
      {numFound > 0 ? (
        <>
          <BookList
            books={data}
            currentpage={currentPage}
            totalRegister={numFound}
          ></BookList>
        </>
      ) : null}
    </>
  );
};

const Books = ({ getBooks, data, isFetching, query, error }) => {
  const [sort, setSort] = useState("");
  const [currentpage, setcurrentPage] = useState(1);
  const [title, setTitle] = useState(query);
  const childFunc = React.useRef(null);
  const callOrderBy = ({ sort }) => {
    setSort(sort);
    setcurrentPage(1);
    debouncedGetBooks({ query: title, currentPage: 1, sort: sort });
    childFunc.current({ page: 1 });
  };

  const callBackCurrentPage = (currentPage) => {
    setcurrentPage(currentPage);

    debouncedGetBooks({ query: title, currentPage: currentPage, sort: sort });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setcurrentPage(1);

    debouncedGetBooks({ query: title, currentPage: 1, sort: sort });
    childFunc.current({ page: 1 });
  };

  const debouncedGetBooks = debounce(({ query, currentPage, sort }) => {
    getBooks({ query: query, page: currentPage, sort: sort });
  }, 700);

  let jsxStr = "";

  if (isFetching) {
    jsxStr = (
      <p role="alert" data-testid="loading">
        Loading...
      </p>
    );
  } else if (!isEmpty(error)) {
    jsxStr = (
      <p role="alert">
        We are having a issue with our server, please try again
      </p>
    );
  } else {
    jsxStr = renderBooksList(callOrderBy, data, query, currentpage, sort);
  }
  return (
    <>
      <div className="search-books">
        <Form className="search-books--form" onSubmit={handleOnSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Book's name</Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Harry Potter, Food and Love"
              aria-describedby="descSearch"
              tabIndex="0"
              data-testid="search"
            />

            <Form.Text className="text-muted" id="descSearch">
              Search the world's most comprehensive index of full-text books.
            </Form.Text>
            <Button variant="validBlue" type="submit" data-testid="toggle">
              Search
            </Button>
          </Form.Group>
        </Form>
      </div>
      <div className="books">
        {data && data.numFound > 0 ? (
          <div>
            <span>Order by: </span>
            <ul className="topButtons list">
              <li>
                <button
                  aria-label={`Order by most editions ${
                    sort === "editions" ? "selected" : ""
                  }`}
                  onClick={(event) =>
                    callOrderBy({
                      // totalRegister: numFound,
                      sort: "editions",
                    })
                  }
                  aria-current={sort === "editions"}
                >
                  Most Editions
                </button>
              </li>
              <li>
                <button
                  aria-label={`Order by first published ${
                    sort === "old" ? "selected" : ""
                  }`}
                  onClick={(event) =>
                    callOrderBy({
                      //  totalRegister: numFound,
                      sort: "old",
                    })
                  }
                  aria-current={sort === "old"}
                >
                  First Published
                </button>
              </li>
              <li>
                <button
                  aria-label={`Order by most recent ${
                    sort === "new" ? "selected" : ""
                  }`}
                  onClick={(event) =>
                    callOrderBy({
                      //totalRegister: numFound,
                      sort: "new",
                    })
                  }
                  aria-current={sort === "new"}
                >
                  Most Recent
                </button>
              </li>
              <li>
                <button
                  aria-label={`Order by random ${
                    sort === "random" ? "selected" : ""
                  }`}
                  onClick={(event) =>
                    callOrderBy({
                      //totalRegister: numFound,
                      sort: "random",
                    })
                  }
                  aria-current={sort === "random"}
                >
                  Random
                </button>
              </li>
              <li>
                <button
                  aria-label={`Order by title ${
                    sort === "title_asc" ? "selected" : ""
                  }`}
                  onClick={(event) =>
                    callOrderBy({
                      // totalRegister: numFound,
                      sort: "title_asc",
                    })
                  }
                  aria-current={sort === "title_asc"}
                >
                  Title
                </button>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
        {jsxStr}
        <Pagination
          totalRegister={data ? data.numFound : 0}
          currentpage={currentpage}
          callBackCurrentPage={callBackCurrentPage}
          childFunc={childFunc}
        ></Pagination>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getBooks,
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  let { data, isFetching, query, error } = state.books;
  return {
    data,
    isFetching,
    query,
    error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Books);
