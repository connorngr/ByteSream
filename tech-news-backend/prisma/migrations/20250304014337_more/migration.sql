/*
  Warnings:

  - You are about to drop the column `sourcelUrl` on the `Article` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sourceUrl]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sourceUrl` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Article_sourcelUrl_key";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "sourcelUrl",
ADD COLUMN     "sourceUrl" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "thumbnailUrl" TEXT,
ALTER COLUMN "summary" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Article_sourceUrl_key" ON "Article"("sourceUrl");
