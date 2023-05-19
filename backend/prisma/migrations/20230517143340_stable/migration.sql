/*
  Warnings:

  - The primary key for the `question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `question` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `quiz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tittle` on the `quiz` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `quiz` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `participant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Made the column `quizId` on table `question` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `creator_id` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `question_quizId_fkey`;

-- DropForeignKey
ALTER TABLE `quiz` DROP FOREIGN KEY `quiz_usersId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_participantId_fkey`;

-- AlterTable
ALTER TABLE `question` DROP PRIMARY KEY,
    ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `score` INTEGER NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `quizId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `quiz` DROP PRIMARY KEY,
    DROP COLUMN `tittle`,
    DROP COLUMN `usersId`,
    ADD COLUMN `condition` ENUM('OPEN', 'ONGOING', 'DONE', 'CLOSED') NOT NULL DEFAULT 'OPEN',
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `creator_id` INTEGER NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `status` ENUM('PRIVATE', 'PUBLIC') NOT NULL DEFAULT 'PUBLIC',
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `participant`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `school` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usersId` INTEGER NOT NULL,
    `token` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Token_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Answer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quizId` INTEGER NULL,
    `questionId` INTEGER NOT NULL,
    `choiceId` INTEGER NOT NULL,
    `usersId` INTEGER NULL,
    `answered_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `quizSessionId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quizId` INTEGER NULL,
    `room` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Room_quizId_key`(`quizId`),
    UNIQUE INDEX `Room_room_key`(`room`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` INTEGER NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `Attendees_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuizSession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionId` INTEGER NULL,
    `roomName` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Choice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `is_correct` BOOLEAN NOT NULL,
    `questionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_choiceId_fkey` FOREIGN KEY (`choiceId`) REFERENCES `Choice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_quizSessionId_fkey` FOREIGN KEY (`quizSessionId`) REFERENCES `QuizSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendees` ADD CONSTRAINT `Attendees_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendees` ADD CONSTRAINT `Attendees_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizSession` ADD CONSTRAINT `QuizSession_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizSession` ADD CONSTRAINT `QuizSession_roomName_fkey` FOREIGN KEY (`roomName`) REFERENCES `Room`(`room`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Choice` ADD CONSTRAINT `Choice_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
