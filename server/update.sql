ALTER TABLE `stock_categories` CHANGE `is_hidden` `show_on_sell` TINYINT NOT NULL DEFAULT '1';

ALTER TABLE `stock_categories` ADD `category_index` INT NULL DEFAULT NULL AFTER `category_ID`;

ALTER TABLE `settings` ADD `round_value` INT NULL DEFAULT '1' AFTER `setting_value`;

ALTER TABLE `settings` CHANGE `setting_value` `rate_value` DOUBLE NULL DEFAULT NULL;

UPDATE stock SET item_status = 0 WHERE item_type = 'Voucher';

INSERT INTO `settings` (`setting_ID`, `setting_name`, `rate_value`, `round_value`, `value`, `setting_status`) VALUES (NULL, 'sayrafaRate', '70000', '1', NULL, '1');

-- set barcode field unique
ALTER TABLE `stock` ADD UNIQUE(`barcode`);

ALTER TABLE `invoice` ADD `sayrafa_rate` DOUBLE NULL DEFAULT NULL AFTER `exchange_rate`;
ALTER TABLE `invoice_map` ADD `sayrafa_rate` DOUBLE NULL DEFAULT NULL AFTER `exchange_rate`;

ALTER TABLE `invoice_map` ADD `original_price` DOUBLE NULL DEFAULT NULL AFTER `unit_price`;

ALTER TABLE `customers_payments` ADD `sayrafa_rate` DOUBLE NULL AFTER `exchange_rate`;

ALTER TABLE `customers` ADD `sayrafa_debt` DOUBLE NOT NULL DEFAULT '0' AFTER `dollar_debt`;
