import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getBook } from "../api/books";
import { reserveBook } from "../api/reservations";
import { useAuth } from "../auth/AuthContext";
// Book details- you can see the details of one book and if the user is logged in the user will be able to reserve it.
export default function BookDetails() {
  // Pulls the token from auth context. Will know if the user is logged in.
  const { token } = useAuth();
  //This reads the books ID from the url.
  const { id } = useParams();
  const navigate = useNavigate();
  // Nothing has been fetched
  const [book, setBook] = useState(null);
  // Not error has been come acrossed
  const [error, setError] = useState(null);
  // Fetching the book when the page loads.
  useEffect(() => {
    const syncBook = async () => {
      const data = await getBook(id);
      setBook(data);
    };
    syncBook();
  }, [id]);
  // Reserving the book.
  // It will run when the reserve button is clicked. Clears an old error, then it will try to reserve.
  // Then is will pass the token to the server so the serve will know hwo is reserving.
  // If it works the user will be taken to the account page.
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
