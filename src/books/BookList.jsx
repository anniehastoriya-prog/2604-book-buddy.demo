import { Link } from "react-router";
// Takes a list of book that th euser is able to click on, on the page.
//Receives a books array as prop and loops over it.
// .map Will walk through every book in the array and produces one BookListItem.
// key={book.id}- its a unique key on each item in the list.
export default function BookList({ books }) {
  return (
    <ul>
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </ul>
  );
}
// Renders a single book.
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
