import React, {useState} from "react";
import { Link } from "react-router-dom";
import { search } from '../utils/BooksAPI';

import BookShelf from "./BookShelf";

export default function BookSearch(props) {
    const [query, setQuery] = useState("");
    const [searchedBooks, setSearchedBooks] = useState([]);

    const searchBooks = async (searchString) => {
        setQuery(searchString);

        const res = await search(searchString);
        res?.length?setSearchedBooks(res):setSearchedBooks([]);
    }

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
                        onChange={(event) => searchBooks(event.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <BookShelf books={searchedBooks} updateShelf={props.updateShelf} shelfTitle="Results" />
            </div>
        </div>
    );
}
