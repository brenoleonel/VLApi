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
  UseGuards,
} from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { AlunosDto } from './dto/create-alunos.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunoService: AlunosService) {}
  @Post()
  @HttpCode(201)
  async createdAluno(@Body() aluno: AlunosDto) {
    const novoAluno = await this.alunoService.createdAluno(aluno);
    return novoAluno;
  }

  @Get('/allalunos')
  @HttpCode(200)
  async findAllAlunos() {
    const allAlunos = await this.alunoService.findAllAlunos();
    return {
      message: 'Todos os Formandos cadastrados:',
      Alunos: allAlunos,
    };
  }

  @Get('/:id')
  @HttpCode(200)
  async findAluno(@Param('id') id: string) {
    const findAluno = await this.alunoService.findAlunoById(id);
    if (!findAluno) {
      throw new BadRequestException('Aluno não encontrado');
    }
    return {
      message: 'Aluno encontrado:',
      Aluno: findAluno,
    };
  }

  @Get('/useradm/:userAdmId')
  @HttpCode(200)
  async findAlunosByUserAdm(@Param('userAdmId') userAdmId: string) {
    const alunos = await this.alunoService.findAlunosByUserAdm(userAdmId);
    if (!alunos.length) {
      throw new BadRequestException(
        'Nenhum aluno encontrado para este UserAdm.',
      );
    }
    return {
      message: 'Alunos encontrados:',
      alunos,
    };
  }

  @Put('/:id')
  @HttpCode(200)
  async updateAluno(@Param('id') id: string, @Body() aluno: AlunosDto) {
    const findAlunoId = await this.alunoService.findAlunoById(id);
    if (!findAlunoId) {
      throw new BadRequestException('Aluno nao encontrado.');
    }

    const updateAluno = await this.alunoService.updateAluno(aluno, id);
    return {
      message: 'Aluno atualizado com sucesso!!',
      Aluno: updateAluno,
    };
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteAluno(@Param('id') id: string) {
    const findAlunoId = await this.alunoService.findAlunoById(id);
    if (!findAlunoId) {
      throw new BadRequestException('Aluno nao encontrado.');
    }

    await this.alunoService.deleteAluno(id);
    return {
      message: 'Aluno apagado com sucesso!',
    };
  }
}
