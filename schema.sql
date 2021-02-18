CREATE TABLE `blackjackscores`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(255) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `blackjackscores`.`users` 
ADD COLUMN `highscore` INT NULL AFTER `email`;
