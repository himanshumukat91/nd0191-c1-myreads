import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  }, []);

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
      toast.success(createSuccessToast(book.title, newShelf));
    } catch (e) {
      toast.error(
        `Error while updating book '${book.title}' to '${newShelf}''. Please try again`
      );
    }
  };

  const createSuccessToast = (title = "", shelf = "") => {
    switch(shelf) {
      case "none":
        return `'${title}' successfully removed from library`
      default:
        return `'${title}' successfully added to '${shelf}'`
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/search"
            element={<BookSearch myBooks={myBooks} updateShelf={updateShelf} />}
          />
          <Route
            path="/"
            element={<BookList myBooks={myBooks} updateShelf={updateShelf} />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-center" autoClose={2500} closeOnClick newestOnTop />
    </div>
  );
}

export default App;
