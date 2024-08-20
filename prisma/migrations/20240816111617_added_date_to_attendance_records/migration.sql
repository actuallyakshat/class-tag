/*
  Warnings:

  - You are about to drop the column `isPresent` on the `AttendanceResponse` table. All the data in the column will be lost.
  - Added the required column `date` to the `AttendanceRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AttendanceRecord" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "AttendanceResponse" DROP COLUMN "isPresent";
