export default defineEventHandler(async (event) => {
  return {
    supportedPlatforms: ["bsky", "discord", "github", "twitter"],
  };
});
