const API = import.meta.env.VITE_API;

/**
 * Fetches an array of the logged in user's reservations.
 * A valid token is required.
 */
export async function getReservations(token) {
  try {
    const response = await fetch(API + "/reservations", {
      headers: { Authorization: "Bearer " + token },
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/**
 * Requests the API to reserve the book with the given ID.
 * A valid token is required.
 */
export async function reserveBook(token, bookId) {
  const response = await fetch(API + "/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ bookId }),
  });
  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/**
 * Requests the API to delete the reservation with the given ID.
 * A valid token is required.
 */
export async function returnBook(token, reservationId) {
  const response = await fetch(API + "/reservations/" + reservationId, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });
  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
