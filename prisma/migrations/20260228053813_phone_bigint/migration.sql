/*
  Warnings:

  - Changed the type of `phone_number` on the `Admin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Admin"
ALTER COLUMN "phone_number" TYPE BIGINT
USING phone_number::BIGINT;