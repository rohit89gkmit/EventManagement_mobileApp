export const countEvents = (eventList: eventFormDataType[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfWeek = (date: Date) => {
    const copiedDate = new Date(date);
    const day = copiedDate.getDay();
    const diff = copiedDate.getDate() - day + (day === 0 ? -6 : 1);
    copiedDate.setDate(diff);
    copiedDate.setHours(0, 0, 0, 0);
    return copiedDate;
  };

  const startOfMonth = (date: Date) => {
    const startMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    startMonth.setHours(0, 0, 0, 0);
    return startMonth;
  };

  const endOfToday = new Date(today);
  endOfToday.setHours(23, 59, 59, 999);

  const weekStart = startOfWeek(today);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  const monthStart = startOfMonth(today);
  const monthEnd = new Date(monthStart);
  monthEnd.setMonth(monthEnd.getMonth() + 1);
  monthEnd.setDate(0);
  monthEnd.setHours(23, 59, 59, 999);

  let todayCount = 0;
  let weekCount = 0;
  let monthCount = 0;
  let totalCount = eventList.length;

  eventList.forEach(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    if (
      eventDate.getTime() >= today.getTime() &&
      eventDate.getTime() <= endOfToday.getTime()
    ) {
      todayCount++;
    }

    if (
      eventDate.getTime() >= weekStart.getTime() &&
      eventDate.getTime() <= weekEnd.getTime()
    ) {
      weekCount++;
    }

    if (
      eventDate.getTime() >= monthStart.getTime() &&
      eventDate.getTime() <= monthEnd.getTime()
    ) {
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
