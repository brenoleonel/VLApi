import { Injectable } from '@nestjs/common';
import { UserAdminDto } from './dto/create-userAdmin.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserAdminService {
  constructor(private readonly prisma: PrismaService) {}
  async createdUserAdmin(user: UserAdminDto) {
    const senhaHash = await this.senhaHash(user.Senha);
    const novoUsuarioAdmin = await this.prisma.userAdmin.create({
      data: {
        ...user,
        Senha: senhaHash,
      },
      select: {
        id: true,
        Nome: true,
        Email: true,
      },
    });
    return novoUsuarioAdmin;
  }

  async findUserByEmail(Email: string) {
    const userAdmin = await this.prisma.userAdmin.findUnique({
      where: {
        Email,
      },
    });
    return userAdmin;
  }

  async findUserById(id: string) {
    const userAdmin = await this.prisma.userAdmin.findUnique({
      where: {
        id,
      },
    });
    return userAdmin;
  }

  async findAllUsers() {
    const userAdmin = await this.prisma.userAdmin.findMany({
      select: {
        id: true,
        Nome: true,
        Email: true,
        createdAt: true,
      },
    });
    return userAdmin;
  }

  async updateUserAdmin(user: Partial<UserAdminDto>, id: string) {
    if (user.Senha) {
      user.Senha = await this.senhaHash(user.Senha);
    }
    return this.prisma.userAdmin.update({
      where: { id },
      data: {
        ...user,
      },
      select: {
        id: true,
        Nome: true,
        Email: true,
      },
    });
  }

  async deleteUserAdmin(id: string) {
    const userAdmin = await this.prisma.userAdmin.delete({
      where: {
        id,
      },
    });
  }

  private async senhaHash(senha: string): Promise<string> {
    const salt = 10;
    return bcrypt.hash(senha, salt);
  }
}
