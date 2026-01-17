// src/auth/auth.dto.ts
import { ApiProperty } from '@nestjs/swagger'

export class SignupRequestDto {
  @ApiProperty({ example: 'john@example.com' })
  email: string

  @ApiProperty({ example: 'StrongP@ss123', minLength: 8 })
  password: string
}

export class LoginRequestDto {
  @ApiProperty({ example: 'john@example.com' })
  email: string

  @ApiProperty({ example: 'StrongP@ss123' })
  password: string
}
