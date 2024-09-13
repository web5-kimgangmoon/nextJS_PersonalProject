import axios from "axios";

const serverAxios = axios.create({
  baseURL: "http://localhost:3080/api",
});

export default serverAxios;
