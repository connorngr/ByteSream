/*
  Warnings:

  - You are about to drop the column `originalUrl` on the `Article` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sourcelUrl]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sourcelUrl` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Article_originalUrl_key";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "originalUrl",
ADD COLUMN     "sourcelUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Article_sourcelUrl_key" ON "Article"("sourcelUrl");
