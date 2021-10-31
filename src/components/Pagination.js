import React, { useState } from "react";

const PaginationComponent = ({
  totalRegister,
  callBackCurrentPage,
  currentpage,
  childFunc,
}) => {
  React.useEffect(() => {
    childFunc.current = updateCurrentPage;
  }, []);

  const updateCurrentPage = (props) => {
    startPages(props.totalRegister);
    setcurrentPage(props.page);
  };

  const [currentPage, setcurrentPage] = useState(currentpage);
  const [itemsPerPage] = useState(10);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  //const [pages, setPages] = useState([]);
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
    callBackCurrentPage(Number(event.target.id));
  };
  const startPages = (totalRegister) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalRegister / itemsPerPage); i++) {
      pages.push(i);
    }
    return pages;
  };
  let pages = startPages(totalRegister);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li key={number}>
          <button
            aria-current={currentPage === number}
            id={number}
            onClick={handleClick}
            aria-label={"Page " + number}
          >
            {number}
          </button>
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
    callBackCurrentPage(currentPage);
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
    callBackCurrentPage(currentPage);
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li>
        <button onClick={handleNextbtn}>Next page</button>
      </li>
    );
  }

  let pageDecrementBtn = null;
  if (currentPage > 1 && pages.length > 0) {
    pageDecrementBtn = (
      <li>
        <button onClick={handlePrevbtn}>Previous page</button>
      </li>
    );
  }

  return (
    <>
      <div id="paginationControl" role="navigation" aria-label="Pagination">
        <ul className="pageNumbers list">
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
        </ul>
      </div>
    </>
  );
};

export default PaginationComponent;
