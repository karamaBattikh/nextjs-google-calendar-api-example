// Require google from googleapis package.
const { google } = require("googleapis");

export default (req, res) => {
  const {
    dayEvent,
    conference,
    description,
    endTime,
    startTime,
    title,
  } = JSON.parse(req.body);

  // Require oAuth2 from our google instance.
  const { OAuth2 } = google.auth;

  // Create a new instance of oAuth and set our Client ID & Client Secret.
  const oAuth2Client = new OAuth2(
    process.env.GOOGLE_ID,
    process.env.GOOGLE_SECRET
  );

  // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
  oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  // Create a new event start date instance for temp uses in our calendar.
  const eventStartTime = new Date(dayEvent);
  eventStartTime.setHours(startTime?.split(":")[0], startTime?.split(":")[1]);

  // Create a new event end date instance for temp uses in our calendar.
  const eventEndTime = new Date(dayEvent);
  eventEndTime.setHours(endTime?.split(":")[0], endTime?.split(":")[1]);

  // Create a dummy event for temp uses in our calendar
  const event = {
    summary: title,
    description: description,
    colorId: 3,
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
    sendNotifications: true,
    attendees: [
      { email: "karama.battikh@oyez.fr" },
      { email: "battikh.karama@gmail.com" },
    ],
    // recurrence: ["RRULE:FREQ=DAILY;INTERVAL=2"],
  };

  // Create a new calender instance.
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  calendar.freebusy.query(
    {
      resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        items: [{ id: "primary" }],
      },
    },
    (err, response) => {
      if (err) {
        res.status(500).json({
          error: {
            code: 500,
            message: "Free Busy Query Error",
          },
        });
      }
      const eventsArray = response.data.calendars.primary.busy;

      console.log(
        "🚀 ~ file: test2Calendar.js ~ line 74 ~ eventsArray",
        eventsArray
      );

      if (eventsArray.length === 0)
        calendar.events.insert(
          {
            calendarId: "primary",
            conferenceDataVersion: conference ? 1 : 0,
            resource: event,
          },
          (err) => {
            if (err) {
              res.status(500).json({
                error: {
                  code: 500,
                  message: "calendar Event Creation Error ",
                },
              });
            } else {
              res
                .status(200)
                .send({ message: "Calendar event successfully created." });
            }
          }
        );

      // If event array is not empty log that we are busy.
      if (eventsArray.length !== 0) {
        res.status(500).send({
          error: {
            code: 500,
            message: "Sorry I'm busy...",
          },
        });
      }
    }
  );
};
