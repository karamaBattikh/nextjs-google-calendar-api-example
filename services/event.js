import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUnixTime } from "date-fns";

export const fetchEvents = async (date) => {
  const res = await fetch(`/api/event/events?month=${date}`);
  const result = await res.json();

  if (result?.status === 200) {
    return Promise.resolve(result?.data);
  } else {
    return Promise.reject(result?.message);
  }
};

export const useEvents = (dayClick) => {
  const date = getUnixTime(dayClick);
  return useQuery("get-all-event", () => fetchEvents(date));
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await fetch("/api/event/addEvent", {
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
