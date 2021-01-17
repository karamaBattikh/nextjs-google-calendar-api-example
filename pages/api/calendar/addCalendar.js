import getGoogleClient from "utils/clientGoogle";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });

  const calendar = await getGoogleClient(session?.accessToken);

  const { summary, description, emailList } = JSON.parse(req.body);

  return new Promise((resolver, reject) => {
    calendar.calendars.insert(
      {
        resource: {
          summary: summary,
          description: description,
        },
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
          const { data } = response;

          emailList?.map((email) => {
            calendar.acl.insert({
              calendarId: data.id,
              resource: {
                role: "writer",
                scope: {
                  type: "user",
                  value: email,
                },
              },
              sendNotifications: true,
            });
          });

          res.json({
            status: 200,
            message: "Calendar successfully created",
            data: data,
            errors: null,
          });
          resolver();
        }
      }
    );
  });
};
