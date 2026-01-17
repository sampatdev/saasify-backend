// src/users/users.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe'
import { PaginationSchema } from 'src/common/pagination/pagination.schema'
import type { PaginationDto } from 'src/common/pagination/pagination.dto'
import { PaginationQueryDto } from 'src/common/pagination/pagination.swagger.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UsersService } from './users.service'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PaginatedUsersResponseDto } from 'src/common/pagination/paginated-response.dto'

@ApiTags('Users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Missing or invalid JWT' })
@ApiForbiddenResponse({ description: 'Insufficient role' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiQuery({ type: PaginationQueryDto })
  @ApiOkResponse({ type: PaginatedUsersResponseDto })
  @ApiForbiddenResponse({ description: 'Insufficient role' })
  async findAll(
    @Query(new ZodValidationPipe(PaginationSchema))
    query: PaginationDto,
  ) {
    return this.usersService.findAll(query)
  }
}
