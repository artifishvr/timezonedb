export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = $fetch("https://discord.com/api/v10/users/@me", {
    headers: {
      Authorization: `Bearer ${body.accessToken}`,
    },
  });

  return user;
});
