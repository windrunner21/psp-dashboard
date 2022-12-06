import useSWR from "swr";
import { getUser } from "../requests/user";

function useUser() {
  const { data, mutate, error } = useSWR("descartes", getUser);

  const loading = !data && !error;
  const loggedOut =
    error && (error.response.status == 403 || error.response.status == 401);

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}

export default useUser;
