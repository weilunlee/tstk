CREATE SCHEMA `tstk`;

CREATE TABLE `tstk`.`book_value` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) NULL,
  `book_value` INT NULL,
  `rank` INT NULL,
  `BV_history` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);


ALTER TABLE `tstk`.`book_value`
ADD COLUMN `SVoverBV` VARCHAR(45) NULL AFTER `code`,
ADD COLUMN `current_price` VARCHAR(45) NULL AFTER `book_value`,
ADD COLUMN `rank2` INT NULL AFTER `rank1`,
ADD COLUMN `rank3` INT NULL AFTER `rank2`,
ADD COLUMN `rank4` INT NULL AFTER `rank3`,
ADD COLUMN `rank5` INT NULL AFTER `rank4`,
CHANGE COLUMN `BV_history` `BV_history` VARCHAR(255) NULL DEFAULT NULL AFTER `current_price`,
CHANGE COLUMN `book_value` `book_value` VARCHAR(45) NULL DEFAULT NULL ,
CHANGE COLUMN `rank` `rank1` INT NULL DEFAULT NULL ;
