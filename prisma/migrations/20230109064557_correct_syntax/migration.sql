/*
  Warnings:

  - You are about to drop the column `name` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `reps` on the `WorkoutExercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "WorkoutExercise" DROP COLUMN "reps";
