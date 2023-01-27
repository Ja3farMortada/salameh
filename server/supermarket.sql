-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2023 at 11:15 PM
-- Server version: 8.0.26
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supermarket`
--

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `invoice_ID` int NOT NULL,
  `user_ID_FK` int DEFAULT NULL,
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
  `qty` int NOT NULL,
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
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_ID` int NOT NULL,
  `service_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `service_description` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `service_type` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `service_category` varchar(50) NOT NULL,
  `service_sub_category` varchar(255) NOT NULL,
  `service_cost` bigint DEFAULT NULL,
  `service_price` bigint NOT NULL,
  `service_notes` varchar(255) DEFAULT NULL,
  `service_status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_ID`, `service_name`, `service_description`, `image_url`, `service_type`, `service_category`, `service_sub_category`, `service_cost`, `service_price`, `service_notes`, `service_status`) VALUES
(1, '$1.67', 'Touch 1.67$ (Credit only)', '/uploads/1671359583561-167.png', 'Telecom', 'Touch', 'Prepaid Voucher', 61000, 75000, 'no notes', 1),
(2, '$3.79', 'Touch 10 Days (3.79$)', '/uploads/1671360144651-379.png', 'Telecom', 'Touch', 'Prepaid Voucher', 137000, 150000, 'test 1', 1),
(3, '$4.50', 'Touch 1 Month (4.50$)', '/uploads/1671360550283-450.png', 'Telecom', 'Touch', 'Prepaid Voucher', 162000, 180000, NULL, 1),
(4, '$7.58', 'Touch 1 Month (7.58$)', '/uploads/1671360651715-758.png', 'Telecom', 'Touch', 'Prepaid Voucher', 270000, 300000, NULL, 1),
(5, '$15.15', 'Touch 60 days (15.15$)', '/uploads/1671360704258-1515.png', 'Telecom', 'Touch', 'Prepaid Voucher', 542000, 580000, 'null', 1),
(6, '$22.73', 'Touch 90 days (22.73$)', '/uploads/1671360751723-2273.png', 'Telecom', 'Touch', 'Prepaid Voucher', 814000, 850000, 'null', 1),
(7, '$77.28', 'Touch 1 year (77.28$)', '/uploads/1671360802602-7728.png', 'Telecom', 'Touch', 'Prepaid Voucher', 2761000, 2800000, 'null', 1),
(8, 'START $4.50', 'Touch START (4.50$)', '/uploads/1671360871562-s450.png', 'Telecom', 'Touch', 'Prepaid Voucher', 162000, 180000, 'null', 1),
(9, 'SMART $7.50', 'Touch SMART (7.50$)', '/uploads/1671360910108-750.png', 'Telecom', 'Touch', 'Prepaid Voucher', 270000, 300000, 'null', 1),
(10, 'SUPER $13.50', 'Touch SUPER (13.50$)', '/uploads/1671360951659-1350.png', 'Telecom', 'Touch', 'Prepaid Voucher', 486000, 520000, 'null', 1),
(11, 'SOS $1.22', 'Touch SOS (1.22$)', '/uploads/1671360992110-122.png', 'Telecom', 'Touch', 'Prepaid Voucher', 45000, 60000, 'null', 0),
(12, 'SOS 1.22$', 'Touch SOS (1.22$)', '/uploads/1671399852146-122.png', 'Telecom', 'Touch', 'Prepaid Voucher', 45000, 60000, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `setting_ID` int NOT NULL,
  `setting_name` varchar(20) NOT NULL,
  `setting_value` double NOT NULL,
  `setting_status` tinyint NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`setting_ID`, `setting_name`, `setting_value`, `setting_status`) VALUES
(1, 'exchangeRate', 50000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `item_ID` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `item_type` varchar(10) NOT NULL,
  `barcode` varchar(30) DEFAULT NULL,
  `currency` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `qty` int DEFAULT NULL,
  `item_cost` double DEFAULT NULL,
  `item_price` double NOT NULL,
  `item_notes` varchar(200) DEFAULT NULL,
  `item_isHidden` tinyint NOT NULL DEFAULT '0',
  `item_status` tinyint NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`item_ID`, `description`, `item_type`, `barcode`, `currency`, `qty`, `item_cost`, `item_price`, `item_notes`, `item_isHidden`, `item_status`) VALUES
(1, 'No Barcode', 'barcode', NULL, 'lira', 0, 0, 0, NULL, 1, 1),
(2, 'test 2', 'barcode', '654321', 'dollar', NULL, 29.7, 35.5, NULL, 0, 1),
(3, 'test 2', 'other', NULL, 'dollar', NULL, 170, 200, NULL, 0, 0),
(4, 'test', 'barcode', '987654', 'dollar', NULL, 0, 12000, NULL, 0, 0),
(5, 'test', 'barcode', '6431684315684', 'dollar', NULL, 0, 12, NULL, 0, 1),
(6, 'test 6', 'other', NULL, 'lira', NULL, NULL, 120000, NULL, 0, 0),
(7, 'جبنة بيكون 8 قطع', 'barcode', '3073781176322', 'lira', NULL, 65000, 80000, '45000 سعر الصرف', 0, 1),
(8, 'Snips Baked BBQ', 'barcode', '5281128103896', 'lira', NULL, 30000, 30000, NULL, 0, 1),
(9, 'Snips Baked Honey Mastard', 'barcode', '5281128104657', 'lira', NULL, 30000, 30000, NULL, 0, 1),
(10, 'mimosa', 'barcode', '5281001153109', 'lira', NULL, 40000, 50000, NULL, 0, 1),
(11, 'مربى المشمش g1000', 'barcode', '5285001401505', 'lira', NULL, 60000, 75000, NULL, 0, 1),
(12, '2134567', 'barcode', '1234567', 'lira', NULL, NULL, 20000, NULL, 0, 1),
(13, 'test', 'barcode', '123', 'lira', NULL, NULL, 10000, NULL, 0, 1),
(14, 'picon 8 pieces', 'barcode', '52634589762347586', 'lira', NULL, NULL, 90000, NULL, 0, 1),
(15, 'Delister', 'barcode', '6260079200358', 'lira', NULL, NULL, 40000, NULL, 0, 1),
(16, 'water', 'barcode', '5287000365062', 'lira', NULL, NULL, 20000, NULL, 0, 1),
(17, 'test', 'barcode', '345678903298765', 'lira', NULL, NULL, 40000, NULL, 0, 1),
(18, 'test', 'barcode', '585864785985', 'dollar', NULL, NULL, 20, NULL, 0, 1),
(19, 'unshift test', 'barcode', '23156456478956845', 'lira', NULL, NULL, 15000, NULL, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UID` int NOT NULL,
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'user',
  `owner` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `canAddService` tinyint(1) NOT NULL DEFAULT '0',
  `canAddItem` tinyint(1) NOT NULL DEFAULT '0',
  `canViewCustomers` tinyint(1) NOT NULL DEFAULT '0',
  `canViewPayments` tinyint(1) NOT NULL DEFAULT '0',
  `user_status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UID`, `username`, `password`, `type`, `owner`, `canAddService`, `canAddItem`, `canViewCustomers`, `canViewPayments`, `user_status`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin', 'admin', 1, 1, 1, 1, 1),
(2, 'user', 'ee11cbb19052e40b07aac0ca060c23ee', 'user', 'user', 1, 1, 1, 0, 1);

--
-- Indexes for dumped tables
--

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
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_ID`);

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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UID`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

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
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `setting_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `item_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
