import { EntityRepository, Repository } from 'typeorm';
import { RolePermission } from '../../database/entities';

@EntityRepository(RolePermission)
export class RolePermissionRepository extends Repository<RolePermission> {
  public async bulkCreate(data) {
    await this.createQueryBuilder().insert().values(data).execute();
    return true;
  }
}
