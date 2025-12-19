export class CreateAppointmentDto {
  startTime: Date;
  duration: number;
  notes: string;
  clientId: string;
  expertId: string;
  serviceId: string;
  status: string;
}
