import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: { "Content-type": "application/json" },
});

export const productsApi = '/products';
