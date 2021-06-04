import axios from "axios";
//export const serverUrl = "http://localhost:8080/";
let serverPath = "https://digital-kings-default-rtdb.firebaseio.com/";
// serverPath = "https://react-hooks-update-43fa9.firebaseio.com/";
export const serverUrl = serverPath;
export const digitalKingsKey =
    "https://digital-kings-default-rtdb.firebaseio.com/" === serverUrl
        ? "AIzaSyAH-ld0rTLDjpowNhn0LtPcn3kYORKEdQA"
        : "AIzaSyBWuEYCR82Lcs3zwczUc82DmvyIgRfwKI4";
export const API = axios.create({
    baseURL: serverUrl,
    headers: {
        "Access-Control-Allow-Origin": false,
        withCredentials: true
    }
});
const nodeServerUrl = "http://localhost:3004/";
export const APINode = axios.create({
    baseURL: nodeServerUrl,
    headers: {
        "Access-Control-Allow-Origin": false,
        withCredentials: true
    }
});

// API.interceptors.request.use(
//   function (config) {
//     const token = localStorage.getItem("token");
//     if (token) config.headers["token"] = "" + token;

//     const domain = "" + localStorage.getItem("domain");
//     if (domain) config.headers["domain"] = "" + domain;

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
