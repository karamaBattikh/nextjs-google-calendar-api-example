import googleCalendar from "utils/googleCalendar";

export default (req, res) => {
  const calendar = googleCalendar;
  calendar.calendarList.list((err, response) => {
    console.log("🚀 ~ file: addCalendar.js ~ line 34 ~ err", err);
    if (err) {
      return res.status(500).json({
        message: "err in creation calendar",
      });
    } else {
      const calendarArray = response.data.items;
      console.log(
        "🚀 ~ file: getAllCalendar.js ~ line 42 ~ calendar.calendarList.list ~ calendarArray",
        calendarArray
      );
      res.status(200).json({
        data: calendarArray,
      });
    }
  });
};
