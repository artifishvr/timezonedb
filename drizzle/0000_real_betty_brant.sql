CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timezone` text NOT NULL,
	`discord` text NOT NULL,
	`twitter` text,
	`bsky` text,
	`github` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_discord_unique` ON `users_table` (`discord`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_twitter_unique` ON `users_table` (`twitter`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_bsky_unique` ON `users_table` (`bsky`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_github_unique` ON `users_table` (`github`);