import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './schema/message.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async sendMessage(senderId: string, receiverId: string, message: string) {
    const newMessage = new this.messageModel({
      senderId,
      receiverId,
      message,
    });
    return newMessage.save();
  }

  async getMessages(senderId: string, receiverId: string) {
    return this.messageModel.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
  }
  async markMessagesAsRead(senderId: string, receiverId: string) {
    return this.messageModel.updateMany(
      { senderId, receiverId },
      { isRead: true },
    );
  }
}
