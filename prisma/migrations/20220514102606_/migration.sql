-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "comment" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");
