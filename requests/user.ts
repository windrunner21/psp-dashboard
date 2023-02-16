import axios from "axios";
import { HOST, PORT, CONNECTION } from "../constants";

export const getUser = () =>
  axios
    .get(`${CONNECTION}://${HOST}:${PORT}/descartes`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((res) => res.data);
