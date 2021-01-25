import getGoogleClient from "utils/clientGoogle";
import { normalizeEventData } from "utils/normalizeData";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });

  const {
    query: { event },
  } = req;

  const calendar = await getGoogleClient(session?.accessToken);

  return new Promise((resolver, reject) => {
    calendar.events.list(
      {
        calendarId: "primary",
      },
      (err, response) => {
        if (err) {
          res.json({
            status: err?.code,
            message: err?.response?.statusText,
            errors: err,
            data: [],
          });
          reject();
        } else {
          const eventData = response?.data?.items;

          const eventListNormalized = eventData.map((event) =>
            normalizeEventData(event)
          );

          //   console.log("eventListNormalized", eventListNormalized);

          res.json({
            status: 200,
            message: "get all calendar with successful",
            errors: null,
            data: eventListNormalized,
          });
          resolver();
        }
      }
    );
  });
};
