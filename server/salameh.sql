-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2023 at 06:47 PM
-- Server version: 8.0.30
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `salameh`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_ID` int NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_phone` varchar(15) DEFAULT NULL,
  `customer_address` varchar(100) DEFAULT NULL,
  `dollar_debt` double NOT NULL DEFAULT '0',
  `lira_debt` double NOT NULL DEFAULT '0',
  `customer_status` tinyint NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `customers_payments`
--

CREATE TABLE `customers_payments` (
  `payment_ID` int NOT NULL,
  `customer_ID_FK` int NOT NULL,
  `payment_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_account` varchar(10) DEFAULT NULL,
  `payment_currency` varchar(10) NOT NULL,
  `payment_value` double NOT NULL,
  `actual_payment_value` double DEFAULT NULL,
  `exchange_rate` double NOT NULL,
  `payment_notes` varchar(100) DEFAULT NULL,
  `payment_status` tinyint NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `debts_history`
--

CREATE TABLE `debts_history` (
  `record_ID` int NOT NULL,
  `customer_ID_FK` int NOT NULL,
  `item_description` varchar(255) NOT NULL,
  `record_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `qty` int DEFAULT NULL,
  `currency` varchar(10) NOT NULL,
  `exchange_rate` double NOT NULL,
  `unit_cost` double DEFAULT NULL,
  `unit_price` double DEFAULT NULL,
  `record_status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `invoice_ID` int NOT NULL,
  `user_ID_FK` int DEFAULT NULL,
  `customer_ID_FK` int DEFAULT NULL,
  `invoice_type` varchar(10) NOT NULL,
  `invoice_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_cost` double NOT NULL,
  `total_price` double NOT NULL,
  `exchange_rate` double NOT NULL DEFAULT '0',
  `invoice_status` tinyint NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_map`
--

CREATE TABLE `invoice_map` (
  `record_ID` int NOT NULL,
  `invoice_ID_FK` int NOT NULL,
  `item_ID_FK` int NOT NULL,
  `customer_ID_FK` int DEFAULT NULL,
  `record_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `record_type` varchar(10) DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `currency` varchar(10) NOT NULL,
  `exchange_rate` double NOT NULL,
  `unit_cost` double DEFAULT NULL,
  `unit_price` double NOT NULL,
  `record_status` tinyint NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `reminders`
--

CREATE TABLE `reminders` (
  `reminder_ID` int NOT NULL,
  `reminder_title` varchar(100) NOT NULL,
  `reminder_text` text,
  `reminder_type` varchar(15) NOT NULL DEFAULT 'text',
  `due_date` date DEFAULT NULL,
  `due_time` time DEFAULT NULL,
  `repeat_reminder` varchar(10) DEFAULT NULL,
  `reminder_status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `setting_ID` int NOT NULL,
  `setting_name` varchar(20) NOT NULL,
  `setting_value` double DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL,
  `setting_status` tinyint NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`setting_ID`, `setting_name`, `setting_value`, `value`, `setting_status`) VALUES
(1, 'exchangeRate', 60000, NULL, 1),
(2, 'exchangeRate2', NULL, 'MjAyMy0wNS0wMQ==', 1),
(3, 'exchangeRate3', NULL, 'dW5sb2NrZWQ=', 1);

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `item_ID` int NOT NULL,
  `barcode` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `item_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `item_description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `item_type` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'other',
  `category_ID_FK` int DEFAULT '1',
  `item_sub_category` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `qty` int DEFAULT '0',
  `currency` varchar(10) NOT NULL DEFAULT 'lira',
  `item_cost` double DEFAULT NULL,
  `item_price` double NOT NULL,
  `item_notes` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `show_on_sell` tinyint(1) NOT NULL DEFAULT '1',
  `item_status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`item_ID`, `barcode`, `item_name`, `item_description`, `image_url`, `item_type`, `category_ID_FK`, `item_sub_category`, `qty`, `currency`, `item_cost`, `item_price`, `item_notes`, `show_on_sell`, `item_status`) VALUES
(1, NULL, '$1.67', 'Touch 1.67$ (Credit only)', '/uploads/1671359583561-167.png', 'Voucher', 1, 'Touch', 0, 'lira', 61000, 75000, '', 1, 1),
(2, NULL, '$3.79', 'Touch 10 Days (3.79$)', '/uploads/1671360144651-379.png', 'Voucher', 1, 'Touch', 0, 'lira', 137000, 150000, NULL, 1, 1),
(3, NULL, '$4.50', 'Touch 1 Month (4.50$)', '/uploads/1671360550283-450.png', 'Voucher', 1, 'Touch', 0, 'lira', 162000, 180000, NULL, 1, 1),
(4, NULL, '$7.58', 'Touch 1 Month (7.58$)', '/uploads/1671360651715-758.png', 'Voucher', 1, 'Touch', 0, 'lira', 270000, 300000, NULL, 1, 1),
(5, NULL, '$15.15', 'Touch 60 days (15.15$)', '/uploads/1671360704258-1515.png', 'Voucher', 1, 'Touch', 0, 'lira', 542000, 580000, NULL, 1, 1),
(6, NULL, '$22.73', 'Touch 90 days (22.73$)', '/uploads/1671360751723-2273.png', 'Voucher', 1, 'Touch', 0, 'lira', 814000, 850000, NULL, 1, 1),
(7, NULL, '$77.28', 'Touch 1 year (77.28$)', '/uploads/1671360802602-7728.png', 'Voucher', 1, 'Touch', 0, 'lira', 2761000, 2800000, NULL, 1, 1),
(8, NULL, 'START $4.50', 'Touch START (4.50$)', '/uploads/1671360871562-s450.png', 'Voucher', 1, 'Touch', 0, 'lira', 162000, 180000, NULL, 1, 1),
(9, NULL, 'SMART $7.50', 'Touch SMART (7.50$)', '/uploads/1671360910108-750.png', 'Voucher', 1, 'Touch', 0, 'lira', 270000, 300000, NULL, 1, 1),
(10, NULL, 'SUPER $13.50', 'Touch SUPER (13.50$)', '/uploads/1671360951659-1350.png', 'Voucher', 1, 'Touch', 0, 'lira', 486000, 520000, NULL, 1, 1),
(11, NULL, 'SOS $1.22', 'Touch SOS (1.22$)', '/uploads/1671360992110-122.png', 'Voucher', 1, 'Touch', 0, 'lira', 45000, 60000, NULL, 1, 0),
(12, NULL, 'SOS 1.22$', 'Touch SOS (1.22$)', '/uploads/1671399852146-122.png', 'Voucher', 1, 'Touch', 0, 'lira', 45000, 60000, NULL, 1, 1),
(13, NULL, '$1.22', 'Alfa 1.22$ (credit only)', '/uploads/1673970737910-emergency-recharge-card.png', 'Voucher', 1, 'Alfa', 0, 'lira', 30000, 50000, NULL, 1, 1),
(14, NULL, '$3.03', 'Alfa 10 days (3.03$)', '/uploads/1673970297312-3.03-recharge-card.png', 'Voucher', 1, 'Alfa', 0, 'lira', 135000, 150000, NULL, 1, 1),
(15, NULL, '$4.50', 'Alfa 1 Month (4.50$)', '/uploads/1673970333166-4.5-recharge-card.png', 'Voucher', 1, 'Alfa', 0, 'lira', 200000, 230000, NULL, 1, 1),
(16, NULL, '$7.58', 'Alfa 1 Month (7.58$)', '/uploads/1673970371917-7.58-recharge-card-1.png', 'Voucher', 1, 'Alfa', 0, 'lira', 333000, 350000, NULL, 1, 1),
(17, NULL, '$15.15', 'Alfa 60 days (15.15$)', '/uploads/1673970408968-15.15-recharge-card-1.png', 'Voucher', 1, 'Alfa', 0, 'lira', 670000, 700000, NULL, 1, 1),
(18, NULL, '$22.73', 'Alfa 90 days (22.73$)', '/uploads/1673970611215-22.73-recharge-card.png', 'Voucher', 1, 'Alfa', 0, 'lira', 1005000, 1050000, NULL, 1, 1),
(19, NULL, '$77.28', 'Alfa 1 year (77.28$)', '/uploads/1673970658799-77.28-recharge-card.png', 'Voucher', 1, 'Alfa', 0, 'lira', 3410000, 3500000, NULL, 1, 1),
(51, NULL, 'Waffer $1.22', 'Alfa Waffer (1.22$)', '/uploads/1673971003562-waffer-emergency-recharge-card.png', 'Voucher', 1, 'Alfa', 0, 'lira', 55000, 70000, NULL, 1, 1),
(52, NULL, 'Waffer $4.50', 'Alfa Waffer (4.50$)', '/uploads/1673971049014-waffer-4.5-recharge-card.png', 'Voucher', 1, 'Alfa', 0, 'lira', 180000, 200000, NULL, 1, 1),
(53, NULL, 'Waffer $7.50', 'Alfa Waffer (7.50$)', '/uploads/1673971087045-1662472190487_image.png', 'Voucher', 1, 'Alfa', 0, 'lira', 332000, 350000, NULL, 1, 1),
(54, '999999999999', NULL, 'dollar test', NULL, 'barcode', 3, NULL, 5, 'dollar', 15, 20, NULL, 1, 1),
(55, '111222354858', NULL, 'lira test', NULL, 'barcode', 5, NULL, 10, 'lira', 225000, 300000, NULL, 1, 1),
(56, NULL, NULL, 'iPhone Cable 1 M', NULL, 'other', 6, NULL, 10, 'dollar', 10, 20, NULL, 1, 1),
(62, NULL, 'netflix 15$', '15$', '/uploads/1674138583468-netflix.png', 'Voucher', 1, 'Netflix', 0, 'lira', 750000, 1500000, 'null', 1, 0),
(63, NULL, 'ogero', 'ttest', '/uploads/1674139540840-ogero.png', 'Voucher', 1, 'Internet', 0, 'lira', 150000, 30000, 'null', 1, 0),
(64, NULL, 'netflix', 'netfilix', '/uploads/1674139564099-netflix.png', 'Voucher', 1, 'Entertainment', 0, 'lira', 150000, 300000, 'null', 1, 0),
(65, 'null', 'test', 'test 134', '/uploads/1674139621405-other.png', 'Voucher', 1, 'Other', 0, 'lira', 15000, 505055, 'null', 1, 0),
(66, NULL, 'new test', '12345', '/uploads/1674139755898-itunes.png', 'Voucher', 1, 'Touch', 0, 'lira', 15000, 30000, 'null', 1, 0),
(67, NULL, 'netflix 2', 'testgin', '/uploads/1674140044668-alfa.png', 'Voucher', 1, 'Entertainment', 0, 'lira', 15000, 300000, 'null', 1, 0),
(68, NULL, 'test 6', '64es6', '/uploads/1674140091451-internet.png', 'Voucher', 1, 'Touch', 0, 'lira', 15000, 15511, 'null', 1, 0),
(69, NULL, 'test', '234', '/uploads/1674140575279-alfa.png', 'Voucher', 1, 'Alfa', 0, 'lira', 234, 234, 'null', 1, 0),
(70, NULL, 'test', '213123', '/uploads/1674140784038-alfa.png', 'Voucher', 1, 'Alfa', 0, 'lira', 150000, 300000, 'null', 1, 0),
(71, NULL, 'test', 'test', '/uploads/1674140800685-no-image.jpg', 'Voucher', 1, 'Other', 0, 'lira', 158000, 158888, 'null', 1, 0),
(72, '123456', NULL, 'TP LINK Modem VDSL', NULL, 'barcode', 3, NULL, 20, 'dollar', 15, 20, NULL, 1, 1),
(73, NULL, NULL, 'no barcode test', NULL, 'other', 1, NULL, 20, 'lira', 150000, 200000, NULL, 1, 1),
(74, '5289000045210', NULL, 'cabel vision old', NULL, 'other', 1, NULL, 0, 'lira', 39, 45, NULL, 1, 1),
(75, '6972585785044', NULL, 'headset p4x', NULL, 'other', 1, NULL, 0, 'dollar', 11, 14, NULL, 1, 1),
(76, '6548', NULL, 'chromecast', NULL, 'other', 1, NULL, 0, 'dollar', 7.5, 10, NULL, 1, 1),
(77, '6416', NULL, 'chromecast 2', NULL, 'other', 1, NULL, 0, 'dollar', 10, 14, NULL, 1, 1),
(78, '6971192054857', NULL, 'fast charger tc', NULL, 'other', 1, NULL, 0, 'dollar', 5, 6, NULL, 1, 1),
(79, '6972424710039', NULL, 'ios bavin data', NULL, 'other', 1, NULL, 0, 'dollar', 0.95, 1.5, NULL, 1, 1),
(80, '6972424711647', NULL, 'aux cable bavin', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 2, NULL, 1, 1),
(81, 'C2416720480172', NULL, 'ups gold vision', NULL, 'other', 1, NULL, 0, 'dollar', 24, 29, NULL, 1, 1),
(82, '922351548728', NULL, 'v link switch', NULL, 'other', 1, NULL, 0, 'dollar', 6.5, 8, NULL, 1, 1),
(83, '97855083487', NULL, 'mousse m186', NULL, 'other', 1, NULL, 0, 'dollar', 4, 8, NULL, 1, 1),
(84, '6491', NULL, 'holder', NULL, 'other', 1, NULL, 0, 'dollar', 0.65, 1.1, NULL, 1, 1),
(85, '8', NULL, 'otg usb', NULL, 'other', 1, NULL, 0, 'dollar', 1, 1.5, NULL, 1, 1),
(86, '5716', NULL, 'otg usbb', NULL, 'other', 1, NULL, 0, 'dollar', 0.65, 1, NULL, 1, 1),
(87, '358612710260282', NULL, 'spark 7 pro 32gb -1', NULL, 'other', 1, NULL, 0, 'dollar', 88, 100, NULL, 1, 1),
(88, '4905524987553', NULL, 'sony bass', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(89, '6925394988885', NULL, 'lblink 4 enten', NULL, 'other', 1, NULL, 0, 'dollar', 10, 15, NULL, 1, 1),
(90, '6901004411998', NULL, 'inkax charg car ios', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 4, NULL, 1, 1),
(91, '868996058647009', NULL, 'redmi not 10s', NULL, 'other', 1, NULL, 0, 'dollar', 208, 215, NULL, 1, 1),
(92, '6971192051993', NULL, 'usb 8gb lenyes', NULL, 'other', 1, NULL, 0, 'dollar', 4, 6, NULL, 1, 1),
(93, '351771880745246', NULL, 'infinix smart 5', NULL, 'other', 1, NULL, 0, 'dollar', 91, 100, NULL, 1, 1),
(94, '867217052149939', NULL, 'redmi note 10pro', NULL, 'other', 1, NULL, 0, 'dollar', 228, 240, NULL, 1, 1),
(95, '6973558961045', NULL, 'power 10000sp21', NULL, 'other', 1, NULL, 0, 'dollar', 8.5, 13, NULL, 1, 1),
(96, '6993124567648', NULL, 'aux typ c', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 4, NULL, 1, 1),
(97, '355320545632427', NULL, 's21 5g ran', NULL, 'other', 1, NULL, 0, 'dollar', 760, 760, NULL, 1, 1),
(98, '356980902405169', NULL, 'spark 7 64-3ram', NULL, 'other', 1, NULL, 0, 'dollar', 105, 115, NULL, 1, 1),
(99, '357774832636889', NULL, 'a03s', NULL, 'other', 1, NULL, 0, 'dollar', 129, 135, NULL, 1, 1),
(100, '12051', NULL, 'ring light 26cm', NULL, 'other', 1, NULL, 0, 'dollar', 6, 10, NULL, 1, 1),
(101, '6935364051464', NULL, 'tplink 3 antin 450mb', NULL, 'other', 1, NULL, 0, 'dollar', 18, 25, NULL, 1, 1),
(102, '6973224870916', NULL, 'cabel d06v', NULL, 'other', 1, NULL, 0, 'dollar', 0.35, 1.1, NULL, 1, 1),
(103, '6540', NULL, 'car mount', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 2.5, NULL, 1, 1),
(104, '6944284675612', NULL, 'oppo a15', NULL, 'other', 1, NULL, 0, 'dollar', 100, 115, NULL, 1, 1),
(105, '350821023169985', NULL, 'pop 4', NULL, 'other', 1, NULL, 0, 'dollar', 77, 90, NULL, 1, 1),
(106, '352867202285926', NULL, 'pova neo', NULL, 'other', 1, NULL, 0, 'dollar', 118, 130, NULL, 1, 1),
(107, '10010', NULL, 'شاشة j7 pro', NULL, 'other', 1, NULL, 0, 'dollar', 30, 35, NULL, 1, 1),
(108, '6970462516965', NULL, 'power banck p42 20000mah', NULL, 'other', 1, NULL, 0, 'dollar', 12, 18, NULL, 1, 1),
(109, '6973224872927', NULL, 'power banck 10000mah', NULL, 'other', 1, NULL, 0, 'dollar', 7.5, 12, NULL, 1, 1),
(110, '351574185912143', NULL, 'a03s 32 3 ram', NULL, 'other', 1, NULL, 0, 'dollar', 116, 125, NULL, 1, 1),
(111, '350165821601322', NULL, 'a03 core', NULL, 'other', 1, NULL, 0, 'dollar', 85, 95, NULL, 1, 1),
(112, '355387995260140', NULL, 'a02 64 3 ram', NULL, 'other', 1, NULL, 0, 'dollar', 111, 120, NULL, 1, 1),
(113, '508', NULL, 'kts-1097', NULL, 'other', 1, NULL, 0, 'dollar', 6.5, 12, NULL, 1, 1),
(114, '352867202753162', NULL, 'pova neo -1', NULL, 'other', 1, NULL, 0, 'dollar', 116, 125, NULL, 1, 1),
(115, 'NKGXH603YJ', NULL, 'airpod3', NULL, 'other', 1, NULL, 0, 'dollar', 15, 30, NULL, 1, 1),
(116, '354588354538601', NULL, 'tablet black view tab 8', NULL, 'other', 1, NULL, 0, 'dollar', 133, 145, NULL, 1, 1),
(117, '351309183859768', NULL, 'spark 7 t 64 +22', NULL, 'other', 1, NULL, 0, 'dollar', 112, 125, NULL, 1, 1),
(118, '861977052569511', NULL, 'realme c12', NULL, 'other', 1, NULL, 0, 'dollar', 115, 130, NULL, 1, 1),
(119, '860219056269710', NULL, 'realme c11', NULL, 'other', 1, NULL, 0, 'dollar', 85, 100, NULL, 1, 1),
(120, '6951066951840', NULL, 'netis range extender', NULL, 'other', 1, NULL, 0, 'dollar', 10, 15, NULL, 1, 1),
(121, '55559', NULL, 'speaker a006', NULL, 'other', 1, NULL, 0, 'dollar', 8, 13, NULL, 1, 1),
(122, '351996303721215', NULL, 'a52s 5g', NULL, 'other', 1, NULL, 0, 'dollar', 360, 360, NULL, 1, 1),
(123, '6972424712811', NULL, 'bavin 2.4a ios', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(124, '6970698587906', NULL, 'battery iphon7plus', NULL, 'other', 1, NULL, 0, 'dollar', 10, 15, NULL, 1, 1),
(125, '123456', NULL, 'SCREAN J7PRO', NULL, 'other', 1, NULL, 0, 'dollar', 30, 35, NULL, 1, 1),
(126, '355096770217668', NULL, 'tecno pop 5 lite', NULL, 'other', 1, NULL, 0, 'dollar', 93, 100, NULL, 1, 1),
(127, 'S/N:21111201292', NULL, 'ups router gold vision', NULL, 'other', 1, NULL, 0, 'dollar', 15, 20, NULL, 1, 1),
(128, '8003510023943', NULL, 'malizia', NULL, 'other', 1, NULL, 0, 'dollar', 1.75, 3, NULL, 1, 1),
(129, '8710447492222', NULL, 'rexona', NULL, 'other', 1, NULL, 0, 'dollar', 1.65, 3, NULL, 1, 1),
(130, '8413300653999', NULL, 'rexona', NULL, 'other', 1, NULL, 0, 'dollar', 1.65, 3, NULL, 1, 1),
(131, '8710447492208', NULL, 'rexona', NULL, 'other', 1, NULL, 0, 'dollar', 1.7, 3, NULL, 1, 1),
(132, '8710447211250', NULL, 'rexona', NULL, 'other', 1, NULL, 0, 'dollar', 1.65, 3, NULL, 1, 1),
(133, '6937372284476', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(134, '6937372284155', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(135, '6972011065160', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(136, '6972011063432', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(137, '6937372289983', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(138, '6972011063395', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(139, '6972011065313', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(140, '6972011063388', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(141, '6937372284032', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(142, '6972011065191', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(143, '6972011066334', NULL, 'fragrance', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(144, '6972011066389', NULL, 'fragrance', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(145, '6972011066082', NULL, 'fragrance', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(146, 'sa5210', NULL, 'body splash برق', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(147, '667549011562', NULL, 'victroria original', NULL, 'other', 1, NULL, 0, 'dollar', 6, 10, NULL, 1, 1),
(148, '667540332468', NULL, 'victroria original', NULL, 'other', 1, NULL, 0, 'dollar', 6, 10, NULL, 1, 1),
(149, 'SA/4194', NULL, 'perfum 2', NULL, 'other', 1, NULL, 0, 'dollar', 4, 6, NULL, 1, 1),
(150, '7518', NULL, 'perfum 2', NULL, 'other', 1, NULL, 0, 'dollar', 3.25, 6, NULL, 1, 1),
(151, '9843', NULL, 'perfum 2', NULL, 'other', 1, NULL, 0, 'dollar', 2.75, 6, NULL, 1, 1),
(152, 'SA/4196', NULL, 'perfum 2', NULL, 'other', 1, NULL, 0, 'dollar', 6.25, 9, NULL, 1, 1),
(153, 'SA/4199', NULL, 'perfum 2', NULL, 'other', 1, NULL, 0, 'dollar', 3.25, 6, NULL, 1, 1),
(154, '9851', NULL, 'perfum 2', NULL, 'other', 1, NULL, 0, 'dollar', 2.75, 6, NULL, 1, 1),
(155, '6937926333803', NULL, 'perfum 2', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 5, NULL, 1, 1),
(156, '2821263XCA01088', NULL, 'starset reciver', NULL, 'other', 1, NULL, 0, 'dollar', 9, 14, NULL, 1, 1),
(157, '355012520628989', NULL, 'spark 8t 64gb 4ram', NULL, 'other', 1, NULL, 0, 'dollar', 121, 130, NULL, 1, 1),
(158, '350589506196268', NULL, 'infinix smart 6', NULL, 'other', 1, NULL, 0, 'dollar', 107, 120, NULL, 1, 1),
(159, '860630060026724', NULL, 'redmi note 11 6ram 128gb', NULL, 'other', 1, NULL, 0, 'dollar', 185, 200, NULL, 1, 1),
(160, '354668776351112', NULL, 'a12 128gb 6ram', NULL, 'other', 1, NULL, 0, 'dollar', 170, 180, NULL, 1, 1),
(161, '352867204555763', NULL, 'spark pova noe', NULL, 'other', 1, NULL, 0, 'dollar', 117, 130, NULL, 1, 1),
(162, '357401696978328', NULL, 'spark pova 2', NULL, 'other', 1, NULL, 0, 'dollar', 168, 180, NULL, 1, 1),
(163, NULL, NULL, 'iphone xs 64gb', NULL, 'other', 1, NULL, 0, 'dollar', 299, 300, NULL, 1, 1),
(164, '6033', NULL, 'i15', NULL, 'other', 1, NULL, 0, 'dollar', 5, 8, NULL, 1, 1),
(165, '8340506879659', NULL, 'z37', NULL, 'other', 1, NULL, 0, 'dollar', 23, 30, NULL, 1, 1),
(166, '6784', NULL, 'wireless chaarger', NULL, 'other', 1, NULL, 0, 'dollar', 7, 13, NULL, 1, 1),
(167, '352192667051345', NULL, 'a13 128gb 4ram', NULL, 'other', 1, NULL, 0, 'dollar', 183, 195, NULL, 1, 1),
(168, '355096771200200', NULL, 'pop 5 lite', NULL, 'other', 1, NULL, 0, 'dollar', 92, 100, NULL, 1, 1),
(169, '6582', NULL, 'mouse biagji', NULL, 'other', 1, NULL, 0, 'dollar', 2, 4, NULL, 1, 1),
(170, '355096771009577', NULL, 'pop 5 lites', NULL, 'other', 1, NULL, 0, 'dollar', 92, 100, NULL, 1, 1),
(171, '352867205694322', NULL, 'pova neo +1', NULL, 'other', 1, NULL, 0, 'dollar', 112, 125, NULL, 1, 1),
(172, '356782980199148', NULL, 'pop 5 lte 32/2', NULL, 'other', 1, NULL, 0, 'dollar', 82, 90, NULL, 1, 1),
(173, '355096771009445', NULL, 'pop lte32/3', NULL, 'other', 1, NULL, 0, 'dollar', 91, 100, NULL, 1, 1),
(174, '7791293039053', NULL, 'rexona+', NULL, 'other', 1, NULL, 0, 'dollar', 1.7, 3, NULL, 1, 1),
(175, '357040733918440', NULL, 'a13 64gb 4 ram', NULL, 'other', 1, NULL, 0, 'dollar', 155, 170, NULL, 1, 1),
(176, '6518', NULL, 'original cable iphone', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 4, NULL, 1, 1),
(177, '19', NULL, 'watch t7 plus', NULL, 'other', 1, NULL, 0, 'dollar', 19, 25, NULL, 1, 1),
(178, '357040738581342', NULL, 'a13 64gb 4 ram1', NULL, 'other', 1, NULL, 0, 'dollar', 157, 170, NULL, 1, 1),
(179, '8681830006770', NULL, 'linkage power 100000mb', NULL, 'other', 1, NULL, 0, 'dollar', 10, 14, NULL, 1, 1),
(180, '357040738578587', NULL, 'a13 64gb 4 ram', NULL, 'other', 1, NULL, 0, 'dollar', 155, 170, NULL, 1, 1),
(181, '352554203261011', NULL, 'm12 syaneh', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(182, '711719990048', NULL, 'ps3 maski', NULL, 'other', 1, NULL, 0, 'dollar', 6, 10, NULL, 1, 1),
(183, '354015794966507', NULL, 'a03 core 1', NULL, 'other', 1, NULL, 0, 'dollar', 85, 100, NULL, 1, 1),
(184, '358211683323464', NULL, 'spark 8 pro', NULL, 'other', 1, NULL, 0, 'dollar', 128, 140, NULL, 1, 1),
(185, '357047364039404', NULL, 'spark 8 c', NULL, 'other', 1, NULL, 0, 'dollar', 119, 130, NULL, 1, 1),
(186, '6970462514329', NULL, 'foneng 20', NULL, 'other', 1, NULL, 0, 'dollar', 12, 18, NULL, 1, 1),
(187, '6970462514312', NULL, 'foneng 10', NULL, 'other', 1, NULL, 0, 'dollar', 7, 12, NULL, 1, 1),
(188, '352469856961959', NULL, 'a13 4ram 128', NULL, 'other', 1, NULL, 0, 'dollar', 170, 180, NULL, 1, 1),
(189, '356782982633987', NULL, 'pop 5 lite 2ram 32', NULL, 'other', 1, NULL, 0, 'dollar', 80, 90, NULL, 1, 1),
(190, '6899234506570', NULL, 'p.R40000', NULL, 'other', 1, NULL, 0, 'dollar', 27, 35, NULL, 1, 1),
(191, '3012', NULL, 'apple watch 7', NULL, 'other', 1, NULL, 0, 'dollar', 15, 25, NULL, 1, 1),
(192, '352469856725735', NULL, 'a13 128 4 ram', NULL, 'other', 1, NULL, 0, 'dollar', 160, 170, NULL, 1, 1),
(193, '8717644061725', NULL, 'rexona..', NULL, 'other', 1, NULL, 0, 'dollar', 1.65, 3, NULL, 1, 1),
(194, '352469857280193', NULL, 'a13 128 4ram .', NULL, 'other', 1, NULL, 0, 'dollar', 160, 170, NULL, 1, 1),
(195, '354015795702760', NULL, 'a03 core 2ram 32gp .', NULL, 'other', 1, NULL, 0, 'dollar', 85, 100, NULL, 1, 1),
(196, '8806092710757', NULL, 'a03s 4rab 64gb.', NULL, 'other', 1, NULL, 0, 'dollar', 124, 135, NULL, 1, 1),
(197, '358211683329644', NULL, 'spark 8pro 4ram 128gb', NULL, 'other', 1, NULL, 0, 'dollar', 128, 140, NULL, 1, 1),
(198, '356077483147581', NULL, 'spark 8c 2ram 128gb', NULL, 'other', 1, NULL, 0, 'dollar', 89, 100, NULL, 1, 1),
(199, '357047363800285', NULL, 'spark 8c 4ram 128gb.', NULL, 'other', 1, NULL, 0, 'dollar', 114, 125, NULL, 1, 1),
(200, '333', NULL, 'air pods..', NULL, 'other', 1, NULL, 0, 'dollar', 3, 7, NULL, 1, 1),
(201, '902', NULL, 'earphone oraimo e2', NULL, 'other', 1, NULL, 0, 'dollar', 0.75, 2, NULL, 1, 1),
(202, '6847', NULL, 'ar phone akj', NULL, 'other', 1, NULL, 0, 'lira', 3, 6, NULL, 1, 1),
(203, '356298776248577', NULL, 'a03 core 2ram 32gb', NULL, 'other', 1, NULL, 0, 'dollar', 84, 95, NULL, 1, 1),
(204, '6937643539885', NULL, 'vap', NULL, 'other', 1, NULL, 0, 'dollar', 9, 11, NULL, 1, 1),
(205, '6937643539892', NULL, 'vap', NULL, 'other', 1, NULL, 0, 'dollar', 9, 11, NULL, 1, 1),
(206, '6937643539878', NULL, 'vap', NULL, 'other', 1, NULL, 0, 'dollar', 9, 11, NULL, 1, 1),
(207, '6937643539861', NULL, 'vap', NULL, 'other', 1, NULL, 0, 'dollar', 9, 11, NULL, 1, 1),
(208, '862788068069043', NULL, 'ridmi note 11 6ram', NULL, 'other', 1, NULL, 0, 'dollar', 178, 190, NULL, 1, 1),
(209, '8806092708266', NULL, 'Galaxy A03s', NULL, 'other', 1, NULL, 0, 'dollar', 120, 130, NULL, 1, 1),
(210, '352408540755864', NULL, 'spark 9t', NULL, 'other', 1, NULL, 0, 'dollar', 123, 135, NULL, 1, 1),
(211, '6937643539847', NULL, 'VAPE CRANBERRY', NULL, 'other', 1, NULL, 0, 'dollar', 8.5, 11, NULL, 1, 1),
(212, '6974872931899', NULL, 'vap blue razz', NULL, 'other', 1, NULL, 0, 'dollar', 8, 11, NULL, 1, 1),
(213, '6974872931929', NULL, 'vap blueberry 5000', NULL, 'other', 1, NULL, 0, 'dollar', 9.5, 13, NULL, 1, 1),
(214, '740617309928', NULL, 'usp kingston 128gb', NULL, 'other', 1, NULL, 0, 'dollar', 9.5, 15, NULL, 1, 1),
(215, '358799690972273', NULL, 'a04s', NULL, 'other', 1, NULL, 0, 'dollar', 135, 145, NULL, 1, 1),
(216, '356185418851423', NULL, 'a13 6 128gb', NULL, 'other', 1, NULL, 0, 'dollar', 169, 180, NULL, 1, 1),
(217, '860511057412400', NULL, 'redmi note s100', NULL, 'other', 1, NULL, 0, 'dollar', 165, 175, NULL, 1, 1),
(218, '305245544556', NULL, 'headset jbl', NULL, 'other', 1, NULL, 0, 'dollar', 7, 10, NULL, 1, 1),
(219, '1', NULL, 'earpods 7', NULL, 'other', 1, NULL, 0, 'dollar', 3, 7, NULL, 1, 1),
(220, '1512', NULL, 'earpods pro', NULL, 'other', 1, NULL, 0, 'dollar', 6, 10, NULL, 1, 1),
(221, '6112', NULL, 'cover airpods s', NULL, 'other', 1, NULL, 0, 'dollar', 2, 3, NULL, 1, 1),
(222, '6934747800248', NULL, 'e strong power tc', NULL, 'other', 1, NULL, 0, 'dollar', 3, 5, NULL, 1, 1),
(223, '1368478878880', NULL, 'charger remax', NULL, 'other', 1, NULL, 0, 'dollar', 2, 3, NULL, 1, 1),
(224, '6933138622063', NULL, 'charger ios', NULL, 'other', 1, NULL, 0, 'dollar', 3.5, 5, NULL, 1, 1),
(225, '6972424716178', NULL, 'bavin micro', NULL, 'other', 1, NULL, 0, 'dollar', 1, 1.5, NULL, 1, 1),
(226, '6931392500905', NULL, 'keybord gaming', NULL, 'other', 1, NULL, 0, 'dollar', 12, 15, NULL, 1, 1),
(227, '6951066952212', NULL, 'netis repiter', NULL, 'other', 1, NULL, 0, 'dollar', 11, 16, NULL, 1, 1),
(228, '1000229514600030', NULL, 'net repiter', NULL, 'other', 1, NULL, 0, 'dollar', 11, 16, NULL, 1, 1),
(229, '12000720310460', NULL, 'gs ups', NULL, 'other', 1, NULL, 0, 'dollar', 18, 20, NULL, 1, 1),
(230, '740617298697', NULL, 'memory 64', NULL, 'other', 1, NULL, 0, 'dollar', 9, 12, NULL, 1, 1),
(231, '619659066888', NULL, 'memory 16', NULL, 'other', 1, NULL, 0, 'dollar', 4.5, 6, NULL, 1, 1),
(232, '740617128147', NULL, 'memory 8', NULL, 'other', 1, NULL, 0, 'dollar', 3.75, 5, NULL, 1, 1),
(233, '6945869290961', NULL, 'charger ios bilton', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(234, '6970791121823', NULL, 'charger ios tranco', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 2, NULL, 1, 1),
(235, '7552012160010', NULL, 'mp3 car', NULL, 'other', 1, NULL, 0, 'dollar', 2, 3, NULL, 1, 1),
(236, '4242', NULL, 'mp3 car fm', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(237, '6', NULL, 'mp3 car g95', NULL, 'other', 1, NULL, 0, 'dollar', 2, 2.5, NULL, 1, 1),
(238, '6912586236251', NULL, 'bracket', NULL, 'other', 1, NULL, 0, 'dollar', 2, 3, NULL, 1, 1),
(239, '6933138633311', NULL, 'usb car charger', NULL, 'other', 1, NULL, 0, 'dollar', 2, 3, NULL, 1, 1),
(240, '7270', NULL, 'charegr tc', NULL, 'other', 1, NULL, 0, 'dollar', 3, 4, NULL, 1, 1),
(241, '7', NULL, 'charegr bavin', NULL, 'other', 1, NULL, 0, 'dollar', 3, 5, NULL, 1, 1),
(242, '5712', NULL, 'otb usb', NULL, 'other', 1, NULL, 0, 'dollar', 0.65, 1.5, NULL, 1, 1),
(243, '2564519897950', NULL, 'tc connect', NULL, 'other', 1, NULL, 0, 'dollar', 0.65, 1.5, NULL, 1, 1),
(244, '4260113520666', NULL, 'otg connect', NULL, 'other', 1, NULL, 0, 'dollar', 0.65, 1.5, NULL, 1, 1),
(245, '9', NULL, 'bic support', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 4, NULL, 1, 1),
(246, '6947798091107', NULL, 'mskit pc', NULL, 'other', 1, NULL, 0, 'dollar', 3, 5, NULL, 1, 1),
(247, '357884862226764', NULL, 'tap tecno 4G', NULL, 'other', 1, NULL, 0, 'dollar', 95, 105, NULL, 1, 1),
(248, 'R9YR30HKYSJ', NULL, 'samsung a02s 32GB', NULL, 'other', 1, NULL, 0, 'dollar', 112, 120, NULL, 1, 1),
(249, 'RZ8R510LJ6K', NULL, 'samsung a02 64GB', NULL, 'other', 1, NULL, 0, 'dollar', 107, 115, NULL, 1, 1),
(250, 'RF8R31YPYVH', NULL, 'samsung a32 128GB', NULL, 'other', 1, NULL, 0, 'dollar', 249, 250, NULL, 1, 1),
(251, '352925286226867', NULL, 'tecno sp 6 128GB', NULL, 'other', 1, NULL, 0, 'lira', 130, 135, NULL, 1, 1),
(252, '357876813464007', NULL, 'tecno 7 pro 128GB', NULL, 'other', 1, NULL, 0, 'dollar', 133, 140, NULL, 1, 1),
(253, '356980900852966', NULL, 'tecno sp7 64GB', NULL, 'other', 1, NULL, 0, 'dollar', 106, 115, NULL, 1, 1),
(254, '354443480384589', NULL, 'tecno 6 go', NULL, 'other', 1, NULL, 0, 'dollar', 80, 90, NULL, 1, 1),
(255, '28139621800047', NULL, 'cablevision resiver 1', NULL, 'other', 1, NULL, 0, 'lira', 750000, 820000, NULL, 1, 1),
(256, '28139621800001', NULL, 'cablevision resiver 2', NULL, 'other', 1, NULL, 0, 'lira', 750000, 820000, NULL, 1, 1),
(257, '6913410785549', NULL, 'chromecast', NULL, 'other', 1, NULL, 0, 'dollar', 10, 13, NULL, 1, 1),
(258, '6182', NULL, 'jus vip', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2.5, NULL, 1, 1),
(259, '6495', NULL, 'mic aux', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 3, NULL, 1, 1),
(260, '2019011117049', NULL, 'bavin wirless charg', NULL, 'other', 1, NULL, 0, 'dollar', 6, 8, NULL, 1, 1),
(261, '6675', NULL, 'mic type c', NULL, 'other', 1, NULL, 0, 'dollar', 3.5, 4.5, NULL, 1, 1),
(262, '6674', NULL, 'mic ios', NULL, 'other', 1, NULL, 0, 'dollar', 3.5, 5, NULL, 1, 1),
(263, '6971410550697', NULL, 'card reader ios', NULL, 'other', 1, NULL, 0, 'dollar', 3, 4, NULL, 1, 1),
(264, '6937372247716', NULL, 'perfume 212', NULL, 'other', 1, NULL, 0, 'lira', 60000, 100000, NULL, 1, 1),
(265, '6937372283752', NULL, 'perfume vercaga', NULL, 'other', 1, NULL, 0, 'lira', 60000, 100000, NULL, 1, 1),
(266, '6937372285268', NULL, 'perfume locasit', NULL, 'other', 1, NULL, 0, 'lira', 60000, 100000, NULL, 1, 1),
(267, '6937372281246', NULL, 'perfume good girl', NULL, 'other', 1, NULL, 0, 'lira', 60000, 100000, NULL, 1, 1),
(268, '6937372281901', NULL, 'perfume si', NULL, 'other', 1, NULL, 0, 'lira', 60000, 100000, NULL, 1, 1),
(269, '3137370318552', NULL, 'perfume nina', NULL, 'other', 1, NULL, 0, 'lira', 60000, 100000, NULL, 1, 1),
(270, '6937926336316', NULL, 'perfume chanell', NULL, 'other', 1, NULL, 0, 'lira', 40000, 75000, NULL, 1, 1),
(271, 'RZ8R616Z7ET', NULL, 'a12', NULL, 'other', 1, NULL, 0, 'dollar', 152, 160, NULL, 1, 1),
(272, '8806090858680', NULL, 'a12 128gb', NULL, 'other', 1, NULL, 0, 'dollar', 160, 170, NULL, 1, 1),
(273, '6842863133136', NULL, 'tws-02', NULL, 'other', 1, NULL, 0, 'dollar', 10, 20, NULL, 1, 1),
(274, '359368552826768', NULL, 'camon 17 -1', NULL, 'other', 1, NULL, 0, 'dollar', 155, 165, NULL, 1, 1),
(275, '357876813439280', NULL, 'spark 7 pro 128gb -1', NULL, 'other', 1, NULL, 0, 'dollar', 132, 140, NULL, 1, 1),
(276, '356980900767685', NULL, 'spark 7 pro 64gb -1', NULL, 'other', 1, NULL, 0, 'dollar', 105, 115, NULL, 1, 1),
(277, '350265015767960', NULL, 'pop4  gray-1', NULL, 'other', 1, NULL, 0, 'dollar', 76, 85, NULL, 1, 1),
(278, '359368552837724', NULL, 'camon 17 -2', NULL, 'other', 1, NULL, 0, 'dollar', 153, 160, NULL, 1, 1),
(279, '860219056623353', NULL, 'c11', NULL, 'other', 1, NULL, 0, 'dollar', 82, 90, NULL, 1, 1),
(280, '861672053024737', NULL, 'c21 y', NULL, 'other', 1, NULL, 0, 'dollar', 113, 125, NULL, 1, 1),
(281, '6958613145622', NULL, 'ge6', NULL, 'other', 1, NULL, 0, 'dollar', 5.5, 8, NULL, 1, 1),
(282, '350821020983784', NULL, 'pop4  gray-2', NULL, 'other', 1, NULL, 0, 'dollar', 76, 85, NULL, 1, 1),
(283, '6012332769726', NULL, 'power 20ma plo-pd25', NULL, 'other', 1, NULL, 0, 'dollar', 18, 25, NULL, 1, 1),
(284, '6935364061166', NULL, 'tplink adsl2+', NULL, 'other', 1, NULL, 0, 'dollar', 20, 25, NULL, 1, 1),
(285, '860219056610293', NULL, 'c11 -2', NULL, 'other', 1, NULL, 0, 'dollar', 82, 90, NULL, 1, 1),
(286, '861672055478295', NULL, 'c21 y -2', NULL, 'other', 1, NULL, 0, 'dollar', 113, 125, NULL, 1, 1),
(287, '359368553017441', NULL, 'camon 17 -3', NULL, 'other', 1, NULL, 0, 'dollar', 153, 165, NULL, 1, 1),
(288, '358612713926483', NULL, 'spark 7 32', NULL, 'other', 1, NULL, 0, 'dollar', 88, 100, NULL, 1, 1),
(289, '356980901534464', NULL, 'spark 7 64', NULL, 'other', 1, NULL, 0, 'dollar', 105, 115, NULL, 1, 1),
(290, '356980901734148', NULL, 'spark 7 64gb', NULL, 'other', 1, NULL, 0, 'dollar', 104, 107, NULL, 1, 1),
(291, '356980901708803', NULL, 'spark7 64gb', NULL, 'other', 1, NULL, 0, 'dollar', 104, 107, NULL, 1, 1),
(292, '867217055131033', NULL, 'redmi note 10 pro', NULL, 'other', 1, NULL, 0, 'dollar', 228, 240, NULL, 1, 1),
(293, '351309180277865', NULL, 'spark 7 t', NULL, 'other', 1, NULL, 0, 'dollar', 113, 120, NULL, 1, 1),
(294, '619659115890', NULL, 'usb 32 gb', NULL, 'other', 1, NULL, 0, 'dollar', 6, 8, NULL, 1, 1),
(295, '358356981965399', NULL, 'infinik hot play', NULL, 'other', 1, NULL, 0, 'dollar', 120, 130, NULL, 1, 1),
(296, '354588353450998', NULL, 'black view tab 8', NULL, 'other', 1, NULL, 0, 'dollar', 140, 150, NULL, 1, 1),
(297, '358612713871846', NULL, 'spark 7 32gb', NULL, 'other', 1, NULL, 0, 'dollar', 88, 100, NULL, 1, 1),
(298, '351309180210627', NULL, 'spark 7 t 64', NULL, 'other', 1, NULL, 0, 'dollar', 112, 120, NULL, 1, 1),
(299, '356980901727761', NULL, 'spark 764', NULL, 'other', 1, NULL, 0, 'dollar', 104, 115, NULL, 1, 1),
(300, '350821021167627', NULL, 'tecno pop 4 32gb', NULL, 'other', 1, NULL, 0, 'dollar', 79, 85, NULL, 1, 1),
(301, '356980902789463', NULL, 'tecno 7 64', NULL, 'other', 1, NULL, 0, 'dollar', 104, 115, NULL, 1, 1),
(302, '351309180054843', NULL, 'tecno 7 t 64', NULL, 'other', 1, NULL, 0, 'dollar', 113, 120, NULL, 1, 1),
(303, '6965121531120', NULL, 'stand phon', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(304, '358612714796208', NULL, 'spark 7 32 -2', NULL, 'other', 1, NULL, 0, 'dollar', 90, 100, NULL, 1, 1),
(305, '2154544', NULL, 'Dvd play for pc', NULL, 'other', 1, NULL, 0, 'dollar', 15, 15, NULL, 1, 1),
(306, '156454564', NULL, 'Dvd play for laptop slim', NULL, 'other', 1, NULL, 0, 'dollar', 14, 18, NULL, 1, 1),
(307, '357774833465759', NULL, 'samsung a03s', NULL, 'other', 1, NULL, 0, 'dollar', 129, 135, NULL, 1, 1),
(308, '357774832617301', NULL, 'a03s 4-64', NULL, 'other', 1, NULL, 0, 'dollar', 129, 135, NULL, 1, 1),
(309, '6942635702604', NULL, 'ring light 26cm', NULL, 'other', 1, NULL, 0, 'dollar', 5.5, 9, NULL, 1, 1),
(310, '1122', NULL, 'tv box', NULL, 'other', 1, NULL, 0, 'dollar', 20, 30, NULL, 1, 1),
(311, '350821022924786', NULL, 'pop4  gray-3', NULL, 'other', 1, NULL, 0, 'dollar', 78, 90, NULL, 1, 1),
(312, NULL, NULL, 'lb link cat 5 cabel net', NULL, 'other', 1, NULL, 0, 'dollar', 17, 23, NULL, 1, 1),
(313, NULL, NULL, 'lb link cat 6 cable net', NULL, 'other', 1, NULL, 0, 'dollar', 24, 30, NULL, 1, 1),
(314, '922351548725', NULL, 'v link 4 antin', NULL, 'other', 1, NULL, 0, 'dollar', 13, 18, NULL, 1, 1),
(315, '8681830006879', NULL, 'power bank lkp10 30ma', NULL, 'other', 1, NULL, 0, 'dollar', 20, 28, NULL, 1, 1),
(316, '6972424716741', NULL, 'headphone bh-28', NULL, 'other', 1, NULL, 0, 'dollar', 10, 14, NULL, 1, 1),
(317, '125', NULL, 'lightning to 3.5 aux ios', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(318, '6226', NULL, 'j-009 aux', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(319, '6971410554329', NULL, '2in1 et-ot33', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(320, '8180', NULL, 'poe 24v', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 6, NULL, 1, 1),
(321, '2233', NULL, 'tripod', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 2.5, NULL, 1, 1),
(322, '1334', NULL, 'cabel sat 50y', NULL, 'other', 1, NULL, 0, 'dollar', 5, 7, NULL, 1, 1),
(323, '6970698580075', NULL, 'hola wl26', NULL, 'other', 1, NULL, 0, 'dollar', 12, 14, NULL, 1, 1),
(324, '6933048504565', NULL, 'keybord 3ade', NULL, 'other', 1, NULL, 0, 'dollar', 3.5, 5, NULL, 1, 1),
(325, '356821850069203', NULL, 'camon 18p', NULL, 'other', 1, NULL, 0, 'dollar', 206, 225, NULL, 1, 1),
(326, '865994054979016', NULL, 'oppo a 15', NULL, 'other', 1, NULL, 0, 'dollar', 106, 115, NULL, 1, 1),
(327, '868767054396630', NULL, 'oppo a 54', NULL, 'other', 1, NULL, 0, 'dollar', 145, 155, NULL, 1, 1),
(328, '351309181725029', NULL, 'spark 7 t 64 /4', NULL, 'other', 1, NULL, 0, 'dollar', 112, 120, NULL, 1, 1),
(329, '8806092287969', NULL, 'galaxy a22', NULL, 'other', 1, NULL, 0, 'dollar', 188, 200, NULL, 1, 1),
(330, '351309184067908', NULL, 'spark 7 t 64 //4', NULL, 'other', 1, NULL, 0, 'dollar', 113, 120, NULL, 1, 1),
(331, '354586858386055', NULL, 'a03s 4-64 2', NULL, 'other', 1, NULL, 0, 'dollar', 127, 140, NULL, 1, 1),
(332, '6973558961069', NULL, 'power banck sp 29 20000mah', NULL, 'other', 1, NULL, 0, 'dollar', 16, 22, NULL, 1, 1),
(333, '356821850843821', NULL, 'camon 18p', NULL, 'other', 1, NULL, 0, 'dollar', 206, 225, NULL, 1, 1),
(334, '354801641667129', NULL, 'spark go 2022', NULL, 'other', 1, NULL, 0, 'dollar', 89, 100, NULL, 1, 1),
(335, '1002', NULL, 'bk-015', NULL, 'other', 1, NULL, 0, 'dollar', 6.5, 12, NULL, 1, 1),
(336, '740617243024', NULL, 'usb 32type c', NULL, 'other', 1, NULL, 0, 'dollar', 11, 15, NULL, 1, 1),
(337, '356821850561647', NULL, 'camon 18p -2', NULL, 'other', 1, NULL, 0, 'dollar', 206, 225, NULL, 1, 1),
(338, '354801641950608', NULL, 'spark go 2022  1+1', NULL, 'other', 1, NULL, 0, 'dollar', 89, 100, NULL, 1, 1),
(339, '3103', NULL, 'earphone iphone', NULL, 'other', 1, NULL, 0, 'dollar', 3, 5, NULL, 1, 1),
(340, 'mj26', NULL, 'RGB ring right', NULL, 'other', 1, NULL, 0, 'dollar', 10, 13, NULL, 1, 1),
(341, '6973224872729', NULL, 'dual port aux+type c', NULL, 'other', 1, NULL, 0, 'dollar', 2.15, 5, NULL, 1, 1),
(342, '6935364053086', NULL, 'tp link multi', NULL, 'other', 1, NULL, 0, 'dollar', 9.5, 16, NULL, 1, 1),
(343, '6970698587012', NULL, 'battery ipone7', NULL, 'other', 1, NULL, 0, 'dollar', 10, 15, NULL, 1, 1),
(344, '5159', NULL, 'battery iphone6', NULL, 'other', 1, NULL, 0, 'dollar', 10, 12, NULL, 1, 1),
(345, '5158', NULL, 'battery iphone 8', NULL, 'other', 1, NULL, 0, 'dollar', 10, 15, NULL, 1, 1),
(346, '357401697482627', NULL, 'pova 2', NULL, 'other', 1, NULL, 0, 'dollar', 167, 180, NULL, 1, 1),
(347, '355012520745643', NULL, 'spark 8t', NULL, 'other', 1, NULL, 0, 'dollar', 121, 130, NULL, 1, 1),
(348, '351309183643105', NULL, 'spark 7 t 64)4', NULL, 'other', 1, NULL, 0, 'dollar', 112, 120, NULL, 1, 1),
(349, 'FSP3-1202110141634', NULL, 'ups router', NULL, 'other', 1, NULL, 0, 'dollar', 15, 20, NULL, 1, 1),
(350, '8003510022274', NULL, 'malizia', NULL, 'other', 1, NULL, 0, 'dollar', 1.75, 3, NULL, 1, 1),
(351, 'PF/1', NULL, 'malizia', NULL, 'other', 1, NULL, 0, 'dollar', 1.75, 3, NULL, 1, 1),
(352, '8003510030576', NULL, 'malizia', NULL, 'other', 1, NULL, 0, 'dollar', 1.75, 3, NULL, 1, 1),
(353, '8003510024193', NULL, 'malizia', NULL, 'other', 1, NULL, 0, 'dollar', 1.75, 3, NULL, 1, 1),
(354, '8714100019740', NULL, 'rexona', NULL, 'other', 1, NULL, 0, 'dollar', 1.65, 3, NULL, 1, 1),
(355, '6972011063319', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(356, '6937372290033', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(357, '6937372283813', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(358, '6972011062701', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(359, '6937372289969', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(360, '6972011066518', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(361, '6972011065283', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(362, '6972011066129', NULL, 'fragrance', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(363, '6972011066204', NULL, 'fragrance', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(364, '6972011066280', NULL, 'fragrance', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(365, 'ٍِظ5210', NULL, 'body splash برق', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(366, '667550485444', NULL, 'victroria original', NULL, 'other', 1, NULL, 0, 'dollar', 6, 10, NULL, 1, 1),
(367, '667538086212', NULL, 'victroria original', NULL, 'other', 1, NULL, 0, 'dollar', 6, 10, NULL, 1, 1),
(368, 'SA/4201', NULL, 'perfum 2', NULL, 'other', 1, NULL, 0, 'dollar', 4.25, 6.5, NULL, 1, 1),
(369, 'SA/4195', NULL, 'perfum 2', NULL, 'other', 1, NULL, 0, 'dollar', 3.75, 6, NULL, 1, 1),
(370, 'SA/3051', NULL, 'perfum 2', NULL, 'other', 1, NULL, 0, 'dollar', 3.5, 6, NULL, 1, 1),
(371, 'SA/867', NULL, 'perfum 2', NULL, 'other', 1, NULL, 0, 'dollar', 3.75, 6, NULL, 1, 1),
(372, 'SA/4192', NULL, 'perfum 2', NULL, 'other', 1, NULL, 0, 'dollar', 5, 7, NULL, 1, 1),
(373, '7515', NULL, 'perfum 2', NULL, 'other', 1, NULL, 0, 'dollar', 3.25, 6, NULL, 1, 1),
(374, '6937372287514', NULL, 'perfum 3', NULL, 'other', 1, NULL, 0, 'dollar', 1.25, 3, NULL, 1, 1),
(375, '6937372278017', NULL, 'perfum 3', NULL, 'other', 1, NULL, 0, 'dollar', 1.25, 3, NULL, 1, 1),
(376, '6937372271971', NULL, 'perfum 3', NULL, 'other', 1, NULL, 0, 'dollar', 1.25, 3, NULL, 1, 1),
(377, '6937372271834', NULL, 'perfum 3', NULL, 'other', 1, NULL, 0, 'dollar', 1.25, 3, NULL, 1, 1),
(378, '6937372274262', NULL, 'perfum 3', NULL, 'other', 1, NULL, 0, 'dollar', 1.25, 3, NULL, 1, 1),
(379, '6937372279502', NULL, 'perfum 3', NULL, 'other', 1, NULL, 0, 'dollar', 1.25, 3, NULL, 1, 1),
(380, '354588354619302', NULL, 'blackview tab 8', NULL, 'other', 1, NULL, 0, 'dollar', 125, 145, NULL, 1, 1),
(381, '6970462514336', NULL, 'power bank 30000mah', NULL, 'other', 1, NULL, 0, 'dollar', 18, 28, NULL, 1, 1),
(382, '5665', NULL, 'otg aux type c', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 5, NULL, 1, 1),
(383, '6973558960222', NULL, 'otg type c', NULL, 'other', 1, NULL, 0, 'dollar', 2, 4, NULL, 1, 1),
(384, '503', NULL, 'adapter 2A', NULL, 'other', 1, NULL, 0, 'dollar', 0.9, 2, NULL, 1, 1),
(385, '703', NULL, 'cable 90m', NULL, 'other', 1, NULL, 0, 'dollar', 6, 10, NULL, 1, 1),
(386, '6423', NULL, 'stand camera', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(387, '6421', NULL, 'stand camera', NULL, 'other', 1, NULL, 0, 'dollar', 9, 15, NULL, 1, 1),
(388, '808', NULL, 'bavin earphone 1', NULL, 'other', 1, NULL, 0, 'dollar', 3.35, 7, NULL, 1, 1),
(389, '6040', NULL, 'bavin earphone 2', NULL, 'other', 1, NULL, 0, 'dollar', 2.15, 6, NULL, 1, 1),
(390, '354668776340057', NULL, 'a12 128gb', NULL, 'other', 1, NULL, 0, 'dollar', 170, 180, NULL, 1, 1),
(391, '357401697054541', NULL, 'pova 2 -1', NULL, 'other', 1, NULL, 0, 'dollar', 169, 180, NULL, 1, 1),
(392, '358554567431782', NULL, 'spark 8c 4ram 64gb', NULL, 'other', 1, NULL, 0, 'dollar', 108, 120, NULL, 1, 1),
(393, '350165821800957', NULL, 'a03 core +++', NULL, 'other', 1, NULL, 0, 'dollar', 87, 95, NULL, 1, 1),
(394, NULL, NULL, 'remot star sat', NULL, 'other', 1, NULL, 0, 'dollar', 2, 3, NULL, 1, 1),
(395, '520', NULL, 'dvd player', NULL, 'other', 1, NULL, 0, 'dollar', 13, 15, NULL, 1, 1),
(396, NULL, NULL, 'adapter car zaher', NULL, 'other', 1, NULL, 0, 'lira', 20000, 30000, NULL, 1, 1),
(397, '9838854848667', NULL, 'mouse pad', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 2.5, NULL, 1, 1),
(398, '606', NULL, 'mouse pads', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(399, '7966', NULL, 'batery j7', NULL, 'other', 1, NULL, 0, 'dollar', 2, 5, NULL, 1, 1),
(400, '4345', NULL, 'batery j7  2016', NULL, 'other', 1, NULL, 0, 'dollar', 3, 5, NULL, 1, 1),
(401, '1520', NULL, 'battery note 3', NULL, 'other', 1, NULL, 0, 'dollar', 3.5, 5, NULL, 1, 1),
(402, '866935057758005', NULL, 'note 10s', NULL, 'other', 1, NULL, 0, 'dollar', 182, 195, NULL, 1, 1),
(403, '6214005508124', NULL, 'armani', NULL, 'other', 1, NULL, 0, 'dollar', 1.1, 2, NULL, 1, 1),
(404, '356782980033966', NULL, 'pop 5 ltes 32/2', NULL, 'other', 1, NULL, 0, 'dollar', 80, 90, NULL, 1, 1),
(405, 'GX7ZJ5S2LKKT', NULL, 'airpod pro', NULL, 'other', 1, NULL, 0, 'dollar', 13, 25, NULL, 1, 1),
(406, '861929067552321', NULL, 'redmi note 11 pro', NULL, 'other', 1, NULL, 0, 'dollar', 230, 240, NULL, 1, 1),
(407, '861929069701389', NULL, 'redmi note 11 proredmi note 11 pro+2', NULL, 'other', 1, NULL, 0, 'dollar', 230, 240, NULL, 1, 1),
(408, '353976318432196', NULL, 'a03', NULL, 'other', 1, NULL, 0, 'dollar', 115, 125, NULL, 1, 1),
(409, '354690579344003', NULL, 'a13 6ram 128gb', NULL, 'other', 1, NULL, 0, 'dollar', 172, 180, NULL, 1, 1),
(410, '6973214691484', NULL, 'phoiniks h1', NULL, 'other', 1, NULL, 0, 'dollar', 10, 14, NULL, 1, 1),
(411, 'Y762E', NULL, 'wireless speaker', NULL, 'other', 1, NULL, 0, 'dollar', 16, 20, NULL, 1, 1),
(412, '2201', NULL, 'batri ip 6', NULL, 'other', 1, NULL, 0, 'dollar', 7, 15, NULL, 1, 1),
(413, '2202', NULL, 'batri ip6s', NULL, 'other', 1, NULL, 0, 'dollar', 7, 15, NULL, 1, 1),
(414, '2203', NULL, 'batri ip6 p', NULL, 'other', 1, NULL, 0, 'dollar', 8, 15, NULL, 1, 1),
(415, '2204', NULL, 'batri ip6sp', NULL, 'other', 1, NULL, 0, 'dollar', 8, 15, NULL, 1, 1),
(416, '740617326260', NULL, 'memory 64', NULL, 'other', 1, NULL, 0, 'dollar', 7, 12, NULL, 1, 1),
(417, '6972424718462', NULL, 'apple watch charge', NULL, 'other', 1, NULL, 0, 'dollar', 5, 15, NULL, 1, 1),
(418, '7575', NULL, 'p.r10000 gerlax', NULL, 'other', 1, NULL, 0, 'dollar', 8.5, 13, NULL, 1, 1),
(419, '352469855166063', NULL, 'a13 128 4 ram', NULL, 'other', 1, NULL, 0, 'dollar', 160, 170, NULL, 1, 1),
(420, 'H6TFQTDB0C6L', NULL, 'air pods pro', NULL, 'other', 1, NULL, 0, 'dollar', 15, 25, NULL, 1, 1),
(421, '4560179904296', NULL, 'kfof pubg', NULL, 'other', 1, NULL, 0, 'dollar', 0.5, 1, NULL, 1, 1),
(422, '6565', NULL, 'memory 16', NULL, 'other', 1, NULL, 0, 'dollar', 4, 9, NULL, 1, 1),
(423, '358452986806256', NULL, 'a03s 4-64-1', NULL, 'other', 1, NULL, 0, 'dollar', 124, 135, NULL, 1, 1),
(424, '869880052723223', NULL, 'honor x7 4ram 128gb', NULL, 'other', 1, NULL, 0, 'dollar', 153, 162, NULL, 1, 1),
(425, '4895180763274', NULL, 'buds', NULL, 'other', 1, NULL, 0, 'dollar', 10, 20, NULL, 1, 1),
(426, '3355', NULL, 'air pods .', NULL, 'other', 1, NULL, 0, 'dollar', 9, 15, NULL, 1, 1),
(427, '190198889966', NULL, 'charge iphone', NULL, 'other', 1, NULL, 0, 'dollar', 7.5, 15, NULL, 1, 1),
(428, '1100', NULL, 'cabel iphone', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 5, NULL, 1, 1),
(429, '3200', NULL, 'case airpods.', NULL, 'other', 1, NULL, 0, 'dollar', 1, 3, NULL, 1, 1),
(430, '7711', NULL, 'speaker 8', NULL, 'other', 1, NULL, 0, 'dollar', 15, 20, NULL, 1, 1),
(431, '358452986805514', NULL, 'a03s 4ram 64gb', NULL, 'other', 1, NULL, 0, 'dollar', 120, 135, NULL, 1, 1),
(432, '4549995030280', NULL, 'cover selicon', NULL, 'other', 1, NULL, 0, 'dollar', 1.3, 3, NULL, 1, 1),
(433, '6882', NULL, 'air pod redmi', NULL, 'other', 1, NULL, 0, 'dollar', 7.5, 15, NULL, 1, 1),
(434, '2001', NULL, 'buds tws baven', NULL, 'other', 1, NULL, 0, 'dollar', 17, 25, NULL, 1, 1),
(435, '6821', NULL, 'covar a03s polo', NULL, 'other', 1, NULL, 0, 'dollar', 1.4, 3, NULL, 1, 1),
(436, '731', NULL, 'covar a03', NULL, 'other', 1, NULL, 0, 'dollar', 0.75, 2, NULL, 1, 1),
(437, '6973224873412', NULL, 'veenmenv', NULL, 'other', 1, NULL, 0, 'dollar', 4, 6, NULL, 1, 1),
(438, '6956993998845', NULL, 'mouse cable', NULL, 'other', 1, NULL, 0, 'dollar', 4.5, 10, NULL, 1, 1),
(439, '2020', NULL, 'bods tws', NULL, 'other', 1, NULL, 0, 'dollar', 17, 25, NULL, 1, 1),
(440, '356185418211065', NULL, 'a13 6ram 128gb', NULL, 'other', 1, NULL, 0, 'dollar', 169, 180, NULL, 1, 1),
(441, '350060037917358', NULL, 'a03s 64gb', NULL, 'other', 1, NULL, 0, 'dollar', 118, 130, NULL, 1, 1),
(442, '354578361693002', NULL, 'pop 6pro', NULL, 'other', 1, NULL, 0, 'dollar', 81, 90, NULL, 1, 1),
(443, '351978520602980', NULL, 'a13 4 ram', NULL, 'other', 1, NULL, 0, 'dollar', 170, 180, NULL, 1, 1),
(444, '9036', NULL, 'smar watch', NULL, 'other', 1, NULL, 0, 'dollar', 16, 25, NULL, 1, 1),
(445, '9037', NULL, 'smart watch', NULL, 'other', 1, NULL, 0, 'dollar', 15, 25, NULL, 1, 1),
(446, '8124403842396310', NULL, 'cabil vision', NULL, 'other', 1, NULL, 0, 'dollar', 40, 50, NULL, 1, 1),
(447, '8124403842318640', NULL, 'cabel vision .', NULL, 'other', 1, NULL, 0, 'dollar', 40, 50, NULL, 1, 1),
(448, '8124403842312890', NULL, 'cabel vision ..', NULL, 'other', 1, NULL, 0, 'dollar', 40, 50, NULL, 1, 1),
(449, '8124403842393280', NULL, 'cabel vision .1', NULL, 'other', 1, NULL, 0, 'dollar', 40, 50, NULL, 1, 1),
(450, '8124403842331870', NULL, 'cabel vision .2', NULL, 'other', 1, NULL, 0, 'dollar', 40, 50, NULL, 1, 1),
(451, NULL, NULL, 'cabel power', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(452, '6920680876730', NULL, 'holder c71', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 6, NULL, 1, 1),
(453, '868441063913682', NULL, 'REDMI NOTE 1-11', NULL, 'other', 1, NULL, 0, 'dollar', 174, 185, NULL, 1, 1),
(454, '6985967025997', NULL, 'watch case m44', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 3, NULL, 1, 1),
(455, '126', NULL, 'magsafe charge', NULL, 'other', 1, NULL, 0, 'dollar', 6, 12, NULL, 1, 1),
(456, '6937643539823', NULL, 'Vape blue raz', NULL, 'other', 1, NULL, 0, 'dollar', 8.5, 11, NULL, 1, 1),
(457, '6937643539915', NULL, 'vape straw mango', NULL, 'other', 1, NULL, 0, 'dollar', 8.5, 11, NULL, 1, 1),
(458, '6974872931868', NULL, 'vap mango 3000', NULL, 'other', 1, NULL, 0, 'dollar', 7, 10, NULL, 1, 1),
(459, '358799690957068', NULL, 'galaxy a40s', NULL, 'other', 1, NULL, 0, 'dollar', 135, 145, NULL, 1, 1),
(460, '6937643539908', NULL, 'vape sukara grape', NULL, 'other', 1, NULL, 0, 'dollar', 8, 11, NULL, 1, 1),
(461, '6937643539922', NULL, 'vape berry ice', NULL, 'other', 1, NULL, 0, 'dollar', 8.5, 11, NULL, 1, 1),
(462, '6937643539830', NULL, 'vape blue beery ice', NULL, 'other', 1, NULL, 0, 'dollar', 8.5, 11, NULL, 1, 1),
(463, '352517302754962', NULL, 'pova 4', NULL, 'other', 1, NULL, 0, 'dollar', 167, 175, NULL, 1, 1),
(464, '6973965933130', NULL, 'bracket holder', NULL, 'other', 1, NULL, 0, 'dollar', 5, 9, NULL, 1, 1),
(465, '6954201905777', NULL, 'samsung usbc edition', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(466, '6956186408854', NULL, 'rgb led', NULL, 'other', 1, NULL, 0, 'dollar', 9, 14, NULL, 1, 1),
(467, NULL, NULL, 'galaxy a03 core', NULL, 'other', 1, NULL, 0, 'dollar', 83, 95, NULL, 1, 1),
(468, NULL, NULL, 'hot 20 i', NULL, 'other', 1, NULL, 0, 'dollar', 111, 120, NULL, 1, 1),
(469, NULL, NULL, 'tecno spark8c', NULL, 'other', 1, NULL, 0, 'dollar', 114, 125, NULL, 1, 1),
(470, NULL, NULL, 'tecno 8 pro', NULL, 'other', 1, NULL, 0, 'dollar', 127, 140, NULL, 1, 1),
(471, NULL, NULL, 'tecno spark 9t', NULL, 'other', 1, NULL, 0, 'dollar', 123, 135, NULL, 1, 1),
(472, '1245', NULL, 'hdtv network', NULL, 'other', 1, NULL, 0, 'dollar', 5, 10, NULL, 1, 1),
(473, '6935364080730', NULL, 'tplink 3 ac750', NULL, 'other', 1, NULL, 0, 'dollar', 20, 27, NULL, 1, 1),
(474, '6935364070199', NULL, 'tplink  extender', NULL, 'other', 1, NULL, 0, 'dollar', 20, 25, NULL, 1, 1),
(475, '21508', NULL, 'watch 8', NULL, 'other', 1, NULL, 0, 'dollar', 16, 25, NULL, 1, 1),
(476, '21509', NULL, 'n8 ultra', NULL, 'other', 1, NULL, 0, 'dollar', 25, 30, NULL, 1, 1),
(477, '357211247946587', NULL, 'galaxy a13', NULL, 'other', 1, NULL, 0, 'dollar', 136, 150, NULL, 1, 1),
(478, '352408543448509', NULL, 'tecno spark9t', NULL, 'other', 1, NULL, 0, 'dollar', 123, 140, NULL, 1, 1),
(479, '21', NULL, 'earphone n', NULL, 'other', 1, NULL, 0, 'dollar', 7, 15, NULL, 1, 1),
(480, '350403222947667', NULL, 'a04e', NULL, 'other', 1, NULL, 0, 'dollar', 89, 100, NULL, 1, 1),
(481, '358799694771945', NULL, 'samsung a04s', NULL, 'other', 1, NULL, 0, 'dollar', 124, 135, NULL, 1, 1),
(482, '350403222209209', NULL, 'samsung a04e', NULL, 'other', 1, NULL, 0, 'dollar', 88, 100, NULL, 1, 1),
(483, '354578363225001', NULL, 'pop 6 pro', NULL, 'other', 1, NULL, 0, 'dollar', 83, 95, NULL, 1, 1),
(484, '352969650325020', NULL, 'hot 20s', NULL, 'other', 1, NULL, 0, 'dollar', 164, 175, NULL, 1, 1),
(485, '6949856100073', NULL, 'headset bk 07', NULL, 'other', 1, NULL, 0, 'dollar', 7, 9, NULL, 1, 1),
(486, '6998568414121', NULL, 'headset sh 12', NULL, 'other', 1, NULL, 0, 'dollar', 7, 9, NULL, 1, 1),
(487, '2', NULL, 'usb c lightning', NULL, 'other', 1, NULL, 0, 'dollar', 3, 5, NULL, 1, 1),
(488, '6652', NULL, 'in pods 12', NULL, 'other', 1, NULL, 0, 'dollar', 4, 8, NULL, 1, 1),
(489, '5498', NULL, 'glass watch', NULL, 'other', 1, NULL, 0, 'dollar', 2, 4, NULL, 1, 1),
(490, '4', NULL, 'smart tv box', NULL, 'other', 1, NULL, 0, 'dollar', 25, 30, NULL, 1, 1),
(491, '6934747800491', NULL, 'e strong tc', NULL, 'other', 1, NULL, 0, 'dollar', 3, 5, NULL, 1, 1),
(492, '6973224870329', NULL, 'charger denmentc type c', NULL, 'other', 1, NULL, 0, 'dollar', 1.2, 1.75, NULL, 1, 1),
(493, '7263', NULL, 'wasli ios bavin', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 3, NULL, 1, 1),
(494, '6972424710046', NULL, 'tc bavin data', NULL, 'other', 1, NULL, 0, 'dollar', 0.95, 2, NULL, 1, 1),
(495, '8859289623378', NULL, 'dpower tc', NULL, 'other', 1, NULL, 0, 'dollar', 1, 1.5, NULL, 1, 1),
(496, '6935364095635', NULL, 'tplink 3 onten', NULL, 'other', 1, NULL, 0, 'dollar', 15, 20, NULL, 1, 1),
(497, '6940252355876', NULL, 'mousse s9000', NULL, 'other', 1, NULL, 0, 'dollar', 4, 7, NULL, 1, 1),
(498, '6474', NULL, 'mouse sony ms 331', NULL, 'other', 1, NULL, 0, 'dollar', 2.75, 5, NULL, 1, 1),
(499, '740617309720', NULL, 'usb 32', NULL, 'other', 1, NULL, 0, 'dollar', 3.85, 8, NULL, 1, 1),
(500, '7256', NULL, 'car charger', NULL, 'other', 1, NULL, 0, 'dollar', 3, 4, NULL, 1, 1),
(501, '4895180764066', NULL, 'tecno pop4 32GB', NULL, 'other', 1, NULL, 0, 'dollar', 76, 85, NULL, 1, 1),
(502, '6972667891731', NULL, 'headset BT24', NULL, 'other', 1, NULL, 0, 'dollar', 8, 10, NULL, 1, 1),
(503, '1234', NULL, 'sharg typ c strong', NULL, 'other', 1, NULL, 0, 'dollar', 3, 5, NULL, 1, 1),
(504, '6149', NULL, 'mount holder car', NULL, 'other', 1, NULL, 0, 'dollar', 0.75, 1.5, NULL, 1, 1),
(505, '711719918165', NULL, 'mskit ps4 copy', NULL, 'other', 1, NULL, 0, 'dollar', 14, 20, NULL, 1, 1),
(506, '190198764720', NULL, 'air pods', NULL, 'other', 1, NULL, 0, 'dollar', 12, 30, NULL, 1, 1),
(507, '190198886699', NULL, '20w power adpter', NULL, 'other', 1, NULL, 0, 'dollar', 8, 15, NULL, 1, 1),
(508, '6012329012040', NULL, 'power 10ma plo-kp 13', NULL, 'other', 1, NULL, 0, 'dollar', 12, 17, NULL, 1, 1),
(509, '740617309829', NULL, 'usb 64 gb', NULL, 'other', 1, NULL, 0, 'dollar', 5, 10, NULL, 1, 1),
(510, '5315', NULL, 'spiker kts-1085', NULL, 'other', 1, NULL, 0, 'dollar', 7, 12, NULL, 1, 1),
(511, '20', NULL, 'hedphon B39', NULL, 'other', 1, NULL, 0, 'dollar', 8, 10, NULL, 1, 1),
(512, '21', NULL, 'dancing cactus', NULL, 'other', 1, NULL, 0, 'dollar', 10, 13, NULL, 1, 1),
(513, '9000010570', NULL, 'HDMI to VGA', NULL, 'other', 1, NULL, 0, 'dollar', 5, 8, NULL, 1, 1),
(514, '1222', NULL, 'usb c adapter', NULL, 'other', 1, NULL, 0, 'dollar', 8, 20, NULL, 1, 1),
(515, '711719257936', NULL, 'ps3 maski', NULL, 'other', 1, NULL, 0, 'dollar', 6, 10, NULL, 1, 1),
(516, '6902130656055', NULL, 'h05', NULL, 'other', 1, NULL, 0, 'dollar', 0.75, 1.5, NULL, 1, 1),
(517, '201801090133', NULL, 'cable 2mter typ-c', NULL, 'other', 1, NULL, 0, 'dollar', 1.75, 3.5, NULL, 1, 1),
(518, '201801090126', NULL, 'cable 2mter ios', NULL, 'other', 1, NULL, 0, 'dollar', 1.75, 3.5, NULL, 1, 1),
(519, '6972598760151', NULL, 'mouse gaming', NULL, 'other', 1, NULL, 0, 'dollar', 6, 10, NULL, 1, 1),
(520, 'FSP3-1202109170609', NULL, 'FSP3', NULL, 'other', 1, NULL, 0, 'dollar', 15, 20, NULL, 1, 1),
(521, '6700', NULL, 'kabsat pubg', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1);
INSERT INTO `stock` (`item_ID`, `barcode`, `item_name`, `item_description`, `image_url`, `item_type`, `category_ID_FK`, `item_sub_category`, `qty`, `currency`, `item_cost`, `item_price`, `item_notes`, `show_on_sell`, `item_status`) VALUES
(522, '6842863133082', NULL, 'tws 4', NULL, 'other', 1, NULL, 0, 'dollar', 9, 15, NULL, 1, 1),
(523, '8806090973369', NULL, 'adapter 45w', NULL, 'other', 1, NULL, 0, 'dollar', 8, 20, NULL, 1, 1),
(524, '194252156926', NULL, 'adapter 25w', NULL, 'other', 1, NULL, 0, 'dollar', 8, 20, NULL, 1, 1),
(525, '6972011065177', NULL, 'eau de parfum', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(526, 'SA/4866', NULL, 'clown game', NULL, 'other', 1, NULL, 0, 'dollar', 7.25, 10, NULL, 1, 1),
(527, '501', NULL, 'adapter type c 3a', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 5, NULL, 1, 1),
(528, '502', NULL, 'adapter 3.0', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 3, NULL, 1, 1),
(529, '701', NULL, 'cable 25m', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 3.5, NULL, 1, 1),
(530, '740617298680', NULL, 'sd card 32gb', NULL, 'other', 1, NULL, 0, 'dollar', 3.75, 7, NULL, 1, 1),
(531, '2230', NULL, 'apple watch copy a', NULL, 'other', 1, NULL, 0, 'dollar', 22, 30, NULL, 1, 1),
(532, '6805', NULL, 'cover magnetic', NULL, 'other', 1, NULL, 0, 'dollar', 3.5, 7, NULL, 1, 1),
(533, '6517', NULL, 'TYPE C TO IOS', NULL, 'other', 1, NULL, 0, 'dollar', 2, 5, NULL, 1, 1),
(534, NULL, NULL, 'cover silicon a02s', NULL, 'other', 1, NULL, 0, 'dollar', 1.15, 3, NULL, 1, 1),
(535, '6932540140158', NULL, 'earphone oraimo t 03', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(536, '6973224872699', NULL, 'denmen audio', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2.5, NULL, 1, 1),
(537, '6973224872736', NULL, 'denme', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(538, '6043224872637', NULL, 'denmen otj', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 2, NULL, 1, 1),
(539, '6209', NULL, 'car bluetooth', NULL, 'other', 1, NULL, 0, 'dollar', 2, 4, NULL, 1, 1),
(540, '6973224872750', NULL, 'denmen otj.', NULL, 'other', 1, NULL, 0, 'dollar', 1.8, 2, NULL, 1, 1),
(541, '6973224871586', NULL, 'cabel 3in 1', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 4, NULL, 1, 1),
(542, '6464', NULL, 'mouse sony hp', NULL, 'other', 1, NULL, 0, 'lira', 2, 5, NULL, 1, 1),
(543, '357765126740734', NULL, 'kjtel phone', NULL, 'other', 1, NULL, 0, 'dollar', 12, 20, NULL, 1, 1),
(544, '4766', NULL, 'xtreme speaker', NULL, 'other', 1, NULL, 0, 'dollar', 8, 13, NULL, 1, 1),
(545, 'S/N:21111706301', NULL, 'wifi ups v link1', NULL, 'other', 1, NULL, 0, 'dollar', 15, 20, NULL, 1, 1),
(546, '123', NULL, 'usb cable iph', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 6, NULL, 1, 1),
(547, '6970114721846', NULL, 'a1s headphone', NULL, 'other', 1, NULL, 0, 'dollar', 6, 10, NULL, 1, 1),
(548, '6858', NULL, 'watch hw22', NULL, 'other', 1, NULL, 0, 'dollar', 15, 25, NULL, 1, 1),
(549, '6227', NULL, 'audio&charge adapter', NULL, 'other', 1, NULL, 0, 'dollar', 2.25, 6, NULL, 1, 1),
(550, '6972424718622', NULL, 'bavin power bank 100000', NULL, 'other', 1, NULL, 0, 'dollar', 10, 13, NULL, 1, 1),
(551, '6956186409110', NULL, 'ring light 33', NULL, 'other', 1, NULL, 0, 'dollar', 9, 14, NULL, 1, 1),
(552, '3031', NULL, 'usb-c', NULL, 'other', 1, NULL, 0, 'dollar', 6, 20, NULL, 1, 1),
(553, '3141', NULL, 'usp car charg', NULL, 'other', 1, NULL, 0, 'dollar', 3.5, 8, NULL, 1, 1),
(554, '3348901368247', NULL, 'PERFUME SAUVAFE', NULL, 'other', 1, NULL, 0, 'dollar', 4, 6, NULL, 1, 1),
(555, '1000049814400090', NULL, 'repiter nets', NULL, 'other', 1, NULL, 0, 'dollar', 11, 17, NULL, 1, 1),
(556, '21507', NULL, 'watch s8 ultra', NULL, 'other', 1, NULL, 0, 'dollar', 24, 45, NULL, 1, 1),
(557, '5662', NULL, 'earphone i 12', NULL, 'other', 1, NULL, 0, 'dollar', 5, 7.5, NULL, 1, 1),
(558, '5512', NULL, 'vip asans', NULL, 'other', 1, NULL, 0, 'dollar', 1.75, 4, NULL, 1, 1),
(559, '6933185702565', NULL, 'charger ios wopow', NULL, 'other', 1, NULL, 0, 'dollar', 2, 3, NULL, 1, 1),
(560, '4877', NULL, 'remax', NULL, 'other', 1, NULL, 0, 'dollar', 0.5, 1, NULL, 1, 1),
(561, '5714', NULL, 'otg', NULL, 'other', 1, NULL, 0, 'dollar', 0.65, 1.5, NULL, 1, 1),
(562, '6993124567396', NULL, 'ios aux', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 5, NULL, 1, 1),
(563, NULL, NULL, 'resiver c.v', NULL, 'other', 1, NULL, 0, 'lira', 750000, 820000, NULL, 1, 1),
(564, '11', NULL, 'apbter org fast', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2.5, NULL, 1, 1),
(565, '6701', NULL, 'control pubg #', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(566, '190199246850', NULL, 'air pods pro', NULL, 'other', 1, NULL, 0, 'dollar', 12, 25, NULL, 1, 1),
(567, '6973224871623', NULL, 'charger denmen dc05t', NULL, 'other', 1, NULL, 0, 'dollar', 1.4, 2, NULL, 1, 1),
(568, '6706', NULL, 'car mirror', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(569, '8681830006787', NULL, 'power bank lkp08 20ma', NULL, 'other', 1, NULL, 0, 'dollar', 15, 20, NULL, 1, 1),
(570, '6973224870305', NULL, 'charge dc01v', NULL, 'other', 1, NULL, 0, 'dollar', 1, 1.5, NULL, 1, 1),
(571, '1246', NULL, 'type-c aux', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 6, NULL, 1, 1),
(572, '6973224870596', NULL, 'dr02', NULL, 'other', 1, NULL, 0, 'dollar', 0.75, 1.75, NULL, 1, 1),
(573, '6601', NULL, 'tripod', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 2.5, NULL, 1, 1),
(574, '1133', NULL, 'deaderon', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 3.5, NULL, 1, 1),
(575, '6951066952113', NULL, 'netis', NULL, 'other', 1, NULL, 0, 'dollar', 11.5, 17, NULL, 1, 1),
(576, '6951066951611', NULL, 'netis dsl', NULL, 'other', 1, NULL, 0, 'dollar', 13, 20, NULL, 1, 1),
(577, '6622', NULL, 'glass camera', NULL, 'other', 1, NULL, 0, 'dollar', 1, 3, NULL, 1, 1),
(578, '52586', NULL, 'samsumg 25w', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 5, NULL, 1, 1),
(579, '11751', NULL, 'realme type c', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(580, '404', NULL, 'original', NULL, 'other', 1, NULL, 0, 'dollar', 3.5, 6, NULL, 1, 1),
(581, '6970462516446', NULL, 'micro cable 2.1', NULL, 'other', 1, NULL, 0, 'dollar', 1.25, 2.5, NULL, 1, 1),
(582, '6587', NULL, 'ring lights 33cm', NULL, 'other', 1, NULL, 0, 'dollar', 9, 14, NULL, 1, 1),
(583, '5397063116225', NULL, 'mouse +', NULL, 'other', 1, NULL, 0, 'dollar', 2, 4, NULL, 1, 1),
(584, '194252818404', NULL, 'airpods 3', NULL, 'other', 1, NULL, 0, 'dollar', 15, 25, NULL, 1, 1),
(585, '8003510001217', NULL, 'maliza +', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 3.5, NULL, 1, 1),
(586, '6973224871029', NULL, '3in1', NULL, 'other', 1, NULL, 0, 'dollar', 4, 6, NULL, 1, 1),
(587, 'S/N:21111710346', NULL, 'wifi ups v link', NULL, 'other', 1, NULL, 0, 'dollar', 15, 20, NULL, 1, 1),
(588, '8436468576603', NULL, 'car charger 2in1', NULL, 'other', 1, NULL, 0, 'dollar', 0.9, 2, NULL, 1, 1),
(589, '5005', NULL, 'cover camera', NULL, 'other', 1, NULL, 0, 'dollar', 1, 3, NULL, 1, 1),
(590, 'a03s', NULL, 'cover a03s', NULL, 'other', 1, NULL, 0, 'dollar', 1, 3, NULL, 1, 1),
(591, 'coverip', NULL, 'cover iph x xs', NULL, 'other', 1, NULL, 0, 'dollar', 1.25, 3, NULL, 1, 1),
(592, '6225', NULL, '6225', NULL, 'other', 1, NULL, 0, 'dollar', 1.4, 4, NULL, 1, 1),
(593, '6988632587608', NULL, 'jbl headset', NULL, 'other', 1, NULL, 0, 'dollar', 7, 10, NULL, 1, 1),
(594, '4752224004659', NULL, 'sxt sq', NULL, 'other', 1, NULL, 0, 'dollar', 38, 55, NULL, 1, 1),
(595, '12005221110533', NULL, 'lb link ups', NULL, 'other', 1, NULL, 0, 'dollar', 13, 17, NULL, 1, 1),
(596, '740617274707', NULL, 'memory 32', NULL, 'other', 1, NULL, 0, 'dollar', 4.5, 7, NULL, 1, 1),
(597, '201801032584', NULL, 'fast charger bavin', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(598, NULL, NULL, 'wifi resivers', NULL, 'other', 1, NULL, 0, 'dollar', 2, 4, NULL, 1, 1),
(599, '1235', NULL, 'data cable sam', NULL, 'other', 1, NULL, 0, 'dollar', 3, 4, NULL, 1, 1),
(600, '6481', NULL, 'kfof pubge nylon', NULL, 'other', 1, NULL, 0, 'dollar', 0.3, 1, NULL, 1, 1),
(601, '1156', NULL, 'bavin head set', NULL, 'other', 1, NULL, 0, 'dollar', 2, 4, NULL, 1, 1),
(602, '6440', NULL, 'control pubg', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(603, '6012352693605', NULL, 'car mp3 allison', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 5, NULL, 1, 1),
(604, '8182', NULL, 'adpter 9v', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 3.5, NULL, 1, 1),
(605, '667548099141', NULL, 'victroria copy aa', NULL, 'other', 1, NULL, 0, 'dollar', 4, 8, NULL, 1, 1),
(606, '702', NULL, 'cable 50m', NULL, 'other', 1, NULL, 0, 'dollar', 3.5, 6, NULL, 1, 1),
(607, '6422', NULL, 'flexible tripod', NULL, 'other', 1, NULL, 0, 'dollar', 3.5, 6, NULL, 1, 1),
(608, '5002', NULL, 'tv box 4ram 32gb', NULL, 'other', 1, NULL, 0, 'dollar', 23, 35, NULL, 1, 1),
(609, '6865214254526', NULL, 'wasle type c to type c', NULL, 'other', 1, NULL, 0, 'dollar', 2, 5, NULL, 1, 1),
(610, NULL, NULL, 'hdmi s8ir', NULL, 'other', 1, NULL, 0, 'lira', 10000, 20000, NULL, 1, 1),
(611, '6972424717892', NULL, 'bavin earphone 3', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 5, NULL, 1, 1),
(612, '26676/A0Z447777', NULL, 'mi fi range extender', NULL, 'other', 1, NULL, 0, 'dollar', 11, 17, NULL, 1, 1),
(613, 'S/N:21111713299', NULL, 'v link ups', NULL, 'other', 1, NULL, 0, 'dollar', 15, 20, NULL, 1, 1),
(614, NULL, NULL, 'احرف كيبورد', NULL, 'other', 1, NULL, 0, 'lira', 40000, 50000, NULL, 1, 1),
(615, '3033', NULL, 'cabil tc ip', NULL, 'other', 1, NULL, 0, 'dollar', 3, 7, NULL, 1, 1),
(616, '2023', NULL, 'air pods i12', NULL, 'other', 1, NULL, 0, 'dollar', 3.5, 7, NULL, 1, 1),
(617, '1086', NULL, 'فيش امركاني', NULL, 'other', 1, NULL, 0, 'dollar', 0.25, 1, NULL, 1, 1),
(618, '124', NULL, 'lighting to usb 1m', NULL, 'other', 1, NULL, 0, 'dollar', 2, 4, NULL, 1, 1),
(619, '2116', NULL, 'usp c c', NULL, 'other', 1, NULL, 0, 'dollar', 8, 20, NULL, 1, 1),
(620, '5', NULL, 'aux remax', NULL, 'other', 1, NULL, 0, 'dollar', 1, 3, NULL, 1, 1),
(621, '922351548724', NULL, 'vlink 3 onten', NULL, 'other', 1, NULL, 0, 'dollar', 11, 16, NULL, 1, 1),
(622, '6935364070533', NULL, 'tplink wifi 2 antin', NULL, 'other', 1, NULL, 0, 'dollar', 13, 18, NULL, 1, 1),
(623, '12', NULL, 'cable foxcon ios', NULL, 'other', 1, NULL, 0, 'dollar', 0.6, 1.5, NULL, 1, 1),
(624, '6970962188655', NULL, 'sama3a ep-19', NULL, 'other', 1, NULL, 0, 'dollar', 3.5, 6, NULL, 1, 1),
(625, '6971696236568', NULL, 'aux iphon', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 4, NULL, 1, 1),
(626, '6822824322328', NULL, 'relme sharge', NULL, 'other', 1, NULL, 0, 'dollar', 1.75, 3.5, NULL, 1, 1),
(627, '7', NULL, 'cover tab a7lite', NULL, 'other', 1, NULL, 0, 'dollar', 2, 3, NULL, 1, 1),
(628, '109', NULL, 'watch glass 44mm', NULL, 'other', 1, NULL, 0, 'dollar', 1, 3, NULL, 1, 1),
(629, '2020060800161', NULL, 'switch 8 port vlink', NULL, 'other', 1, NULL, 0, 'dollar', 6, 12, NULL, 1, 1),
(630, '201703032132', NULL, 'bavin 3.0 ios', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(631, '8181', NULL, 'adpter 24v', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 6, NULL, 1, 1),
(632, '5555', NULL, 'wow+ reciver', NULL, 'other', 1, NULL, 0, 'dollar', 10, 15, NULL, 1, 1),
(633, '5114', NULL, 'cover airpods 3', NULL, 'other', 1, NULL, 0, 'dollar', 2, 4, NULL, 1, 1),
(634, '313', NULL, 'iphone cover', NULL, 'other', 1, NULL, 0, 'dollar', 1.25, 2.5, NULL, 1, 1),
(635, '6970462516422', NULL, 'type c cable 2.1', NULL, 'other', 1, NULL, 0, 'dollar', 1.25, 2.5, NULL, 1, 1),
(636, '6970462516439', NULL, 'lighting cable 2.1', NULL, 'other', 1, NULL, 0, 'dollar', 1.25, 2.5, NULL, 1, 1),
(637, NULL, NULL, 'remot sar 3ade', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(638, '6934917005992', NULL, 'cover watch 44mm', NULL, 'other', 1, NULL, 0, 'dollar', 1, 3, NULL, 1, 1),
(639, '1314', NULL, 'ring light s8ir', NULL, 'other', 1, NULL, 0, 'dollar', 3, 5, NULL, 1, 1),
(640, '6972424717960', NULL, 'bavin super charger', NULL, 'other', 1, NULL, 0, 'dollar', 3, 7, NULL, 1, 1),
(641, '2025', NULL, 'cover ip14 magnetic', NULL, 'other', 1, NULL, 0, 'dollar', 2.75, 6, NULL, 1, 1),
(642, '12006722332280', NULL, 'power pank wifi pro link', NULL, 'other', 1, NULL, 0, 'dollar', 15, 20, NULL, 1, 1),
(643, '6972424717922', NULL, 'bavin aux', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(644, '201801090294', NULL, 'charger ios bavin', NULL, 'other', 1, NULL, 0, 'dollar', 3, 7, NULL, 1, 1),
(645, '6973224870893', NULL, 'wasli ios', NULL, 'other', 1, NULL, 0, 'dollar', 0.35, 1, NULL, 1, 1),
(646, '6972424712439', NULL, 'ios bavin', NULL, 'other', 1, NULL, 0, 'dollar', 1.65, 3, NULL, 1, 1),
(647, '6972424712446', NULL, 'tc bavin', NULL, 'other', 1, NULL, 0, 'dollar', 1.65, 3, NULL, 1, 1),
(648, '6933185703036', NULL, 'wopow type c', NULL, 'other', 1, NULL, 0, 'dollar', 0.75, 1.5, NULL, 1, 1),
(649, '6480', NULL, 'kfof pubg', NULL, 'other', 1, NULL, 0, 'dollar', 0.3, 1.5, NULL, 1, 1),
(650, '6973558960703', NULL, 'sama3a sr16', NULL, 'other', 1, NULL, 0, 'dollar', 0.8, 1.5, NULL, 1, 1),
(651, '101', NULL, 'aux remax 3.5', NULL, 'other', 1, NULL, 0, 'dollar', 0.75, 1.5, NULL, 1, 1),
(652, '190198802989', NULL, 'silicon ip13', NULL, 'other', 1, NULL, 0, 'dollar', 2.75, 5, NULL, 1, 1),
(653, '6973224870589', NULL, 'dr01', NULL, 'other', 1, NULL, 0, 'dollar', 0.55, 1.5, NULL, 1, 1),
(654, '194252157022', NULL, 'usb-c', NULL, 'other', 1, NULL, 0, 'dollar', 4.5, 15, NULL, 1, 1),
(655, 'FSP3-1202110140103', NULL, 'fsp3-1', NULL, 'other', 1, NULL, 0, 'dollar', 15, 20, NULL, 1, 1),
(656, 'ٍظآ:21111201292', NULL, 'ups wifi gold vision', NULL, 'other', 1, NULL, 0, 'dollar', 15, 20, NULL, 1, 1),
(657, '6935364051242', NULL, 'tp link 2 inten', NULL, 'other', 1, NULL, 0, 'dollar', 13, 18, NULL, 1, 1),
(658, '6113', NULL, 'cover airpods pro', NULL, 'other', 1, NULL, 0, 'dollar', 1.65, 3, NULL, 1, 1),
(659, '1996', NULL, 'js dc ups', NULL, 'other', 1, NULL, 0, 'dollar', 25, 30, NULL, 1, 1),
(660, '105', NULL, 'lens shield ip 12', NULL, 'other', 1, NULL, 0, 'dollar', 0.75, 3, NULL, 1, 1),
(661, '1205', NULL, 'ring light 33cm', NULL, 'other', 1, NULL, 0, 'dollar', 8, 13, NULL, 1, 1),
(662, '20057638012016600', NULL, 'vlink 3 onten 2', NULL, 'other', 1, NULL, 0, 'dollar', 11, 16, NULL, 1, 1),
(663, '8183', NULL, 'adpter 12v', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 3.5, NULL, 1, 1),
(664, '885909627417', NULL, 'cable type c', NULL, 'other', 1, NULL, 0, 'dollar', 1.4, 3, NULL, 1, 1),
(665, 'S/N:21111210396', NULL, 'ups router', NULL, 'other', 1, NULL, 0, 'dollar', 14.5, 15, NULL, 1, 1),
(666, '12006722332278', NULL, 'wifi ups pro link', NULL, 'other', 1, NULL, 0, 'dollar', 15, 20, NULL, 1, 1),
(667, '856500011356', NULL, 'WATCH STRAP', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(668, '6114', NULL, 'cover airpods', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 3, NULL, 1, 1),
(669, '6204', NULL, 'mousse wifi', NULL, 'other', 1, NULL, 0, 'dollar', 3, 6, NULL, 1, 1),
(670, '102', NULL, 'bavin travel charg 3.0', NULL, 'other', 1, NULL, 0, 'dollar', 4, 7, NULL, 1, 1),
(671, NULL, NULL, 'vga', NULL, 'other', 1, NULL, 0, 'dollar', 2, 3.5, NULL, 1, 1),
(672, '6971437910504', NULL, 'iphone protection', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 5, NULL, 1, 1),
(673, '6971741736869', NULL, 'wasli micro', NULL, 'other', 1, NULL, 0, 'dollar', 0.35, 1, NULL, 1, 1),
(674, '6972424712422', NULL, 'micro bavin', NULL, 'other', 1, NULL, 0, 'dollar', 1.65, 3, NULL, 1, 1),
(675, '6933185700424', NULL, 'micro + ios wopow', NULL, 'other', 1, NULL, 0, 'dollar', 0.75, 1.5, NULL, 1, 1),
(676, '85387304989', NULL, 'aux griffin', NULL, 'other', 1, NULL, 0, 'dollar', 0.75, 1.5, NULL, 1, 1),
(677, NULL, NULL, 'power banck bavin', NULL, 'other', 1, NULL, 0, 'dollar', 8, 11, NULL, 1, 1),
(678, '6973224871166', NULL, 'power bank DP05', NULL, 'other', 1, NULL, 0, 'dollar', 6.5, 11, NULL, 1, 1),
(679, '6971410556583', NULL, 'cabel sam metal', NULL, 'other', 1, NULL, 0, 'dollar', 1.25, 2.25, NULL, 1, 1),
(680, '3120342ْ]ُ01394', NULL, 'resiver sr5090', NULL, 'other', 1, NULL, 0, 'dollar', 9, 14, NULL, 1, 1),
(681, '6973224870657', NULL, 'dr06', NULL, 'other', 1, NULL, 0, 'dollar', 0.75, 1.75, NULL, 1, 1),
(682, '1131', NULL, 'perfum 15 ml', NULL, 'other', 1, NULL, 0, 'lira', 30000, 40000, NULL, 1, 1),
(683, NULL, NULL, 'adapter car', NULL, 'other', 1, NULL, 0, 'lira', 15000, 20000, NULL, 1, 1),
(684, NULL, NULL, 'enten usb', NULL, 'other', 1, NULL, 0, 'dollar', 5, 7, NULL, 1, 1),
(685, '7310', NULL, 'back shfaf', NULL, 'other', 1, NULL, 0, 'dollar', 0.75, 2, NULL, 1, 1),
(686, NULL, NULL, 'hdmi 1.5m', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 3, NULL, 1, 1),
(687, '203020061802053', NULL, 'start sat sr2030hd', NULL, 'other', 1, NULL, 0, 'dollar', 8, 12, NULL, 1, 1),
(688, '203020061802049', NULL, 'resiver sr2030', NULL, 'other', 1, NULL, 0, 'dollar', 8, 12, NULL, 1, 1),
(689, '6973224870015', NULL, 'cabel d01l ios', NULL, 'other', 1, NULL, 0, 'dollar', 0.4, 1.2, NULL, 1, 1),
(690, '1001', NULL, 'charge high quality', NULL, 'other', 1, NULL, 0, 'dollar', 2.75, 3.5, NULL, 1, 1),
(691, '2011', NULL, 'usp c 1m', NULL, 'other', 1, NULL, 0, 'dollar', 3, 7, NULL, 1, 1),
(692, '6935358020117', NULL, 'headset h1', NULL, 'other', 1, NULL, 0, 'dollar', 9.5, 14, NULL, 1, 1),
(693, NULL, NULL, 'ps4 wslir charg', NULL, 'other', 1, NULL, 0, 'dollar', 2, 3, NULL, 1, 1),
(694, '6973224870909', NULL, 'cable ?ios', NULL, 'other', 1, NULL, 0, 'dollar', 0.35, 1.1, NULL, 1, 1),
(695, '6951066952038', NULL, 'netis 3', NULL, 'other', 1, NULL, 0, 'dollar', 13, 20, NULL, 1, 1),
(696, '1313', NULL, 'camera iph 13', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 4, NULL, 1, 1),
(697, '3', NULL, 'bands', NULL, 'other', 1, NULL, 0, 'dollar', 2, 5, NULL, 1, 1),
(698, '6432', NULL, 'car g7', NULL, 'other', 1, NULL, 0, 'dollar', 2, 6, NULL, 1, 1),
(699, '2440', NULL, 'ups wifi gold vision', NULL, 'other', 1, NULL, 0, 'dollar', 19, 25, NULL, 1, 1),
(700, '4651321544672', NULL, 'car charger veorsier', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 5, NULL, 1, 1),
(701, '6971741731420', NULL, 'cabl sam micro', NULL, 'other', 1, NULL, 0, 'dollar', 0.35, 1, NULL, 1, 1),
(702, '13', NULL, 'cover iph 13', NULL, 'other', 1, NULL, 0, 'dollar', 1.25, 2, NULL, 1, 1),
(703, '6750', NULL, 'shfaff smik', NULL, 'other', 1, NULL, 0, 'dollar', 0.55, 2, NULL, 1, 1),
(704, '201603030023', NULL, 'car charger mico', NULL, 'other', 1, NULL, 0, 'dollar', 3, 5, NULL, 1, 1),
(705, '1155', NULL, 'perfume', NULL, 'other', 1, NULL, 0, 'lira', 15000, 20000, NULL, 1, 1),
(706, NULL, NULL, 'cover seliconip 14', NULL, 'other', 1, NULL, 0, 'dollar', 1.75, 5, NULL, 1, 1),
(707, '6111', NULL, 'holder 1', NULL, 'other', 1, NULL, 0, 'dollar', 0.35, 0.7, NULL, 1, 1),
(708, '7101', NULL, 'dizq box', NULL, 'other', 1, NULL, 0, 'dollar', 2.5, 5, NULL, 1, 1),
(709, '1132', NULL, 'perfum MZ', NULL, 'other', 1, NULL, 0, 'lira', 30000, 50000, NULL, 1, 1),
(710, NULL, NULL, 'poe cable', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2.5, NULL, 1, 1),
(711, '1121', NULL, 'cable typ-c fast', NULL, 'other', 1, NULL, 0, 'dollar', 0.5, 1.5, NULL, 1, 1),
(712, '7102', NULL, 'dizq', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(713, '321', NULL, 'sama3a rftj8', NULL, 'other', 1, NULL, 0, 'dollar', 1, 1.5, NULL, 1, 1),
(714, '4021347XUF02350', NULL, 'starset reciver 2', NULL, 'other', 1, NULL, 0, 'dollar', 9, 14, NULL, 1, 1),
(715, NULL, NULL, 'cabel tv 1bi 3 kbir', NULL, 'other', 1, NULL, 0, 'lira', 30000, 50000, NULL, 1, 1),
(716, '6972424717809', NULL, 'cabel bavin micro', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2.5, NULL, 1, 1),
(717, NULL, NULL, 'batri iphone 8 plus', NULL, 'other', 1, NULL, 0, 'dollar', 10, 14, NULL, 1, 1),
(718, NULL, NULL, 'cabel tv 1 bi 3 s8ir', NULL, 'other', 1, NULL, 0, 'lira', 20000, 30000, NULL, 1, 1),
(719, '6972424717816', NULL, 'bavin ios', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2.5, NULL, 1, 1),
(720, '6972424717823', NULL, 'bavin typc', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2.5, NULL, 1, 1),
(721, '6980727401202', NULL, 'remax micro', NULL, 'other', 1, NULL, 0, 'dollar', 1, 1.75, NULL, 1, 1),
(722, '6973224870053', NULL, 'type c cable', NULL, 'other', 1, NULL, 0, 'dollar', 0.45, 1.2, NULL, 1, 1),
(723, '6980727401219', NULL, 'remax type c', NULL, 'other', 1, NULL, 0, 'dollar', 1, 1.75, NULL, 1, 1),
(724, '6980727401226', NULL, 'remax ios', NULL, 'other', 1, NULL, 0, 'dollar', 1, 1.75, NULL, 1, 1),
(725, '1414', NULL, 'glass single cam', NULL, 'other', 1, NULL, 0, 'dollar', 1, 3, NULL, 1, 1),
(726, '6973224870923', NULL, 'cable d06v micro', NULL, 'other', 1, NULL, 0, 'dollar', 0.35, 1.1, NULL, 1, 1),
(727, '6973224870282', NULL, 'charger denmen ios', NULL, 'other', 1, NULL, 0, 'dollar', 1.1, 1.75, NULL, 1, 1),
(728, '8436539106838', NULL, 'cable sam dp-s08', NULL, 'other', 1, NULL, 0, 'dollar', 0.3, 1.1, NULL, 1, 1),
(729, '10', NULL, 'protector uv', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 2.5, NULL, 1, 1),
(730, NULL, NULL, 'lnb 1 port smart', NULL, 'other', 1, NULL, 0, 'dollar', 2, 4, NULL, 1, 1),
(731, '6973224873825', NULL, 'charge samsunge', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2.5, NULL, 1, 1),
(732, '6973224873832', NULL, 'CHARG denmen', NULL, 'other', 1, NULL, 0, 'dollar', 0.9, 2, NULL, 1, 1),
(733, '1114', NULL, 'cover iphone selicon', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 3, NULL, 1, 1),
(734, '312', NULL, 'itell start', NULL, 'other', 1, NULL, 0, 'lira', 15544, 17000, NULL, 1, 1),
(735, '116', NULL, 'mtc 3.7$', NULL, 'other', 1, NULL, 0, 'lira', 110000, 190000, NULL, 1, 1),
(736, '213', NULL, 'alfa 4.5$', NULL, 'other', 1, NULL, 0, 'lira', 90000, 220000, NULL, 1, 1),
(737, '1166', NULL, 'mask', NULL, 'other', 1, NULL, 0, 'lira', 500, 1000, NULL, 1, 1),
(738, '6973224870251', NULL, 'charger deman micro', NULL, 'other', 1, NULL, 0, 'dollar', 1, 1.75, NULL, 1, 1),
(739, '6973224870930', NULL, 'wasli deman tc', NULL, 'other', 1, NULL, 0, 'dollar', 0.35, 1, NULL, 1, 1),
(740, '6933138603017', NULL, 'car cherger ios', NULL, 'other', 1, NULL, 0, 'dollar', 2, 3, NULL, 1, 1),
(741, '6970280945220', NULL, 'car cheger micro', NULL, 'other', 1, NULL, 0, 'dollar', 2, 3, NULL, 1, 1),
(742, '6987545152231', NULL, 'usb adapter', NULL, 'other', 1, NULL, 0, 'dollar', 2, 4, NULL, 1, 1),
(743, '6982708231099', NULL, 'aux iphone', NULL, 'other', 1, NULL, 0, 'dollar', 3, 5, NULL, 1, 1),
(744, '6937372285671', NULL, 'perfume 212 vip', NULL, 'other', 1, NULL, 0, 'lira', 60000, 100000, NULL, 1, 1),
(745, '6937372285992', NULL, 'perfume armani code', NULL, 'other', 1, NULL, 0, 'lira', 60000, 100000, NULL, 1, 1),
(746, '6937372282403', NULL, 'perfume la ve abell', NULL, 'other', 1, NULL, 0, 'lira', 60000, 100000, NULL, 1, 1),
(747, '945347310255', NULL, 'aux iph', NULL, 'other', 1, NULL, 0, 'dollar', 3.5, 5, NULL, 1, 1),
(748, '1213', NULL, 'protection fumeh', NULL, 'other', 1, NULL, 0, 'dollar', 1.5, 3, NULL, 1, 1),
(749, NULL, NULL, 'bag', NULL, 'other', 1, NULL, 0, 'lira', 5000, 7000, NULL, 1, 1),
(750, '420', NULL, 'ps4 20$', NULL, 'other', 1, NULL, 0, 'dollar', 20, 22, NULL, 1, 1),
(751, NULL, NULL, 'printing', NULL, 'other', 1, NULL, 0, 'lira', 1500, 3000, NULL, 1, 1),
(752, '4360', NULL, 'ps4 12mth', NULL, 'other', 1, NULL, 0, 'dollar', 60, 65, NULL, 1, 1),
(753, '317', NULL, 'idm', NULL, 'other', 1, NULL, 0, 'lira', 0, 0, NULL, 1, 1),
(754, '500', NULL, 'itell all', NULL, 'other', 1, NULL, 0, 'lira', 0, 0, NULL, 1, 1),
(755, '112', NULL, 'mtc start', NULL, 'other', 1, NULL, 0, 'lira', 130000, 220000, NULL, 1, 1),
(756, '1111', NULL, 'protection 5D', NULL, 'other', 1, NULL, 0, 'dollar', 0.35, 1, NULL, 1, 1),
(757, '22', NULL, 'cover shafef', NULL, 'other', 1, NULL, 0, 'dollar', 0.75, 1.75, NULL, 1, 1),
(758, '1115', NULL, 'cover مرتب', NULL, 'other', 1, NULL, 0, 'dollar', 1.25, 2, NULL, 1, 1),
(759, '1112', NULL, 'protection Ciramic', NULL, 'other', 1, NULL, 0, 'dollar', 0.45, 1.56, NULL, 1, 1),
(760, '1113', NULL, 'protection transperent', NULL, 'other', 1, NULL, 0, 'dollar', 0.25, 0.75, NULL, 1, 1),
(761, '550', NULL, 'cyberia', NULL, 'other', 1, NULL, 0, 'lira', 0, 0, NULL, 1, 1),
(762, NULL, NULL, 'earphone 3ade', NULL, 'other', 1, NULL, 0, 'dollar', 1, 1.5, NULL, 1, 1),
(763, '113', NULL, 'sim mtc', NULL, 'other', 1, NULL, 0, 'lira', 58000, 650000, NULL, 1, 1),
(764, '1335', NULL, 'cabel sat 20y', NULL, 'other', 1, NULL, 0, 'dollar', 2, 5, NULL, 1, 1),
(765, NULL, NULL, 'resiver sat', NULL, 'other', 1, NULL, 0, 'dollar', 8, 12, NULL, 1, 1),
(766, NULL, NULL, 'sa7in sat', NULL, 'other', 1, NULL, 0, 'dollar', 7, 11, NULL, 1, 1),
(767, '212', NULL, 'alfa wafer 30$', NULL, 'other', 1, NULL, 0, 'lira', 225000, 350000, NULL, 1, 1),
(768, '80', NULL, 'saheb', NULL, 'other', 1, NULL, 0, 'lira', 80000, 80000, NULL, 1, 1),
(769, '33000', NULL, '3000 uc', NULL, 'other', 1, NULL, 0, 'dollar', 50, 54, NULL, 1, 1),
(770, '312000', NULL, '12000 uc', NULL, 'other', 1, NULL, 0, 'dollar', 200, 208, NULL, 1, 1),
(771, '203', NULL, 'alfa $3', NULL, 'other', 1, NULL, 0, 'lira', 110000, 150000, NULL, 1, 1),
(772, '202', NULL, 'alfa $2', NULL, 'other', 1, NULL, 0, 'lira', 80000, 120000, NULL, 1, 1),
(773, NULL, NULL, 'wasle ps3', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(774, '201', NULL, 'alfa $1', NULL, 'other', 1, NULL, 0, 'lira', 50000, 60000, NULL, 1, 1),
(775, NULL, NULL, 'alfa $', NULL, 'other', 1, NULL, 0, 'lira', 0, 0, NULL, 1, 1),
(776, '111', NULL, 'mtc 4.5$', NULL, 'other', 1, NULL, 0, 'lira', 110000, 220000, NULL, 1, 1),
(777, '600', NULL, 'whish money', NULL, 'other', 1, NULL, 0, 'lira', 100000, 100000, NULL, 1, 1),
(778, '310', NULL, 'itell 10$', NULL, 'other', 1, NULL, 0, 'lira', 18000, 19000, NULL, 1, 1),
(779, '117', NULL, 'فاتورة mtc', NULL, 'other', 1, NULL, 0, 'lira', 0, 0, NULL, 1, 1),
(780, NULL, NULL, 'cabel net', NULL, 'other', 1, NULL, 0, 'lira', 800, 2000, NULL, 1, 1),
(781, NULL, NULL, 'c.v', NULL, 'other', 1, NULL, 0, 'lira', 0, 0, NULL, 1, 1),
(782, '320', NULL, 'PUBG Card 10$', NULL, 'other', 1, NULL, 0, 'dollar', 10, 11, NULL, 1, 1),
(783, '318', NULL, 'sos start', NULL, 'other', 1, NULL, 0, 'lira', 6500, 8000, NULL, 1, 1),
(784, '305', NULL, 'itell 5$', NULL, 'other', 1, NULL, 0, 'lira', 8750, 9000, NULL, 1, 1),
(785, NULL, NULL, 'terkib sat', NULL, 'other', 1, NULL, 0, 'lira', 0, 0, NULL, 1, 1),
(786, '316', NULL, 'ituns', NULL, 'other', 1, NULL, 0, 'dollar', 0, 0, NULL, 1, 1),
(787, '4820526ْ}أ01660', NULL, 'resiver star sat', NULL, 'other', 1, NULL, 0, 'dollar', 8, 12, NULL, 1, 1),
(788, NULL, NULL, 'ربح', NULL, 'other', 1, NULL, 0, 'lira', 0, 10000, NULL, 1, 1),
(789, NULL, NULL, 'updat ps4', NULL, 'other', 1, NULL, 0, 'lira', 0, 0, NULL, 1, 1),
(790, '211', NULL, 'alfa 3$ kart', NULL, 'other', 1, NULL, 0, 'lira', 90000, 160000, NULL, 1, 1),
(791, NULL, NULL, 'dvd', NULL, 'other', 1, NULL, 0, 'lira', 10000, 20000, NULL, 1, 1),
(792, '410', NULL, 'ps4 10$', NULL, 'other', 1, NULL, 0, 'dollar', 10, 12, NULL, 1, 1),
(793, '3300', NULL, '300 uc', NULL, 'other', 1, NULL, 0, 'dollar', 5, 6, NULL, 1, 1),
(794, '36000', NULL, '6000 uc', NULL, 'other', 1, NULL, 0, 'dollar', 100, 105, NULL, 1, 1),
(795, '450', NULL, 'ps4 50$', NULL, 'other', 1, NULL, 0, 'dollar', 50, 52.5, NULL, 1, 1),
(796, '430', NULL, 'ps4 1 mth', NULL, 'other', 1, NULL, 0, 'dollar', 11, 13, NULL, 1, 1),
(797, '104', NULL, 'mtc 0.5$', NULL, 'other', 1, NULL, 0, 'lira', 17000, 45000, NULL, 1, 1),
(798, '103', NULL, 'mtc 3$', NULL, 'other', 1, NULL, 0, 'lira', 85000, 150000, NULL, 1, 1),
(799, '102', NULL, 'mtc 2$', NULL, 'other', 1, NULL, 0, 'lira', 60000, 120000, NULL, 1, 1),
(800, '5100', NULL, 'freefire 100d', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(801, '31500', NULL, '1500 uc', NULL, 'other', 1, NULL, 0, 'dollar', 25, 27, NULL, 1, 1),
(802, '415', NULL, 'ps4 15$', NULL, 'other', 1, NULL, 0, 'dollar', 15, 17, NULL, 1, 1),
(803, '490', NULL, 'ps4 3 mth', NULL, 'other', 1, NULL, 0, 'dollar', 26, 30, NULL, 1, 1),
(804, '101', NULL, 'mtc 1$', NULL, 'other', 1, NULL, 0, 'lira', 30000, 60000, NULL, 1, 1),
(805, '114', NULL, 'ayam mtc', NULL, 'other', 1, NULL, 0, 'lira', 70000, 120000, NULL, 1, 1),
(806, '215', NULL, 'sim alfa', NULL, 'other', 1, NULL, 0, 'lira', 38000, 650000, NULL, 1, 1),
(807, '405', NULL, 'ps4 5$', NULL, 'other', 1, NULL, 0, 'dollar', 5, 6, NULL, 1, 1),
(808, NULL, NULL, 'software all', NULL, 'other', 1, NULL, 0, 'lira', 0, 0, NULL, 1, 1),
(809, '52200', NULL, 'freefire 2200d', NULL, 'other', 1, NULL, 0, 'dollar', 20, 22, NULL, 1, 1),
(810, '51080', NULL, 'freefire 1080d', NULL, 'other', 1, NULL, 0, 'dollar', 10, 12, NULL, 1, 1),
(811, '100', NULL, 'mtc 7.5$', NULL, 'other', 1, NULL, 0, 'lira', 225000, 350000, NULL, 1, 1),
(812, '510', NULL, 'ogero فاتورة', NULL, 'other', 1, NULL, 0, 'lira', 0, 0, NULL, 1, 1),
(813, '3060', NULL, '60 uc', NULL, 'other', 1, NULL, 0, 'dollar', 1, 2, NULL, 1, 1),
(814, '800', NULL, 'sattilite', NULL, 'other', 1, NULL, 0, 'lira', 0, 0, NULL, 1, 1),
(815, '700', NULL, 'NETFLIX', NULL, 'other', 1, NULL, 0, 'lira', 85000, 110000, NULL, 1, 1),
(816, '3600', NULL, '600 uc', NULL, 'other', 1, NULL, 0, 'dollar', 10, 11.5, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `stock_categories`
--

CREATE TABLE `stock_categories` (
  `category_ID` int NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `is_hidden` tinyint NOT NULL DEFAULT '0',
  `category_status` tinyint NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `stock_categories`
--

INSERT INTO `stock_categories` (`category_ID`, `category_name`, `is_hidden`, `category_status`) VALUES
(1, 'uncategorized', 1, 1),
(2, 'test', 0, 0),
(3, 'Networking', 0, 1),
(4, 'test 2', 0, 0),
(5, 'Mobile Accessories', 0, 1),
(6, 'Cables', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_ID` int NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `type` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'user',
  `owner` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `canAddService` tinyint(1) NOT NULL DEFAULT '0',
  `canAddItem` tinyint(1) NOT NULL DEFAULT '0',
  `canViewCustomers` tinyint(1) NOT NULL DEFAULT '0',
  `canViewPayments` tinyint(1) NOT NULL DEFAULT '0',
  `user_status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_ID`, `username`, `password`, `type`, `owner`, `canAddService`, `canAddItem`, `canViewCustomers`, `canViewPayments`, `user_status`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin', 'admin', 1, 1, 1, 1, 1),
(2, 'user', 'ee11cbb19052e40b07aac0ca060c23ee', 'user', 'user', 1, 1, 1, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_ID`);

--
-- Indexes for table `customers_payments`
--
ALTER TABLE `customers_payments`
  ADD PRIMARY KEY (`payment_ID`);

--
-- Indexes for table `debts_history`
--
ALTER TABLE `debts_history`
  ADD PRIMARY KEY (`record_ID`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_ID`);

--
-- Indexes for table `invoice_map`
--
ALTER TABLE `invoice_map`
  ADD PRIMARY KEY (`record_ID`);

--
-- Indexes for table `reminders`
--
ALTER TABLE `reminders`
  ADD PRIMARY KEY (`reminder_ID`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`setting_ID`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`item_ID`);

--
-- Indexes for table `stock_categories`
--
ALTER TABLE `stock_categories`
  ADD PRIMARY KEY (`category_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_ID`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers_payments`
--
ALTER TABLE `customers_payments`
  MODIFY `payment_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `debts_history`
--
ALTER TABLE `debts_history`
  MODIFY `record_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice_map`
--
ALTER TABLE `invoice_map`
  MODIFY `record_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reminders`
--
ALTER TABLE `reminders`
  MODIFY `reminder_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `setting_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `item_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1571;

--
-- AUTO_INCREMENT for table `stock_categories`
--
ALTER TABLE `stock_categories`
  MODIFY `category_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
