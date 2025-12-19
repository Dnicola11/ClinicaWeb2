import { Module } from '@nestjs/common';
import { ExpertsService } from './experts.service';
import { ExpertsController } from './experts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Expert, ExpertSchema } from './entities/expert.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Expert.name, schema: ExpertSchema }]),
  ],
  controllers: [ExpertsController],
  providers: [ExpertsService],
})
export class ExpertsModule {}
