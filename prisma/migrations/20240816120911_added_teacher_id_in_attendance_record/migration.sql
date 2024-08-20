/*
  Warnings:

  - Added the required column `teacherId` to the `AttendanceRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AttendanceRecord" ADD COLUMN     "teacherId" TEXT NOT NULL;
