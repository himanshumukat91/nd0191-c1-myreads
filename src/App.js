import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import BookSearch from "./components/BookSearch";
import BookList from "./components/BookList";
import { getAll, update } from "./utils/BooksAPI";

import "./App.css";

function App() {
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    getAll().then((res) => {
      res && setMyBooks(res);
    });
  },[]);

  const updateShelf = async (book, newShelf) => {
    try {
      let isFound = false;
      await update(book, newShelf);
      //Not using API response but making sure to update state only on success
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
    } catch (e) {
      alert(`Error while updating shelf of book ${book.title} to ${newShelf}. Please try again`);
    }
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
