import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EstudianteService } from '../estudiante/estudiante.service';
import { ProfesorService } from '../profesor/profesor.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly estudianteService: EstudianteService,
    private readonly profesorService: ProfesorService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    if (email === 'admin123' && password === 'admin123') {
      return { id: 0, email, tipo: 'admin' };
    }
    let tipo = "ninguno";
    let id=0;
    let user = await this.profesorService.findOneByEmail(email);
    if(user){
      tipo = 'profesor';
      id=user.id_profesor 
      if (user && await bcrypt.compare(password, user.password)) {
        console.log("m")
        return { ...user, tipo,id:id };
      }
    }
    if (!user) {

      let user = await this.estudianteService.findOneByEmail(email);
      tipo = 'estudiante';
      id=user.id_estudiante;
      console.log(user)
      if (user && await bcrypt.compare(password, user.password)) {
        console.log("m")
        return { ...user, tipo,id:id };
      }
    }

  
    return null;
  }
  

  async login(user: any) {
    console.log(user)
    const payload = {
      username: user.email,
      id_usuario: user.id,
      tipo: user.tipo, // Asegúrate de incluir 'tipo'
    };
    return {
      access_token: this.jwtService.sign(payload),
      usuario: user,
    };
  }
  
    
    // const payload = { username: user.email, id_usuario: user.id_estudiante|| user.id_profesor };
    // const {password,...usuario}=user
    // return {
    //   access_token: this.jwtService.sign(payload),
    //   usuario
    // };
  }
// }
