import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ default: () => new mongoose.Types.ObjectId() })
  userId: String;
  @Prop({ required: true })
  userName: String;
  @Prop({ required: true })
  email: String;
  @Prop({ required: true })
  phoneNumber: String;

  @Prop({ required: true })
  password: string;

  @Prop({ default: () => Date.now() })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
