/*
  Warnings:

  - You are about to drop the column `teacherId` on the `AttendanceResponse` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AttendanceResponse" DROP CONSTRAINT "AttendanceResponse_teacherId_fkey";

-- AlterTable
ALTER TABLE "AttendanceResponse" DROP COLUMN "teacherId";

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
