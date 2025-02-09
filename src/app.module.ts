import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAdminModule } from './user-admin/user-admin.module';
import { AlunosModule } from './alunos/alunos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserAdminModule, AlunosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
