import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
dotenv.config();
@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING, {
      tls: true, // Enable TLS for MongoDB Atlas
    }),
    ChatModule,
  ],
  controllers: [AppController, ChatController],
  providers: [AppService],
})
export class AppModule {}
