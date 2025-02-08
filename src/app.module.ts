import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
dotenv.config();
@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING, {
      tls: true, // Enable TLS for MongoDB Atlas
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
