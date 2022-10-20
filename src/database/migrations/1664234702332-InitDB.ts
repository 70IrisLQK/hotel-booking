import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1664234702332 implements MigrationInterface {
  name = 'InitDB1664234702332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`t_permission\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`m_role_permission\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`roleId\` varchar(36) NULL, \`permissionId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`t_role\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`m_user_role\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`roleId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`t_user\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`firstName\` varchar(50) NOT NULL, \`lastName\` varchar(50) NOT NULL, \`fullname\` varchar(100) AS (CONCAT(lastName, firstName)) VIRTUAL NULL, \`email\` varchar(254) NOT NULL, \`password\` varchar(255) NOT NULL, \`address\` varchar(255) NULL, \`phone\` varchar(255) NULL, UNIQUE INDEX \`IDX_1d0b42896fa20240f9ffcc8012\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`t_customer\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`t_booking\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`checkInDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`checkOutDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`bookingStatus\` enum ('unpaid', 'completed', 'canceled') NOT NULL DEFAULT 'unpaid', \`customerId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`t_hotel\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`email\` int NOT NULL, \`price\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`t_room_type\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`t_room\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`description\` varchar(255) NOT NULL, \`images\` text NOT NULL, \`publicIds\` text NOT NULL, \`quantity\` int UNSIGNED NOT NULL DEFAULT '0', \`price\` int UNSIGNED NOT NULL DEFAULT '0', \`status\` enum ('unavailable', 'available') NOT NULL DEFAULT 'available', \`typeId\` varchar(36) NULL, \`hotelId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`m_customer_booking\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`price\` int NOT NULL, \`roomId\` varchar(36) NULL, \`bookingId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`m_role_permission\` ADD CONSTRAINT \`FK_e7c054857c5d23b74e0c19bbbdb\` FOREIGN KEY (\`roleId\`) REFERENCES \`t_role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`m_role_permission\` ADD CONSTRAINT \`FK_db9d42ba3444d7d981ef2937ab4\` FOREIGN KEY (\`permissionId\`) REFERENCES \`t_permission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`m_user_role\` ADD CONSTRAINT \`FK_cc718400bd6e7a6685b3481b843\` FOREIGN KEY (\`roleId\`) REFERENCES \`t_role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`m_user_role\` ADD CONSTRAINT \`FK_de7e61807787ada2e3cd3d0ed05\` FOREIGN KEY (\`userId\`) REFERENCES \`t_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`t_booking\` ADD CONSTRAINT \`FK_95ee686b503c04187ea5621ae2c\` FOREIGN KEY (\`customerId\`) REFERENCES \`t_customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`t_booking\` ADD CONSTRAINT \`FK_362e515a59559d99166bb949805\` FOREIGN KEY (\`userId\`) REFERENCES \`t_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`t_room\` ADD CONSTRAINT \`FK_1a1c92eace154ad94722c4a2dab\` FOREIGN KEY (\`typeId\`) REFERENCES \`t_room_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`t_room\` ADD CONSTRAINT \`FK_b90038bf6b1582616d7349c31fd\` FOREIGN KEY (\`hotelId\`) REFERENCES \`t_hotel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`m_customer_booking\` ADD CONSTRAINT \`FK_d2cf193aab92e448b49e6556682\` FOREIGN KEY (\`roomId\`) REFERENCES \`t_room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`m_customer_booking\` ADD CONSTRAINT \`FK_2bd030a74748081677de607a3ef\` FOREIGN KEY (\`bookingId\`) REFERENCES \`t_booking\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`m_customer_booking\` DROP FOREIGN KEY \`FK_2bd030a74748081677de607a3ef\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`m_customer_booking\` DROP FOREIGN KEY \`FK_d2cf193aab92e448b49e6556682\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`t_room\` DROP FOREIGN KEY \`FK_b90038bf6b1582616d7349c31fd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`t_room\` DROP FOREIGN KEY \`FK_1a1c92eace154ad94722c4a2dab\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`t_booking\` DROP FOREIGN KEY \`FK_362e515a59559d99166bb949805\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`t_booking\` DROP FOREIGN KEY \`FK_95ee686b503c04187ea5621ae2c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`m_user_role\` DROP FOREIGN KEY \`FK_de7e61807787ada2e3cd3d0ed05\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`m_user_role\` DROP FOREIGN KEY \`FK_cc718400bd6e7a6685b3481b843\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`m_role_permission\` DROP FOREIGN KEY \`FK_db9d42ba3444d7d981ef2937ab4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`m_role_permission\` DROP FOREIGN KEY \`FK_e7c054857c5d23b74e0c19bbbdb\``,
    );
    await queryRunner.query(`DROP TABLE \`m_customer_booking\``);
    await queryRunner.query(`DROP TABLE \`t_room\``);
    await queryRunner.query(`DROP TABLE \`t_room_type\``);
    await queryRunner.query(`DROP TABLE \`t_hotel\``);
    await queryRunner.query(`DROP TABLE \`t_booking\``);
    await queryRunner.query(`DROP TABLE \`t_customer\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_1d0b42896fa20240f9ffcc8012\` ON \`t_user\``,
    );
    await queryRunner.query(`DROP TABLE \`t_user\``);
    await queryRunner.query(`DROP TABLE \`m_user_role\``);
    await queryRunner.query(`DROP TABLE \`t_role\``);
    await queryRunner.query(`DROP TABLE \`m_role_permission\``);
    await queryRunner.query(`DROP TABLE \`t_permission\``);
  }
}
