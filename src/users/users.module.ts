import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TasksModule } from 'src/tasks/tasks.module';
import { env } from 'process';

@Module({
  imports:[PassportModule,TasksModule,JwtModule.register({
    secret:process.env.Jwt_Secret,
    signOptions: { expiresIn: '6000s' }
  })],
  providers: [UsersResolver, UsersService,PrismaService,JwtStrategy]
})
export class UsersModule {}
