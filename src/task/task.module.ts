import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskSchema } from './task.schema';
import { DatabaseModule } from '../database/database.module';
import { TasksGateway } from './tasks.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
  ],
  providers: [TaskService, TasksGateway],
  controllers: [TaskController],
})
export class TaskModule {}
