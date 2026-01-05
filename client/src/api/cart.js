const API = import.meta.env.VITE_API;

export default async function getCart() {
  try {
    const response = await fetch(`${API}/cart`, {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    return { status: response.status, data: data };
  } catch (error) {
    throw new Error("Error fething data");
  }
}
