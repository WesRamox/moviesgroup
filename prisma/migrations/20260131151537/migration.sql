/*
  Warnings:

  - Changed the type of `status` on the `Invite` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Invite" DROP COLUMN "status",
ADD COLUMN     "status" "InviteStatus" NOT NULL;
