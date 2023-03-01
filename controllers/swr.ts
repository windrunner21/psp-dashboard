import useSWR from "swr";
import { getPayments, getTransactions } from "../requests/payments";
import { getUser } from "../requests/user";

export function useUser() {
  const { data, mutate, error } = useSWR("descartes", getUser);

  const loading = !data && !error;
  const loggedOut =
    error && error.code == "ERR_NETWORK"
      ? true
      : error && (error.response.status == 403 || error.response.status == 401);

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}

export function usePayments() {
  const { data, error } = useSWR("all-payments", getPayments);

  const loading = !data && !error;

  return {
    loadingPayments: loading,
    payments: data,
  };
}

export function useTransactions() {
  const { data, error } = useSWR("all-transactions", getTransactions);

  const loading = !data && !error;

  return {
    loadingTransactions: loading,
    transactions: data,
  };
}
