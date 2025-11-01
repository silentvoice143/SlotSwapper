// export const formatDateTime = (dateTimeString) => {
//   const date = new Date(dateTimeString);
//   return date.toLocaleString("en-US", {
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

import { fromZonedTime } from "date-fns-tz";
import { startOfDay, endOfDay, format } from "date-fns";

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

export const formatDateTime = (dateString: string) => {
  try {
    return format(new Date(dateString), "dd MMM yyyy, hh:mm a");
  } catch {
    return "-";
  }
};

export const formatTime = (date) => {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString();
};
