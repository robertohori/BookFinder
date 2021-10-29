import React from "react";
import Moment from "react-moment";
const BookList = ({ books }) => {
  let { docs } = books;

  return (
    <div className="books-list">
      <table>
        <caption className="sr-only" data-testid="table">
          List of Books
        </caption>
        <thead>
          <tr>
            <th>Title </th>

            <th>Author</th>
            <th>Published Date</th>
          </tr>
        </thead>
        <tbody>
          {
            docs.map((book) => (
              <tr key={book.key}>
                <td>
                  {book.cover_i ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/
                            ${book.cover_i} 
                            -S.jpg`}
                      alt=""
                      className="cover"
                    />
                  ) : (
                    <img
                      src="https://cdn2.iconfinder.com/data/icons/symbol-gray-set-3b/100/1-40-1024.png"
                      width="40px"
                      alt=""
                    />
                  )}
                  {book.title ? book.title : "Not informed"}
                </td>

                <td>{book.author_name ? book.author_name : "Not informed"}</td>
                <td>
                  {book.publish_date ? (
                    book.publish_date.length > 1 ? (
                      <ul>
                        {book.publish_date.map((date, i) => (
                          <li key={i}>
                            <Moment format="MMMM DD YYYY">
                              {new Date(date)}
                            </Moment>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <Moment format="MMMM DD YYYY">
                        {book.publish_date[0]}
                      </Moment>
                    )
                  ) : (
                    "Date not informed"
                  )}
                </td>
              </tr>
            ))
            /* {items.map((book) => (
              <BookList key={book.cover_i} book={book} />
            ))} */
          }
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
