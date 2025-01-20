import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081/auth", // Backend endpoint
});

export default instance;