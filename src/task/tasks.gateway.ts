import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  sendTaskCreated(task: any) {
    this.server.emit('taskCreated', task);
  }

  sendTaskUpdated(task: any) {
    this.server.emit('taskUpdated', task);
  }

  sendTaskDeleted(taskId: string) {
    this.server.emit('taskDeleted', taskId);
  }
}
