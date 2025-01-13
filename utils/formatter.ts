export function formatResponse(user) {
  const localTime = new Date().toLocaleString("en-US", {
    timeZone: user.timezone,
    timeStyle: "short",
  });

  let localDate = new Date().toLocaleString("en-US", {
    timeZone: user.timezone,
    dateStyle: "short",
  });

  // Format date with timezone to get parts
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: user.timezone,
    timeZoneName: "longOffset",
  });

  // Get formatted parts and find timezone part
  const parts = formatter.formatToParts(new Date());
  const timezonePart = parts.find((part) => part.type === "timeZoneName");

  // Extract UTC offset from timezone string (e.g., "UTC-07:00")
  const offset = timezonePart.value.replace("GMT", "");

  return {
    timezone: user.timezone,
    currentTime: localTime,
    currentDate: localDate,
    currentOffset: offset,
    linkedAccounts: {
      ...(user.discord ? { discord: user.discord } : {}),
      ...(user.twitter ? { twitter: user.twitter } : {}),
      ...(user.bsky ? { bsky: user.bsky } : {}),
      ...(user.github ? { github: user.github } : {}),
    },
    serverTime: new Date().toISOString(),
    id: user.id,
  };
}
