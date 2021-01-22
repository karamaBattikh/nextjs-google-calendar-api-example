import getGoogleClient from "utils/clientGoogle";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });

  const calendar = await getGoogleClient(session?.accessToken);

  const {
    dayEvent,
    conference,
    description,
    endTime,
    startTime,
    summary,
    color = 0,
    idCalendar = "primary",
    attendees,
  } = JSON.parse(req.body);

  // Create a new event start date instance for temp uses in our calendar.
  const eventStartTime = new Date(dayEvent);
  eventStartTime.setHours(startTime?.split(":")[0], startTime?.split(":")[1]);

  // Create a new event end date instance for temp uses in our calendar.
  const eventEndTime = new Date(dayEvent);
  eventEndTime.setHours(endTime?.split(":")[0], endTime?.split(":")[1]);

  // Create a dummy event for temp uses in our calendar
  const event = {
    summary: summary,
    description: description,
    colorId: color,
    start: {
      dateTime: eventStartTime,
    },
    end: {
      dateTime: eventEndTime,
    },
    conferenceData: {
      createRequest: {
        requestId: "7qxalsvy0e",
      },
    },
    visibility: "public",
    attendees: [{ email: session.user.email, self: true }, ...attendees],
    // recurrence: ["RRULE:FREQ=DAILY;INTERVAL=2"],
  };

  return new Promise((resolver, reject) => {
    calendar.freebusy.query(
      {
        resource: {
          timeMin: eventStartTime,
          timeMax: eventEndTime,
          items: [{ id: idCalendar }],
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
        }
        const eventsArray = response?.data?.calendars[idCalendar].busy;

        // console.log(
        //   "🚀 ~ file: test2Calendar.js ~ line 74 ~ eventsArray",
        //   eventsArray
        // );

        if (eventsArray.length === 0)
          calendar.events.insert(
            {
              calendarId: idCalendar,
              conferenceDataVersion: conference ? 1 : 0,
              resource: event,
              sendNotifications: true,
              sendUpdates: "all",
            },
            (error, data) => {
              console.log("🚀 ~ file: addEvent.js ~ line 96 ~ data", data);
              if (error) {
                res.json({
                  status: error?.code,
                  message: error?.response?.statusText,
                  errors: error,
                  data: [],
                });
                reject();
              } else {
                res.json({
                  status: 200,
                  message: "Calendar event successfully created.",
                  data: data.data,
                  errors: null,
                });
                resolver();
              }
            }
          );

        // If event array is not empty log that we are busy.
        if (eventsArray.length !== 0) {
          res.json({
            status: err?.code,
            message: "Sorry I'm busy...",
            errors: "Sorry I'm busy...",
            data: eventsArray,
          });
          reject();
        }
      }
    );
  });
};
