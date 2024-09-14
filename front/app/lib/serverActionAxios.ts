import axios from "axios";

const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_PATH,
});

export default serverAxios;
