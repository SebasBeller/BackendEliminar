import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('Usuario autenticado:', user);
  
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('Roles requeridos:', requiredRoles);
  
    return requiredRoles ? requiredRoles.includes(user.tipo) : true;
  }
  
}
