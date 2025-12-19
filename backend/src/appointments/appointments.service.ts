import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment, AppointmentDocument } from './entities/appointment.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from 'src/services/entities/service.entity';
import { Client, ClientDocument } from 'src/clients/entities/client.entity';
import { Expert, ExpertDocument } from 'src/experts/entities/expert.entity';
import { ReadAppointmenstDto } from './dto/read-appointments.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentsModel: Model<AppointmentDocument>,
    @InjectModel(Service.name)
    private readonly servicesModel: Model<ServiceDocument>,
    @InjectModel(Client.name)
    private readonly clientsModel: Model<ClientDocument>,
    @InjectModel(Expert.name)
    private readonly expertsModel: Model<ExpertDocument>,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    const { serviceId, clientId, expertId, ...data } = createAppointmentDto;
    const [service, expert, client] = await Promise.all([
      this.servicesModel.findById(serviceId).exec(),
      this.expertsModel.findById(expertId).exec(),
      this.clientsModel.findById(clientId).exec(),
    ]);

    const item = new this.appointmentsModel({
      ...data,
      service: service?._id ?? serviceId,
      client: client?._id ?? clientId,
      expert: expert?._id ?? expertId,
    });

    return item.save();
  }

  async findAll(readAppointmenstDto: ReadAppointmenstDto) {
    const view = readAppointmenstDto.view;
    const date = new Date(readAppointmenstDto.date);
    let where = {};

    switch (view.toLowerCase()) {
      case 'day':
        where = {
          startTime: {
            $gte: date,
            $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
          },
        };
        break;

      case 'week':
        const firstDayOfWeek = new Date(
          date.setDate(date.getDate() - date.getDay()),
        );
        const lastDayOfWeek = new Date(
          firstDayOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000,
        );
        where = {
          startTime: { $gte: firstDayOfWeek, $lt: lastDayOfWeek },
        };
        break;

      case 'month':
        const firstDayOfMonth = new Date(
          date.getFullYear(),
          date.getMonth(),
          1,
        );
        const lastDayOfMonth = new Date(
          firstDayOfMonth.getFullYear(),
          firstDayOfMonth.getMonth() + 1,
          1,
        );
        where = {
          startTime: { $gte: firstDayOfMonth, $lt: lastDayOfMonth },
        };
        break;

      default:
        throw new Error('Invalid view specified.');
    }
    return this.appointmentsModel
      .find(where)
      .populate('client')
      .populate('service')
      .populate('expert')
      .exec();
  }

  async findOne(id: string) {
    return this.appointmentsModel.findById(id).exec();
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const { serviceId, clientId, expertId, ...rest } = updateAppointmentDto;
    const update: Record<string, unknown> = { ...rest };

    if (serviceId) {
      update.service = serviceId;
    }
    if (clientId) {
      update.client = clientId;
    }
    if (expertId) {
      update.expert = expertId;
    }

    return this.appointmentsModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.appointmentsModel.findByIdAndDelete(id).exec();
  }
}
