import useSWR from "swr";
import { getUser } from "../requests/user";

function useUser() {
  const { data, error } = useSWR("api_get_user", getUser);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useUser;
