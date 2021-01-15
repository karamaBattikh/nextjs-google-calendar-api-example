export const normalizeCalendarData = (data) => {
  return {
    summary: data.summary || "",
    description: data.description || "",
    location: data.location || "",
    calendarID: data.id,
  };
};
