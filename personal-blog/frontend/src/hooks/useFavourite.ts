import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";

export function useFavouritesList() {
  return useQuery({
    queryKey: ["favourites"],
    queryFn: () => apiClient.favourites.list(),
  });
}
