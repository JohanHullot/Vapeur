-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publishDate" DATETIME NOT NULL,
    "inMainPage" BOOLEAN NOT NULL DEFAULT false,
    "nameOfImage" TEXT NOT NULL DEFAULT '',
    "gameCategory" INTEGER NOT NULL,
    "gameEditor" INTEGER NOT NULL,
    CONSTRAINT "Game_gameCategory_fkey" FOREIGN KEY ("gameCategory") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_gameEditor_fkey" FOREIGN KEY ("gameEditor") REFERENCES "Editor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("description", "gameCategory", "gameEditor", "id", "inMainPage", "name", "publishDate") SELECT "description", "gameCategory", "gameEditor", "id", "inMainPage", "name", "publishDate" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
