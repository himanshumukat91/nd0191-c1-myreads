import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import { search } from "../utils/BooksAPI";
import { debounce } from "../utils/helpers";

import BookShelf from "./BookShelf";

BookSearch.propTypes = {
  myBooks: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default function BookSearch(props) {
  const [query, setQuery] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);

  const searchBooks = async (searchString) => {
    const books = await search(searchString);
    if(books?.length){
        setSearchedBooks(books);
        toast.info(`${books.length} books found for search - '${searchString}'`);
    } else {
        setSearchedBooks([]);
        toast.info(`No books found for search - '${searchString}'`);
    }
  };

  const debouncedSearch = useRef(debounce(searchBooks, 300)).current;

  searchedBooks?.forEach((book) => {
    const myBook = props.myBooks.find((b) => b.id === book.id);
    if (myBook) {
      book.shelf = myBook.shelf;
    } else {
      book.shelf = "none";
    }
  });

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              debouncedSearch(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        <BookShelf
          books={searchedBooks}
          updateShelf={props.updateShelf}
          shelfTitle="Results"
        />
      </div>
    </div>
  );
}
