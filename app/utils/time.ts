export const formatTimestampDetailed = (value?: number | null) => {
  if (!value) return "Aldri";
  return new Date(value).toLocaleString("nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
};

export const formatDateRelative = (value?: number | null): string => {
  if (!value || value === 0) return "-";

  const date = new Date(value);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Calculate difference in days
  const diffTime = today.getTime() - dateOnly.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Today
  if (diffDays === 0) {
    return "I dag";
  }

  // Yesterday
  if (diffDays === 1) {
    return "I går";
  }

  // Last 6 days (2-6 days ago) - show day of week
  if (diffDays >= 2 && diffDays <= 6) {
    const weekdays = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
    return weekdays[date.getDay()];
  }

  // Within the last year - show day + month
  const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  if (date >= oneYearAgo) {
    const months = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];
    return `${date.getDate()}. ${months[date.getMonth()]}`;
  }

  // Older than a year - full date (DD.MM.YYYY)
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
