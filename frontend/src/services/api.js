import axios from "axios";

const api = axios.create({
  baseURL: "https://faint-jasmine-naveenmaamidi-4166d8e2.koyeb.app/api",
  withCredentials: true, // so JWT cookie is sent & received
});

export default api;
