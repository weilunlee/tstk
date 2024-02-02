CREATE SCHEMA `tstk`;

CREATE TABLE `tstk`.`book_value` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) NULL,
  `book_value` INT NULL,
  `rank` INT NULL,
  `BV_history` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
