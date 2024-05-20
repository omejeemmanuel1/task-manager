import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';
import { TasksGateway } from './tasks.gateway';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    private readonly tasksGateway: TasksGateway,
  ) {}

  async createTask(
    userId: string,
    title: string,
    description: string,
  ): Promise<Task> {
    const newTask = new this.taskModel({ title, description, userId });
    const task = await newTask.save();
    this.tasksGateway.sendTaskCreated(task);
    return task;
  }

  async getTasksByUser(userId: string): Promise<Task[]> {
    return this.taskModel.find({ userId }).exec();
  }

  async getTaskById(taskId: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: taskId, userId });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async updateTask(
    taskId: string,
    userId: string,
    title: string,
    description: string,
    status: string,
  ): Promise<Task> {
    const updatedTask = await this.taskModel.findOneAndUpdate(
      { _id: taskId, userId },
      { title, description, status },
      { new: true },
    );
    if (!updatedTask) {
      throw new NotFoundException('Task not found or you are not authorized');
    }
    this.tasksGateway.sendTaskUpdated(updatedTask);
    return updatedTask;
  }

  async deleteTask(taskId: string, userId: string): Promise<void> {
    const result = await this.taskModel
      .deleteOne({ _id: taskId, userId })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Task not found or you are not authorized');
    }
    this.tasksGateway.sendTaskDeleted(taskId);
  }
}
