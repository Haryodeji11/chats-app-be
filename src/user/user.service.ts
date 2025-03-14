import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async finduserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async getallUser(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getOneUser(userId: any): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async deleteUser(userId: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(userId).exec();
    if (!user) {
      throw new UnauthorizedException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async isUserOnline(userId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException(`User with ID ${userId} not found`);
    }
    return user.isUserOnline;
  }

  async updatePassword(userId: string, password: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException(`User with ID ${userId} not found`);
    }
    user.password = password;
    return user.save();
  }
}
