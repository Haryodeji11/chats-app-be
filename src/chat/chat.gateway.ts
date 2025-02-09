import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { Message } from './schema/message.schema';
@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody()
    data: {
      senderId: string;
      receiverId: string;
      message: string;
    },
  ): Promise<Message> {
    const message = this.chatService.sendMessage(
      data.senderId,
      data.receiverId,
      data.message,
    );
    this.server.emit(`message-${data.receiverId}`, message);
    return message;
  }
}
