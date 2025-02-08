import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  exports: [UserService, MongooseModule],
  controllers: [UserController],
})
export class UserModule {}
