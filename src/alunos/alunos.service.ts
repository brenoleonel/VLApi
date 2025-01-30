import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AlunosDto } from './dto/create-alunos.dto';

@Injectable()
export class AlunosService {
  constructor(private readonly prisma: PrismaService) {}
  async createdAluno(user: AlunosDto) {
    const novoAluno = await this.prisma.alunos.create({
      data: {
        ...user,
      },
    });
    return novoAluno;
  }

  async findAlunoById(id: string) {
    const alunoId = await this.prisma.alunos.findUnique({
      where: {
        id,
      },
    });
    return alunoId;
  }

  async findAllAlunos() {
    const alunoId = await this.prisma.alunos.findMany();
    return alunoId;
  }

  async updateAluno(user: Partial<AlunosDto>, id: string) {
    const alunoUpdate = await this.prisma.alunos.update({
      where: { id },
      data: {
        ...user,
      },
    });
  }

  async deleteAluno(id: string) {
    const alunoDelete = await this.prisma.alunos.delete({
      where: {
        id,
      },
    });
  }
}
