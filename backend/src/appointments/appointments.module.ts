import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './entities/appointment.entity';
import { Service, ServiceSchema } from 'src/services/entities/service.entity';
import { Client, ClientSchema } from 'src/clients/entities/client.entity';
import { Expert, ExpertSchema } from 'src/experts/entities/expert.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: Client.name, schema: ClientSchema },
      { name: Expert.name, schema: ExpertSchema },
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
