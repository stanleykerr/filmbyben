import useSWR from "swr";

export const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((r) => r.json());

export function useUser() {
  const { data, mutate } = useSWR("/api/me", fetcher);
  // if data is not defined, the query has not completed
  const loading = !data;
  const user = data?.user;
  return [user, { mutate, loading }];
}
