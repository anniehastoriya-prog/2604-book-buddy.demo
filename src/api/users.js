const API = import.meta.env.VITE_API;

/**
 * Fetches the account details of the logged in user.
 * A valid token is required.
 */
export async function getAccount(token) {
  try {
    const response = await fetch(API + "/users/me", {
      headers: { Authorization: "Bearer " + token },
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}
