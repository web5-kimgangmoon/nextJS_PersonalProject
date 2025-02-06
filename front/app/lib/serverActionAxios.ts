import axios from "axios";

const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_PATH,
  withCredentials: true,
});

export default serverAxios;
