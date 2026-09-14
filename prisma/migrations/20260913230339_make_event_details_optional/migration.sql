-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "capacity" DROP NOT NULL,
ALTER COLUMN "pricingDetails" DROP NOT NULL,
ALTER COLUMN "pricingDetails" DROP DEFAULT;
