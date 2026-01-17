import { Module } from '@nestjs/common'
import { OrganizationsService } from './organizations.service'
import { OrganizationsRepository } from './organizations.repository'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [OrganizationsService, OrganizationsRepository],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
