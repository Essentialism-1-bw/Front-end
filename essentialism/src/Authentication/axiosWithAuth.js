import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://bw-essentialism.herokuapp.com",
    headers: {
      Authorization: token
    }
  });
};

// axiosWithAuth().get("/api/users");
