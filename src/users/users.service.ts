import { Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import { PaginationDto } from 'src/common/pagination/pagination.dto'
import { PaginatedResult } from 'src/common/pagination/pagination.types'

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async findAll(
    pagination: PaginationDto,
  ): Promise<PaginatedResult<any>> {
    const { data, total } =
      await this.usersRepository.findPaginated(pagination)

    const totalPages = Math.ceil(total / pagination.limit)

    return {
      data,
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages,
      },
    }
  }
}
