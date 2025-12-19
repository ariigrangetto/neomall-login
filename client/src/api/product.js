export async function getProduts() {
  try {
    const response = await fetch("http://localhost:8080/products", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    return { status: response.status, products: data };
  } catch (error) {
    throw new Error("Error fetching data");
  }
}
