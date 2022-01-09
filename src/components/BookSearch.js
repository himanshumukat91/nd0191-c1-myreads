import React, { useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../utils/BooksAPI";
import { debounce } from "../utils/helpers";

import BookShelf from "./BookShelf";

export default function BookSearch(props) {
  const [query, setQuery] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);

  const searchBooks = async (searchString) => {
    const books = await search(searchString);
    books?.length ? setSearchedBooks(books) : setSearchedBooks([]);
  };

  const debouncedSearch = debounce(searchBooks, 300);

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
