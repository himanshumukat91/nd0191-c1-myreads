import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import BookShelf from "./BookShelf";

BookList.propTypes = {
  myBooks: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default function BookList(props) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf
          key="currentlyReading"
          books={props.myBooks.filter(
            (book) => book.shelf === "currentlyReading"
          )}
          updateShelf={props.updateShelf}
          shelfTitle="Currently Reading"
        />
        <BookShelf
          key="wantToRead"
          books={props.myBooks.filter((book) => book.shelf === "wantToRead")}
          updateShelf={props.updateShelf}
          shelfTitle="Want to Read"
        />
        <BookShelf
          key="read"
          books={props.myBooks.filter((book) => book.shelf === "read")}
          updateShelf={props.updateShelf}
          shelfTitle="Read"
        />
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}
