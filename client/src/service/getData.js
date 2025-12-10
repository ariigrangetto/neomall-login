export default async function getData() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Error fetching", e);
  }
}
