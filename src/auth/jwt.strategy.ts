import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ignoreExpiration: false, 
      secretOrKey: 'secreto', 
    });
  }

  async validate(payload: any) {
      console.log('Payload recibido en JwtStrategy:', payload); // Log para verificar si se procesa el token
      return { id: payload.id_usuario, email: payload.username, tipo: payload.tipo };
  }
  
  
  
}
