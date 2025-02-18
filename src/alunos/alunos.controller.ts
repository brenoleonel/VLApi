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
  Res,
  UseGuards,
} from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { AlunosDto } from './dto/create-alunos.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';

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

  @Get(':id/pdf')
  async gerarPdf(@Param('id') id: string, @Res() res: Response) {
    const aluno = await this.alunoService.findAlunoById(id);

    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    // Criar o documento PDF
    const doc = new PDFDocument({
      margin: 30,
      size: 'A5',
      layout: 'landscape', // 🔥 Define o PDF como paisagem
    });
    
    // Configurar a resposta HTTP para PDF
    res.setHeader('Content-Disposition', `attachment; filename=aluno-${id}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');
    
    // Pipe para enviar o PDF diretamente na resposta
    doc.pipe(res);
    
    // Adicionar título
    doc.fontSize(24).text('DADOS DO ALUNO', { align: 'center' }).moveDown(1);
    
    // Adicionar os dados formatados
    doc
      .fontSize(16)
      .text(`ESCOLA: ${aluno.Escola}  |  CURSO: ${aluno.Curso}`, { align: 'left' })
      .text(`NOME: ${aluno.Nome}  |  CPF: ${aluno.Cpf}`)
      .moveDown(0.5)
      .text(`ENDEREÇO: ${aluno.Endereco}, ${aluno.Numero}  |  BAIRRO: ${aluno.Bairro}, | CIDADE: ${aluno.Cidade}  |  ESTADO: ${aluno.Estado} `)
      .moveDown(0.5)
      .text(`EMAIL: ${aluno.Email} | CELULAR 1: ${aluno.Celular1}`);
    
    // Adicionar Celular 2 e Celular 3 apenas se existirem
    if (aluno.Celular2) doc.text(`CELULAR 2: ${aluno.Celular2}`);
    if (aluno.Celular3) doc.text(`CELULAR 3: ${aluno.Celular3}`);
    
    // Finalizar o PDF
    doc.end();
  }
}
