import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserAdminDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo Nome é obrigatório.' })
  Nome: string;

  @IsEmail({}, { message: 'O e-mail informado não é válido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  Email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  Senha: string;

  @IsString()
  @IsNotEmpty()
  userAdmId: string;
}
