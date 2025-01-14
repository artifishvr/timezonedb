import { db } from "~~/utils/drizzle";
import { usersTable } from "~~/utils/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = getRouterParam(event, "id");

  const user: any = await $fetch("https://discord.com/api/v10/users/@me", {
    headers: {
      Authorization: `Bearer ${body.accessToken}`,
    },
  }).catch((e) => {
    throw createError({
      status: 400,
      statusMessage: "Bad Request",
      message: e.message,
    });
  });

  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, parseInt(id)));

  if (user.id !== result[0].discord) {
    throw createError({
      status: 401,
      statusMessage: "Unauthorized",
      message: "You are not authorized to update this user",
    });
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
