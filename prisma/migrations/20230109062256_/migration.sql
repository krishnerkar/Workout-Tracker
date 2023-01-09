/*
  Warnings:

  - You are about to drop the column `caloriesMin` on the `Exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "caloriesMin";

-- AlterTable
ALTER TABLE "Workout" ALTER COLUMN "notes" DROP NOT NULL;
