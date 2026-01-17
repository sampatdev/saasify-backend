import { ApiProperty } from '@nestjs/swagger'

export class PaginationQueryDto {
  @ApiProperty({ example: 1, minimum: 1 })
  page: number

  @ApiProperty({ example: 10, minimum: 1, maximum: 100 })
  limit: number

  @ApiProperty({ required: false, example: 'john' })
  search?: string

  @ApiProperty({ required: false, enum: ['ADMIN', 'MEMBER'] })
  role?: string

  @ApiProperty({ required: false, enum: ['createdAt', 'email'], example: 'createdAt' })
  sortBy?: string

  @ApiProperty({ required: false, enum: ['asc', 'desc'], example: 'desc' })
  order?: string
}
