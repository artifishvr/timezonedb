import { db } from "~/utils/drizzle";
import { usersTable } from "~/utils/db/schema";
import { formatError } from "~/utils/formatter";
import { eq } from "drizzle-orm";
import moment from "moment-timezone";

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

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.discord, user.id));

  if (existingUser[0]) {
    return formatError(400, "User already exists");
  }

  if (!moment.tz.zone(body.timezone)) {
    return formatError(400, "Invalid timezone");
  }

  const newUser = await db
    .insert(usersTable)
    .values({ timezone: body.timezone, discord: user.id })
    .returning();

  return newUser[0];
});
