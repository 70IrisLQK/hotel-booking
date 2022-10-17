import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDB1666010614858 implements MigrationInterface {
    name = 'updateDB1666010614858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`t_user\` CHANGE \`fullname\` \`fullname\` varchar(100) AS (CONCAT(lastName, firstName)) VIRTUAL NULL`);
        await queryRunner.query(`ALTER TABLE \`t_room\` DROP COLUMN \`rentDate\``);
        await queryRunner.query(`ALTER TABLE \`t_room\` ADD \`rentDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`t_room\` DROP COLUMN \`rentDate\``);
        await queryRunner.query(`ALTER TABLE \`t_room\` ADD \`rentDate\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`t_user\` CHANGE \`fullname\` \`fullname\` varchar(100) AS (concat(\`lastName\`,\`firstName\`)) VIRTUAL NULL`);
    }

}
