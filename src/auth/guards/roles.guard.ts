import {
    CanActivate,
    ExecutionContext,
    Injectable,
  } from '@nestjs/common'
  import { Reflector } from '@nestjs/core'
  
  export const ROLES_KEY = 'roles'
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      // 1️⃣ Get required roles from metadata
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
      )
  
      // If no roles specified → allow access
      if (!requiredRoles) {
        return true
      }
  
      // 2️⃣ Get user from request (set by JWT strategy)
      const request = context.switchToHttp().getRequest()
      const user = request.user
  
      // 3️⃣ Check role
      return requiredRoles.includes(user.role)
    }
  }
  