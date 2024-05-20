import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'open' })
  status: string;

  @Prop({ type: String, ref: 'User' })
  userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
