import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDBV21666011698181 implements MigrationInterface {
    name = 'updateDBV21666011698181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`t_room\` DROP COLUMN \`rentDate\``);
        await queryRunner.query(`ALTER TABLE \`t_user\` CHANGE \`fullname\` \`fullname\` varchar(100) AS (CONCAT(lastName, firstName)) VIRTUAL NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`t_user\` CHANGE \`fullname\` \`fullname\` varchar(100) AS (concat(\`lastName\`,\`firstName\`)) VIRTUAL NULL`);
        await queryRunner.query(`ALTER TABLE \`t_room\` ADD \`rentDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
