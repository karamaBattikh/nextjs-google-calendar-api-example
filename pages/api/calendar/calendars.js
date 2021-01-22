import getGoogleClient from "utils/clientGoogle";
import { normalizeCalendarData } from "utils/normalizeData";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });

  const calendar = await getGoogleClient(session?.accessToken);

  return new Promise((resolver, reject) => {
    calendar.calendarList.list(
      {
        minAccessRole: "writer",
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
          const calendarArray = response?.data?.items;

          const calendarListNormalized = calendarArray.map((calendar) =>
            normalizeCalendarData(calendar)
          );

          res.json({
            status: 200,
            message: "get all calendar with successful",
            errors: null,
            data: calendarListNormalized,
          });
          resolver();
        }
      }
    );
  });
};
