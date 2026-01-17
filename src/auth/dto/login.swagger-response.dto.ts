// src/auth/dto/login.swagger-response.dto.ts
import { ApiProperty } from '@nestjs/swagger'

class LoginDataDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string
}

export class LoginSwaggerResponseDto {
  @ApiProperty({ example: true })
  success: boolean

  @ApiProperty({ type: LoginDataDto })
  data: LoginDataDto
}
