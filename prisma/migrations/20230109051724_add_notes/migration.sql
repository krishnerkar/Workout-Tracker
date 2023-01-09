/*
  Warnings:

  - Added the required column `notes` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "notes" TEXT NOT NULL;
