import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.API_HOST ?? process.env.NEXT_PUBLIC_API_HOST}/api`,
});

export default instance;
