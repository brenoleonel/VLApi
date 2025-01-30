import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserAdminService } from './user-admin.service';
import { UserAdminDto } from './dto/create-userAdmin.dto';
import * as bcrypt from 'bcrypt';

@Controller('user-admin')
export class UserAdminController {
  constructor(private readonly userService: UserAdminService) {}
  @Post()
  @HttpCode(201)
  async createdUserAdmin(@Body() user: UserAdminDto) {
    const emailExist = await this.userService.findUserByEmail(user.Email);
    if (emailExist) {
      throw new BadRequestException('Email ja cadastrado');
    }

    const novoUserAdmin = await this.userService.createdUserAdmin(user);
    return novoUserAdmin;
  }

  @Post('/login')
  @HttpCode(200)
  async loginUser(@Body() user: UserAdminDto) {
    const userExist = await this.userService.findUserByEmail(user.Email);
    if (!userExist) {
      throw new BadRequestException('Email ou senha invalidos');
    }

    const userValid = await bcrypt.compare(user.Senha, userExist.Senha);
    if (!userValid) {
      throw new BadRequestException('Email ou senha invalidos');
    }
    return {
      user: {
        id: userExist.id,
        nome: userExist.Nome,
        email: userExist.Email,
      },
    };
  }

  @Get('/allusers/:id?')
  @HttpCode(200)
  async findUser(@Param('id') id?: string) {
    if (id) {
      const findUserAdmin = await this.userService.findUserById(id);
      if (!findUserAdmin) {
        throw new BadRequestException('Usuario nao encontrado ou id invalido');
      }
      return {
        message: 'Usuario encontrado',
        user: {
          id: findUserAdmin.id,
          nome: findUserAdmin.Nome,
          email: findUserAdmin.Email,
          criado: findUserAdmin.createdAt,
        },
      };
    } else {
      const allUserAdmin = await this.userService.findAllUsers();
      return {
        message: 'Todos os usuarios encontrados',
        users: allUserAdmin,
      };
    }
  }

  @Put('/:id')
  @HttpCode(200)
  async updatedUserAdmin(@Param('id') id: string, @Body() user: UserAdminDto) {
    const findUserId = await this.userService.findUserById(id);
    if (!findUserId) {
      throw new BadRequestException('Usuario nao encontrado ou id invalido');
    }

    const updateUserAdmin = await this.userService.updateUserAdmin(user, id);
    return {
      message: 'Usuario atualizado com sucesso',
      user: updateUserAdmin,
    };
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteUserAdmin(@Param('id') id: string) {
    const findUserId = await this.userService.findUserById(id);
    if (!findUserId) {
      throw new BadRequestException('Usuario nao encontrado ou id invalido');
    }

    await this.userService.deleteUserAdmin(id);
    return {
      message: 'Usuario deletado com sucesso!',
    };
  }
}
