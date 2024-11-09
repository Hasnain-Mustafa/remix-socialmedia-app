-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Posts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "caption" TEXT,
    "likes" INTEGER,
    "imageId" INTEGER,
    "imageUrl" TEXT,
    "authorId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Posts" ("authorId", "caption", "created_at", "id", "imageId", "imageUrl", "likes", "updated_at") SELECT "authorId", "caption", "created_at", "id", "imageId", "imageUrl", "likes", "updated_at" FROM "Posts";
DROP TABLE "Posts";
ALTER TABLE "new_Posts" RENAME TO "Posts";
CREATE INDEX "Posts_caption_created_at_idx" ON "Posts"("caption", "created_at" DESC);
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "password" TEXT NOT NULL,
    "imageId" INTEGER,
    "imageUrl" TEXT NOT NULL
);
INSERT INTO "new_User" ("bio", "email", "id", "imageId", "imageUrl", "name", "password", "username") SELECT "bio", "email", "id", "imageId", "imageUrl", "name", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
