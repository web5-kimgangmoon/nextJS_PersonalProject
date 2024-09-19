import axios from "axios";

const serverAxios = axios.create({
  headers: {
    Authorization: `Bearer ${"testAuth"}`,
  },
  baseURL: process.env.NEXT_PUBLIC_SERVER_PATH,
});

export default serverAxios;
