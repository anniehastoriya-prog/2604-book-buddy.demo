import { useEffect, useState } from "react";
import { getBooks } from "../api/books";
import BookList from "./BookList";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  // Fetching the books.
  // Calls the API getBooks to fetch the whole list and store it in setBooks
  const syncBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };
  // Runs once when the page loads.
  useEffect(() => {
    syncBooks();
  }, []);

  return (
    <>
      <h1>Books</h1>
      <BookList books={books} />
    </>
  );
}
