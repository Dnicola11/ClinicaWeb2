import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExpertDocument = HydratedDocument<Expert>;

@Schema({ timestamps: true })
export class Expert {
  @Prop()
  nickname: string;

  @Prop()
  color: string;
}

export const ExpertSchema = SchemaFactory.createForClass(Expert);
ExpertSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});
