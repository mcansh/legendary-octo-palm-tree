/*
  Warnings:

  - You are about to drop the column `shopifyStorefrontAccessToken` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `shopifyStorefrontUrl` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "shopifyStorefrontAccessToken",
DROP COLUMN "shopifyStorefrontUrl";

-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "shopifyStorefrontAccessToken" TEXT,
ADD COLUMN     "shopifyStorefrontUrl" TEXT;
