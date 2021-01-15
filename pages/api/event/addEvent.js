import googleCalendar from "utils/googleCalendar";

export default (req, res) => {
  const {
    dayEvent,
    conference,
    description,
    endTime,
    startTime,
    summary,
    color = 1,
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
    attendees: attendees,
    // recurrence: ["RRULE:FREQ=DAILY;INTERVAL=2"],
  };

  const calendar = googleCalendar;
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
        return res.status(500).json({
          status: 500,
          message: "Free Busy Query Error",
          data: err,
        });
      }
      const eventsArray = response.data.calendars[idCalendar].busy;

      console.log(
        "🚀 ~ file: test2Calendar.js ~ line 74 ~ eventsArray",
        eventsArray
      );

      if (eventsArray.length === 0)
        calendar.events.insert(
          {
            calendarId: idCalendar,
            conferenceDataVersion: conference ? 1 : 0,
            resource: event,
            sendNotifications: true,
            sendUpdates: "all",
          },
          (err, data) => {
            console.log("🚀 ~ file: addEvent.js ~ line 96 ~ data", data);
            if (err) {
              return res.status(500).json({
                status: 500,
                message: "calendar Event Creation Error",
                data: err,
              });
            } else {
              return res.status(200).json({
                status: 200,
                message: "Calendar event successfully created.",
                data: data.data,
              });
            }
          }
        );

      // If event array is not empty log that we are busy.
      if (eventsArray.length !== 0) {
        return res.status(500).json({
          status: 500,
          message: "Sorry I'm busy...",
          data: eventsArray,
        });
      }
    }
  );
};
