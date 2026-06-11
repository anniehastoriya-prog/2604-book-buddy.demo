import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getAccount } from "../api/users";
import { getReservations, returnBook } from "../api/reservations";
import { useAuth } from "../auth/AuthContext";

export default function AccountPage() {
  const { token } = useAuth();
  const [account, setAccount] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  const syncAccount = async () => {
    const data = await getAccount(token);
    setAccount(data);
  };

  const syncReservations = async () => {
    const data = await getReservations(token);
    setReservations(data);
  };

  useEffect(() => {
    if (!token) return;
    syncAccount();
    syncReservations();
  }, [token]);

  const tryReturn = async (reservationId) => {
    setError(null);
    try {
      await returnBook(token, reservationId);
      syncReservations();
    } catch (e) {
      setError(e.message);
    }
  };

  if (!token) {
    return (
      <>
        <h1>Account</h1>
        <p>
          <Link to="/login">Log in</Link> or{" "}
          <Link to="/register">register</Link> to view your account.
        </p>
      </>
    );
  }

  if (!account) return <p>Loading...</p>;
  return (
    <>
      <h1>
        Welcome, {account.firstname} {account.lastname}!
      </h1>
      <p>Email: {account.email}</p>
      <h2>Reservations</h2>
      {reservations.length === 0 ? (
        <p>You have no reserved books.</p>
      ) : (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              <img src={reservation.coverimage} alt={reservation.title} />
              <p>{reservation.title}</p>
              <p>by {reservation.author}</p>
              <button onClick={() => tryReturn(reservation.id)}>Return</button>
            </li>
          ))}
        </ul>
      )}
      {error && <p role="alert">{error}</p>}
    </>
  );
}
