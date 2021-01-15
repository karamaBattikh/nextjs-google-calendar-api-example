import { useMutation, useQuery, useQueryClient } from "react-query";

export const fetchCalendars = async () => {
  const res = await fetch("/api/calendar/calendars");
  const result = await res.json();

  if (result?.status === 200) {
    return Promise.resolve(result?.data);
  } else {
    return Promise.reject(result?.message);
  }
};

export const useCalendars = () => {
  return useQuery("get-all-calendar", () => fetchCalendars());
};
