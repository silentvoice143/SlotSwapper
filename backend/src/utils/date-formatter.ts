import { endOfDay, startOfDay } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

export const toUtcIso = (localDateTime: string): string => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return fromZonedTime(localDateTime, timeZone).toISOString();
};

export const getDayRange = (date: string): { start: string; end: string } => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const localDate = new Date(date);

  const start = startOfDay(localDate);
  const end = endOfDay(localDate);

  const startUtc = fromZonedTime(start, timeZone).toISOString();
  const endUtc = fromZonedTime(end, timeZone).toISOString();

  return { start: startUtc, end: endUtc };
};
