export function convertTimeStamp(timestamp: number | undefined): string {
  if (timestamp === undefined) return "Ukjent tidspunkt";
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function timeSince(
  timestamp: number | undefined,
  compareTo: number = new Date().getTime()
): string {
  if (timestamp === undefined) return "Ukjent tidspunkt";
  const createdTimeStamp = new Date(timestamp);

  const elapsedMs = compareTo - createdTimeStamp.getTime();
  const elapsedSeconds = Math.floor(elapsedMs / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);

  if (timestamp && compareTo !== new Date().getTime()) {
    const remainingHours = elapsedHours % 24;
    const remainingMinutes = elapsedMinutes % 60;
    const remainingSeconds = elapsedSeconds % 60;
    if (elapsedDays > 0) {
      return `${elapsedDays} dager, ${remainingHours} timer, ${remainingMinutes} minutter og ${remainingSeconds} sekunder`;
    } else if (elapsedHours > 0) {
      return `${elapsedHours} timer, ${remainingMinutes} minutter og ${remainingSeconds} sekunder`;
    } else if (elapsedMinutes > 0) {
      return `${elapsedMinutes} minutter og ${remainingSeconds} sekunder`;
    } else {
      return `${elapsedSeconds} sekunder`;
    }
  } else {
    const remainingHours = elapsedHours % 24;
    const remainingMinutes = elapsedMinutes % 60;

    if (elapsedDays > 0) {
      return `${elapsedDays} dager og ${remainingHours} timer`;
    } else if (elapsedHours > 0) {
      return `${remainingHours} timer og ${remainingMinutes} minutter`;
    } else {
      return `${remainingMinutes} minutter`;
    }
  }
}

export function formatComponents(compontents: string[]): Array<string> {
  const resources = new Array<string>();
  compontents.forEach((component: string) => {
    const parts = component.split(".");
    if (parts.length > 1) {
      if (!resources.find((resource) => resource === parts[0])) {
        resources.push(parts[0]);
      }
    }
  });

  return resources;
}
