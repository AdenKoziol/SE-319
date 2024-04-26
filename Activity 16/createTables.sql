
-- 
-- Create a Database
--
CREATE DATABASE IF NOT EXISTS `secoms319`;
USE `secoms319`;

--
-- Table structure for table `fakestore_catalog`
--

DROP TABLE IF EXISTS `fakestore_catalog`;

CREATE TABLE `fakestore_catalog` (
  `id` INT NOT NULL,
  `title` VARCHAR(80) NOT NULL,
  `price` DECIMAL(5,2) NOT NULL,
  `description` VARCHAR(775) NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `image` VARCHAR(100) NOT NULL,
  `rating` DECIMAL(5,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
