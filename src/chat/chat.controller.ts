import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ChatService } from './chat.service';
import { Controller, Get, Post, UseGuards } from '@nestjs/common';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send')
  async sendMessage(senderId: string, receiverId: string, message: string) {
    return this.chatService.sendMessage(senderId, receiverId, message);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:senderId/:receiverId')
  async getMessages(senderId: string, receiverId: string) {
    return this.chatService.getMessages(senderId, receiverId);
  }
  @UseGuards(JwtAuthGuard)
  @Post('read')
  async markMessagesAsRead(senderId: string, receiverId: string) {
    return this.chatService.markMessagesAsRead(senderId, receiverId);
  }
}
