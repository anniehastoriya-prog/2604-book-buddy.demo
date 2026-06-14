import { Routes, Route } from "react-router";
import Layout from "./layout/Layout";
import Register from "./auth/Register";
import Login from "./auth/Login";
import BooksPage from "./books/BooksPage";
import BookDetails from "./books/BookDetails";
import AccountPage from "./account/AccountPage";
import Error404 from "./Error404.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<BooksPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
