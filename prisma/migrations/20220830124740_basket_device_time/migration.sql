/*
  Warnings:

  - You are about to drop the column `createdAt` on the `BasketDevice` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `BasketDevice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BasketDevice" DROP COLUMN "createdAt",
DROP COLUMN "updateAt";
