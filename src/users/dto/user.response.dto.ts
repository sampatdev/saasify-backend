import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty({ example: 'john@example.com' })
  email: string

  @ApiProperty({ enum: ['ADMIN', 'MEMBER'] })
  role: string

  @ApiProperty()
  organizationId: string
}
