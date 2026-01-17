import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginSchema, SignupSchema } from './auth.schema'
import type { LoginDto, SignupDto } from './auth.types'
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe'
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { ApiResponse } from 'src/common/types/api-response.type'
import { LoginRequestDto, SignupRequestDto } from './auth.dto'
import { LoginResponseDto, SignupResponseDto } from './dto/auth.response.dto'
import { SignupSwaggerResponseDto } from './dto/signup.swagger-response.dto'
import { LoginSwaggerResponseDto } from './dto/login.swagger-response.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({ type: SignupSwaggerResponseDto })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiBody({ type: SignupRequestDto })
  @ApiOkResponse({ type: SignupResponseDto })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async signup(
    @Body(new ZodValidationPipe(SignupSchema))
    body: SignupDto,
  ): Promise<ApiResponse<{ id: string; email: string }>> {
    const result = await this.authService.signup(body)

    if (result.status === 'error') {
      throw new BadRequestException(result.error)
    }

    return {
      success: true,
      data: result.data,
    }
  }

  @Post('login')
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginRequestDto })
  @ApiOkResponse({
    description: 'Login successful',
    type: LoginSwaggerResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(
    @Body(new ZodValidationPipe(LoginSchema))
    body: LoginDto,
  ): Promise<ApiResponse<{ accessToken: string }>> {
    const result = await this.authService.login(body)

    if (result.status === 'error') {
      throw new BadRequestException(result.error)
    }

    return {
      success: true,
      data: result.data,
    }
  }
}
