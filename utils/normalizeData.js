import { LOADING, CALENDAR_COLOR, SUCCESS, ERROR } from "utils/constants";

export const normalizeCalendarData = (data) => {
  return {
    summary: data?.summary || "",
    description: data?.description || "",
    location: data?.location || "",
    backgroundColor: data?.backgroundColor,
    calendarID: data?.id,
  };
};
