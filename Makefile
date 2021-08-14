start:
	deno run --no-check --watch --allow-net --allow-read src/main.ts

setup:
	sqlite3 database/sqlite3.db < database/bootstrap.sql
