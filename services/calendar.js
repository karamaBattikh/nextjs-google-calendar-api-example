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

export const useCreateCalendar = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await fetch("/api/calendar/addCalendar", {
        method: "POST",
        body: JSON.stringify({ ...values }),
      });
      const result = await res.json();
      if (result.status !== 200) return Promise.reject({ ...result });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("get-all-calendar");
      },
      useErrorBoundary: false,
      renderError: true,
    }
  );
};
