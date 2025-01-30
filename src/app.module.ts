import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAdminModule } from './user-admin/user-admin.module';
import { AlunosModule } from './alunos/alunos.module';

@Module({
  imports: [UserAdminModule, AlunosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
