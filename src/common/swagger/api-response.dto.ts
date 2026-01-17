import { ApiProperty } from '@nestjs/swagger'

export class ApiSuccessResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean

  data: T
}

export class ApiErrorResponseDto {
  @ApiProperty({ example: false })
  success: boolean

  @ApiProperty({
    example: {
      message: 'Validation error',
    },
  })
  error: {
    message: string
  }
}
