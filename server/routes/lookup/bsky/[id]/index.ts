import { db } from "~~/utils/drizzle";
import { usersTable } from "~~/utils/db/schema";
import { eq } from "drizzle-orm";
import { formatResponse, formatError } from "~~/utils/formatter";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.bsky, id));

  const user = result[0];

  if (!user) {
    return formatError(404, "User not found");
  }

  const info = formatResponse(user);

  return info;
});
