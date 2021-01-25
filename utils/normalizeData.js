import { CALENDAR_COLOR } from "utils/constants";

import { getDate, getHours, getMinutes } from "date-fns";

export const normalizeCalendarData = (data) => {
  return {
    summary: data?.summary || "",
    description: data?.description || "",
    location: data?.location || "",
    backgroundColor: data?.backgroundColor,
    calendarID: data?.id,
  };
};

export function formatTime(time) {
  const h = getHours(new Date(time));
  const m = getMinutes(new Date(time));

  const hh = h.toString().length === 1 ? `0${h}` : h;
  const mm = m.toString().length === 1 ? `0${m}` : m;
  return `${hh}:${mm}`;
}

export const normalizeEventData = (data) => {
  // console.log(
  //   "🚀 ~ file: normalizeData.js ~ line 25 ~ normalizeEventData ~ data",
  //   data
  // );
  return {
    summary: data?.summary || "",
    description: data?.description || "",
    color: CALENDAR_COLOR[data?.colorId || 0],
    eventID: data?.id,
    calendarId: data?.iCalUID,
    endTime: formatTime(new Date(data?.end?.dateTime)),
    startTime: formatTime(new Date(data?.start?.dateTime)),
    date: new Date(data?.start?.dateTime),
    attendees: data?.attendees,
    creator: data?.creator,
    day: getDate(new Date(data?.start?.dateTime)),
    recurrence: data?.recurrence || "",
  };
};
