import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import BookSearch from "./components/BookSearch";
import BookList from "./components/BookList";
import { getAll } from "./utils/BooksAPI";

import "./App.css";

function App() {
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    getAll().then((res) => {
      res && setMyBooks(res);
    });
  },[]);

  const updateShelf = (book, newShelf) => {
    let isFound = false;
    const updatedBooks = myBooks.map((i) => {
      if (i.id === book.id) {
        i.shelf = newShelf;
        isFound = true;
      }
      return i;
    });
    if (!isFound) {
      updatedBooks.push({ ...book, shelf: newShelf });
    }
    setMyBooks(updatedBooks);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/search"
          element={
            <BookSearch
              myBooks={myBooks}
              updateShelf={updateShelf}
            />
          }
        />
        <Route
          path="/"
          element={
            <BookList
              myBooks={myBooks}
              updateShelf={updateShelf}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
