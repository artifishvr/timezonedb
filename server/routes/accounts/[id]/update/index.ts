import { db } from "~~/utils/drizzle";
import { usersTable } from "~~/utils/db/schema";
import { eq } from "drizzle-orm";
import { formatError } from "~~/utils/formatter";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = getRouterParam(event, "id");

  if (!body.accessToken) {
    return formatError(400, "Missing access token");
  }

  if (!body.timezone && !body.twitter && !body.bsky && !body.github) {
    return formatError(400, "Missing fields to update");
  }

  const user: any = await $fetch("https://discord.com/api/v10/users/@me", {
    headers: {
      Authorization: `Bearer ${body.accessToken}`,
    },
  }).catch((e) => {
    return formatError(500, e.message);
  });
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, parseInt(id)));

  if (!result[0]) {
    return formatError(404, "User not found");
  }

  if (user.id !== result[0].discord) {
    return formatError(403, "Not authorized to update this user");
  }

  // TODO Timezone validation

  const updatedUser = await db
    .update(usersTable)
    .set({
      ...(body.timezone && {
        timezone: body.timezone === "none" ? null : body.timezone,
      }),
      ...(body.twitter && {
        twitter: body.twitter === "none" ? null : body.twitter,
      }),
      ...(body.bsky && { bsky: body.bsky === "none" ? null : body.bsky }),
      ...(body.github && {
        github: body.github === "none" ? null : body.github,
      }),
    })
    .where(eq(usersTable.id, parseInt(id)))
    .returning();

  return updatedUser[0];
});
