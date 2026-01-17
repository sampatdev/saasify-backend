import { ApiProperty } from '@nestjs/swagger'
import { UserResponseDto } from 'src/users/dto/user.response.dto'

class PaginationMetaDto {
  @ApiProperty({ example: 1 })
  page: number

  @ApiProperty({ example: 10 })
  limit: number

  @ApiProperty({ example: 57 })
  total: number

  @ApiProperty({ example: 6 })
  totalPages: number
}

export class PaginatedUsersResponseDto {
  @ApiProperty({ type: [UserResponseDto] })
  data: UserResponseDto[]

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto
}
