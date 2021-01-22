import { useMutation, useQueryClient } from "react-query";

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
