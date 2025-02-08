import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/userService.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUser: CreateUserDto) {
    const payload = {
      email: createUser?.email,
      userName: createUser?.userName,
      phoneNumber: createUser?.phoneNumber,
      password: createUser?.password,
    };
    console.log(payload, 'create user payload');
    const newUser = new this.userModel(payload);
    return newUser.save();
  }

  async findOne(email: String): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }
}
