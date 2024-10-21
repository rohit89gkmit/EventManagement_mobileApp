export const countEvents = (eventList: eventFormDataType[]) => {
  const today = new Date();
  const startOfWeek = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const startOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const weekStart = startOfWeek(new Date(today));
  const monthStart = startOfMonth(new Date(today));

  let todayCount = 0;
  let weekCount = 0;
  let monthCount = 0;
  let totalCount = eventList.length;

  eventList.forEach(event => {
    const eventDate = new Date(event.date);

    if (eventDate.toDateString() === today.toDateString()) {
      todayCount++;
    }

    if (eventDate >= weekStart && eventDate <= today) {
      weekCount++;
    }

    if (eventDate >= monthStart && eventDate <= today) {
      monthCount++;
    }
  });
  return {
    todayCount,
    weekCount,
    monthCount,
    totalCount,
  };
};
