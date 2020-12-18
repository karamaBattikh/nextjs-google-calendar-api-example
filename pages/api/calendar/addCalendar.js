import googleCalendar from "utils/googleCalendar";

export default (req, res) => {
  const { summary, description, emailList } = JSON.parse(req.body);

  const calendar = googleCalendar;
  calendar.calendars.insert(
    {
      resource: {
        summary: summary,
        description: description,
      },
    },
    (err, response) => {
      if (err) {
        return res.status(500).json({
          message: "calendar Creation Error ",
        });
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

        return res.status(200).json({
          message: "Calendar successfully created",
          data: data,
        });
      }
    }
  );
};
