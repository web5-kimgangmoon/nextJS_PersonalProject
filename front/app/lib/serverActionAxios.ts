import axios from "axios";

const serverAxios = axios.create({
  baseURL: "/api",
});

export default serverAxios;
