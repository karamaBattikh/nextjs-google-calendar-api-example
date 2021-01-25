import getGoogleClient from "utils/clientGoogle";
import { normalizeEventData } from "utils/normalizeData";
import { getSession } from "next-auth/client";
import { isSameMonth, fromUnixTime } from "date-fns";

export default async (req, res) => {
  const session = await getSession({ req });

  const {
    query: { month },
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

          const eventListNormalized = eventData.reduce((acc, event) => {
            if (
              isSameMonth(fromUnixTime(month), new Date(event?.start?.dateTime))
            ) {
              acc.push(normalizeEventData(event));
            }
            return acc;
          }, []);

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
