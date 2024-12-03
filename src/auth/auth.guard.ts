import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info, context) {
        // console.log('Error en JwtAuthGuard:', err);
        // console.log('Usuario en JwtAuthGuard:', user);
        // console.log('Info del token en JwtAuthGuard:', info);
    
        if (err || !user) {
          throw err || new UnauthorizedException('Token inválido o usuario no autenticado');
        }
        // const request = context.switchToHttp().getRequest();
        // return user; // Asegúrate de devolver el usuario
        // request.user = user; // Asignar explícitamente el usuario a request.user
        user={...user,user:user}
        // console.log(user)
        return user;
      }
}
