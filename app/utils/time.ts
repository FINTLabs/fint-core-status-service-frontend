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
