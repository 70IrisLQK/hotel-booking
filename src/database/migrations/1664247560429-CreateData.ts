import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateData1664247560429 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO t_role(id,name)
             VALUES('15c01958-b062-4820-a67f-d1276177cc01', 'Super Admin'),
                   ('15c01958-b062-4820-a67f-d1276177cc02', 'Admin'),
                   ('15c01958-b062-4820-a67f-d1276177cc03', 'Chef')`,
    );
    await queryRunner.query(
      `INSERT INTO t_permission(id,name)
             VALUES('15c01958-66ef-4820-a67f-d1276177cc01', 'Super Admin'),
                   ('15c01958-66ef-4820-a67f-d1276177cc02', 'manager'),
                   ('15c01958-66ef-4820-a67f-d1276177cc03', 'user')`,
    );
    await queryRunner.query(
      `INSERT INTO m_role_permission(id,roleId,permissionId)
             VALUES('15c01958-b062-4820-a671-d1276177cc01', '15c01958-b062-4820-a67f-d1276177cc01', '15c01958-66ef-4820-a67f-d1276177cc01'),
                   ('15c01958-b062-4820-a671-d1276177cc02', '15c01958-b062-4820-a67f-d1276177cc01', '15c01958-66ef-4820-a67f-d1276177cc02'),
                   ('15c01958-b062-4820-a671-d1276177cc03', '15c01958-b062-4820-a67f-d1276177cc02', '15c01958-66ef-4820-a67f-d1276177cc01'),
                   ('15c01958-b062-4820-a671-d1276177cc04', '15c01958-b062-4820-a67f-d1276177cc02', '15c01958-66ef-4820-a67f-d1276177cc02'),
                   ('15c01958-b062-4820-a671-d1276177cc05', '15c01958-b062-4820-a67f-d1276177cc01', '15c01958-66ef-4820-a67f-d1276177cc03')`,
    );
    await queryRunner.query(
      `INSERT INTO t_user(id,email,password,firstName,lastName,address,phone)
             VALUES('deaef1f5-b062-4820-a67f-d1276177cc01','admin@htl.com', '$2a$10$fs0rnEPYtfHYvah.TO2QJOtGA7sGHNSivDOPprgBM0z37Ja68HgDy','Admin','Super','TP.HCM','0987654321')`,
    );
    await queryRunner.query(
      `INSERT INTO m_user_role(id,roleId,userId)
             VALUES('15c01958-b062-4820-a671-d1276177aa01', '15c01958-b062-4820-a67f-d1276177cc01', 'deaef1f5-b062-4820-a67f-d1276177cc01')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
