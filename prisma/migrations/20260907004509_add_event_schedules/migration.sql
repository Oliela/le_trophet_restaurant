/*
  Warnings:

  - A unique constraint covering the columns `[eventId,occurrenceStartsAt,whatsapp]` on the table `PollResponse` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `occurrenceStartsAt` to the `PollResponse` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ScheduleType" AS ENUM ('ONE_DAY', 'DATE_RANGE', 'WEEKLY');

-- DropIndex
DROP INDEX "PollResponse_eventId_answer_idx";

-- DropIndex
DROP INDEX "PollResponse_eventId_whatsapp_key";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "endsAt" TIMESTAMP(3),
ADD COLUMN     "pricingDetails" TEXT NOT NULL DEFAULT 'Entrée libre',
ADD COLUMN     "recurrenceDay" INTEGER,
ADD COLUMN     "recurrenceEndsAt" TIMESTAMP(3),
ADD COLUMN     "scheduleType" "ScheduleType" NOT NULL DEFAULT 'ONE_DAY';

-- AlterTable
ALTER TABLE "PollResponse" ADD COLUMN     "occurrenceStartsAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Event_scheduleType_recurrenceDay_idx" ON "Event"("scheduleType", "recurrenceDay");

-- CreateIndex
CREATE INDEX "PollResponse_eventId_occurrenceStartsAt_answer_idx" ON "PollResponse"("eventId", "occurrenceStartsAt", "answer");

-- CreateIndex
CREATE UNIQUE INDEX "PollResponse_eventId_occurrenceStartsAt_whatsapp_key" ON "PollResponse"("eventId", "occurrenceStartsAt", "whatsapp");
