import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TaskService } from './task.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/create-task')
  async addTask(
    @Req() req: any,
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    const userId = req.user.userId;
    const task = await this.taskService.createTask(userId, title, description);
    return task;
  }

  @Get('/get-tasks')
  async getAllTasks(@Req() req: any) {
    const userId = req.user.userId;
    return this.taskService.getTasksByUser(userId);
  }

  @Get('/single-task/:id')
  async getTask(@Req() req: any, @Param('id') taskId: string) {
    const userId = req.user.userId;
    return this.taskService.getTaskById(taskId, userId);
  }

  @Patch('/update-task/:id')
  async updateTask(
    @Req() req: any,
    @Param('id') taskId: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: string,
  ) {
    const userId = req.user.userId;
    return this.taskService.updateTask(
      taskId,
      userId,
      title,
      description,
      status,
    );
  }

  @Delete('/delete-task/:id')
  async removeTask(@Req() req: any, @Param('id') taskId: string) {
    const userId = req.user.userId;
    await this.taskService.deleteTask(taskId, userId);
    return { message: 'Task successfully deleted' };
  }
}
