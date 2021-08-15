DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS reactions;

CREATE TABLE users (
  "id" TEXT UNIQUE PRIMARY KEY NOT NULL,
  "handle" TEXT UNIQUE NOT NULL,
  "fullname" TEXT,
  "email" TEXT,
  "passhash" TEXT NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE messages (
  "id" TEXT UNIQUE PRIMARY KEY NOT NULL,
  "createdBy" INTEGER NOT NULL,
  "createdAt" TEXT NOT NULL DEFAULT (DATETIME('now')),
  "text" TEXT NOT NULL
);

CREATE TABLE reactions (
  "id" TEXT UNIQUE PRIMARY KEY NOT NULL,
  "userId" TEXT NOT NULL,
  "messageId" TEXT NOT NULL,
  "like" BOOLEAN DEFAULT 0,
  "favorite" BOOLEAN DEFAULT 0
);

INSERT INTO users ("id", "handle", "fullname", "email", "passhash") VALUES ('48783b01-5d77-4363-af4a-ee2282cfe6c3', 'TheAmazingPT', 'Philipp Trunczik', 'test@example.com', 'xxx');
INSERT INTO users ("id", "handle", "fullname", "passhash") VALUES ('af23e0d6-405f-47c1-8fdf-1c09a047d754', 'fog0f', 'Patrick', 'xxx');
INSERT INTO messages ("id", "createdBy", "text") VALUES ('28480d06-6521-4851-b579-7c7660d484f3', '48783b01-5d77-4363-af4a-ee2282cfe6c3', 'Hello 1');
INSERT INTO messages ("id", "createdBy", "text") VALUES ('a0377730-a3b3-4d41-87ad-d82891ea47a2', '48783b01-5d77-4363-af4a-ee2282cfe6c3', 'Hello 2');
INSERT INTO messages ("id", "createdBy", "text") VALUES ('e2fa75a4-15c0-44ad-9cd8-6f18509ba00b', 'af23e0d6-405f-47c1-8fdf-1c09a047d754', 'Hello 1');
INSERT INTO reactions ("id", "userId", "messageId", "like") VALUES ('48783b01-5d77-4363-af4a-ee2282cfe6c3_e2fa75a4-15c0-44ad-9cd8-6f18509ba00b', '48783b01-5d77-4363-af4a-ee2282cfe6c3', 'e2fa75a4-15c0-44ad-9cd8-6f18509ba00b', 1);
INSERT INTO reactions ("id", "userId", "messageId", "like") VALUES ('af23e0d6-405f-47c1-8fdf-1c09a047d754_a0377730-a3b3-4d41-87ad-d82891ea47a2', 'af23e0d6-405f-47c1-8fdf-1c09a047d754', 'a0377730-a3b3-4d41-87ad-d82891ea47a2', 1);
INSERT INTO reactions ("id", "userId", "messageId", "favorite") VALUES ('af23e0d6-405f-47c1-8fdf-1c09a047d754_e2fa75a4-15c0-44ad-9cd8-6f18509ba00b', 'af23e0d6-405f-47c1-8fdf-1c09a047d754', 'e2fa75a4-15c0-44ad-9cd8-6f18509ba00b', 1);
INSERT INTO reactions ("id", "userId", "messageId", "like", "favorite") VALUES ('48783b01-5d77-4363-af4a-ee2282cfe6c3_28480d06-6521-4851-b579-7c7660d484f3', '48783b01-5d77-4363-af4a-ee2282cfe6c3', '28480d06-6521-4851-b579-7c7660d484f3', 1, 1);
INSERT INTO reactions ("id", "userId", "messageId", "like", "favorite") VALUES ('af23e0d6-405f-47c1-8fdf-1c09a047d754_28480d06-6521-4851-b579-7c7660d484f3', 'af23e0d6-405f-47c1-8fdf-1c09a047d754', '28480d06-6521-4851-b579-7c7660d484f3', 1, 1);
INSERT INTO reactions ("id", "userId", "messageId", "like", "favorite") VALUES ('48783b01-5d77-4363-af4a-ee2282cfe6c3_a0377730-a3b3-4d41-87ad-d82891ea47a2', '48783b01-5d77-4363-af4a-ee2282cfe6c3', 'a0377730-a3b3-4d41-87ad-d82891ea47a2', 1, 1);
