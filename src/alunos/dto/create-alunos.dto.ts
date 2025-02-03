import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  Length,
} from 'class-validator';

export class AlunosDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo Escola é obrigatório.' })
  Escola: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo Curso é obrigatório.' })
  Curso: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo Nome é obrigatório.' })
  Nome: string;

  @IsOptional()
  @Length(11, 11, { message: 'O CPF deve ter 11 dígitos.' })
  Cpf?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O e-mail informado não é válido.' })
  Email?: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo Endereço é obrigatório.' })
  Endereco: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo Número é obrigatório.' })
  Numero: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo Bairro é obrigatório.' })
  Bairro: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo Cidade é obrigatório.' })
  Cidade: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo Estado é obrigatório.' })
  Estado: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo Celular1 é obrigatório.' })
  Celular1: string;

  @IsOptional()
  @IsString()
  Celular2?: string;

  @IsOptional()
  @IsString()
  Celular3?: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo userAdmId é obrigatório.' })
  userAdmId: string;
}
