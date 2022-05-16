/*
  Warnings:

  - You are about to alter the column `quantity` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "comment" TEXT
);
INSERT INTO "new_Item" ("comment", "deleted", "id", "name", "quantity") SELECT "comment", "deleted", "id", "name", "quantity" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
