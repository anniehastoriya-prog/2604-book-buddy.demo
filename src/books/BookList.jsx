import { Link } from "react-router";

export default function BookList({ books }) {
  return (
    <ul>
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </ul>
  );
}

function BookListItem({ book }) {
  return (
    <li>
      <Link to={"/books/" + book.id}>
        <img src={book.coverimage} alt={book.title} />
        <p>{book.title}</p>
      </Link>
    </li>
  );
}
