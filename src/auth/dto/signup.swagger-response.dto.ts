import { ApiProperty } from '@nestjs/swagger'
import { SignupResponseDto } from './auth.response.dto'

export class SignupSwaggerResponseDto {
  @ApiProperty({ example: true })
  success: boolean

  @ApiProperty({ type: SignupResponseDto })
  data: SignupResponseDto
}
