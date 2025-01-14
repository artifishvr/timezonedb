import { db } from "~~/utils/drizzle";
import { usersTable } from "~~/utils/db/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.timezone || !body.accessToken) {
    throw createError({
      status: 400,
      statusMessage: "Bad Request",
      message: "Missing required fields",
    });
  }

  const user: any = await $fetch("https://discord.com/api/v10/users/@me", {
    headers: {
      Authorization: `Bearer ${body.accessToken}`,
    },
  }).catch((e) => {
    throw createError({
      status: 500,
      statusMessage: "Bad Request",
      message: e.message,
    });
  });

  if (!user.id) {
    throw createError({
      status: 500,
      statusMessage: "Server Error",
      message: "This shouldn't happen.",
    });
  }

  // TODO Timezone validation
  // TODO Check if user already exists

  const newUser = await db
    .insert(usersTable)
    .values({ timezone: body.timezone, discord: user.id })
    .returning();

  return newUser[0];
});
