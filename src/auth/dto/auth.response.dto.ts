import { ApiProperty } from '@nestjs/swagger'

export class SignupResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty({ example: 'john@example.com' })
  email: string
}

export class LoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string
}
