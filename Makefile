start:
	deno run \
		--watch \
		--no-check \
		--allow-net \
		--allow-read \
		--allow-write \
		src/main.ts

setup:
	sqlite3 database/sqlite3.db < database/bootstrap.sql
