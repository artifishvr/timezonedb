import { db } from "~~/utils/drizzle";
import { usersTable } from "~~/utils/db/schema";
import { formatError } from "~~/utils/formatter";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.timezone || !body.accessToken) {
    return formatError(400, "Missing required fields");
  }

  const user: any = await $fetch("https://discord.com/api/v10/users/@me", {
    headers: {
      Authorization: `Bearer ${body.accessToken}`,
    },
  }).catch((e) => {
    return formatError(500, e.message);
  });

  if (!user.id) {
    return formatError(500, "This shouldn't happen.");
  }

  // TODO Timezone validation
  // TODO Check if user already exists

  const newUser = await db
    .insert(usersTable)
    .values({ timezone: body.timezone, discord: user.id })
    .returning();

  return newUser[0];
});
