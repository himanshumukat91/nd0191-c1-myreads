import "../App.css";

export default function BookShelf(props) {
  const shelfBooks = (props.books || []).filter((book) => book.imageLinks);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelfBooks.length ? (
            shelfBooks.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                      }}
                    ></div>
                    <div className="book-shelf-changer">
                      <select
                        value={book.shelf}
                        onChange={(e) =>
                          props.updateShelf(book, e?.target?.value)
                        }
                      >
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {book.authors
                  ?book.authors.map((author, i) => (
                    <div key={author || i} className="book-authors">
                      {author}
                    </div>))
                  :null}
                </div>
              </li>
            ))
          ) : (
            <div>No Book Found</div>
          )}
        </ol>
      </div>
    </div>
  );
}
