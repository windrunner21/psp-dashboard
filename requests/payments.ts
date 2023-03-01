import axios from "axios";
import { HOST, PORT, CONNECTION } from "../constants";

export const getPayments = () =>
  axios
    .get(`${CONNECTION}://${HOST}:${PORT}/test/payments`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((res) => res.data);

export const getTransactions = () =>
  axios
    .get(`${CONNECTION}://${HOST}:${PORT}/test/transactions`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((res) => res.data);
