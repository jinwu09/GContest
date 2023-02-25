/*
  Warnings:

  - You are about to drop the column `bryne` on the `users` table. All the data in the column will be lost.
  - Added the required column `age` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `bryne`,
    ADD COLUMN `age` INTEGER NOT NULL;
