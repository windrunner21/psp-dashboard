import axios from "axios";
import { BATSIGN, HOST, PORT, CONNECTION } from "../constants";

export const getUser = () =>
  axios
    .get(`${CONNECTION}://${HOST}:${PORT}/descartes`, {
      headers: {
        "Content-Type": "application/json",
        batsign: BATSIGN,
      },
      withCredentials: true,
    })
    .then((res) => res.data);
