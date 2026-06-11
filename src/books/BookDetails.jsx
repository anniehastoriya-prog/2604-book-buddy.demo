import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getBook } from "../api/books";
import { reserveBook } from "../api/reservations";
import { useAuth } from "../auth/AuthContext";

export default function BookDetails() {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const syncBook = async () => {
      const data = await getBook(id);
      setBook(data);
    };
    syncBook();
  }, [id]);

  const tryReserve = async () => {
    setError(null);
    try {
      await reserveBook(token, book.id);
      navigate("/account");
    } catch (e) {
      setError(e.message);
    }
  };

  if (!book) return <p>Loading...</p>;
  return (
    <article>
      <h1>{book.title}</h1>
      <p>by {book.author}</p>
      <img src={book.coverimage} alt={book.title} />
      <p>{book.description}</p>
      <p>{book.available ? "Available" : "Checked out"}</p>
      {token && (
        <button onClick={tryReserve} disabled={!book.available}>
          Reserve
        </button>
      )}
      {error && <p role="alert">{error}</p>}
    </article>
  );
}
