/*
  Warnings:

  - You are about to drop the column `onlyOne` on the `Admin` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Admin_onlyOne_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "onlyOne";
