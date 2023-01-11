-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "assisted" BOOLEAN DEFAULT false,
ALTER COLUMN "fail" DROP NOT NULL;
