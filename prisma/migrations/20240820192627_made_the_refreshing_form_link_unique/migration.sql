/*
  Warnings:

  - A unique constraint covering the columns `[temporaryFormLink]` on the table `AttendanceRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AttendanceRecord_temporaryFormLink_key" ON "AttendanceRecord"("temporaryFormLink");
