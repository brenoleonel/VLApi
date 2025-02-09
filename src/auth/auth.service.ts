import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserAdminService } from 'src/user-admin/user-admin.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserAdminService: UserAdminService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserAdmin(email: string, senha: string): Promise<any> {
    const userAdmin = await this.UserAdminService.findUserByEmail(email);
    if (userAdmin && (await bcrypt.compare(senha, userAdmin.Senha))) {
      const { Senha, ...result } = userAdmin;
      return result;
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  async login(userAdmin: any) {
    const payload = { sub: userAdmin.id, email: userAdmin.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
