import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Client } from 'src/clients/entities/client.entity';
import { Expert } from 'src/experts/entities/expert.entity';
import { Service } from 'src/services/entities/service.entity';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: Date })
  startTime: Date;

  @Prop()
  notes: string;

  @Prop()
  duration: number;

  @Prop()
  status: string;

  @Prop({ type: Types.ObjectId, ref: Client.name, required: true })
  client: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Service.name, required: true })
  service: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Expert.name, required: true })
  expert: Types.ObjectId;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
AppointmentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});
