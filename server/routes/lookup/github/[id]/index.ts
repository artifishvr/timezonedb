import { db } from "~~/utils/drizzle";
import { usersTable } from "~~/utils/db/schema";
import { eq } from "drizzle-orm";
import { formatResponse } from "~~/utils/formatter";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.github, id));

  const user = result[0];

  const info = formatResponse(user);

  return info;
});
