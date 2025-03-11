import { db } from "~/utils/drizzle";
import { usersTable } from "~/utils/db/schema";
import { eq } from "drizzle-orm";
import { formatError } from "~/utils/formatter";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, parseInt(id)));

  const user = result[0];

  if (!user) {
    return formatError(404, "User not found");
  }

  return {
    id: user.id,
    timezone: user.timezone,
    linkedAccounts: {
      ...(user.discord ? { discord: user.discord } : {}),
      ...(user.twitter ? { twitter: user.twitter } : {}),
      ...(user.bsky ? { bsky: user.bsky } : {}),
      ...(user.github ? { github: user.github } : {}),
    },
  };
});
