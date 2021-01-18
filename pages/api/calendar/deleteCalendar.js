import getGoogleClient from "utils/clientGoogle";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });

  const { calendarID } = JSON.parse(req.body);

  const calendar = await getGoogleClient(session?.accessToken);

  return new Promise((resolve, reject) => {
    calendar.calendars.delete(
      {
        calendarId: calendarID,
      },
      (err) => {
        if (err) {
          res.json({
            status: err?.code,
            message: err?.errors[0]?.reason,
            errors: err,
            data: [],
          });
          reject("Error");
        } else {
          res.json({
            status: 200,
            message: "Calendar successfully deleted",
            data: [],
            errors: null,
          });
          resolve();
        }
      }
    );
  });
};
