-- DropIndex
DROP INDEX "BasketDevice_deviceId_key";

-- AlterTable
ALTER TABLE "Basket" ADD COLUMN     "totalPrice" INTEGER NOT NULL DEFAULT 0;
