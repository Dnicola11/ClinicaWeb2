import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Service, ServiceDocument } from './entities/service.entity';
import { Model } from 'mongoose';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name)
    private readonly servicesModel: Model<ServiceDocument>,
  ) {}
  async create(createServiceDto: CreateServiceDto) {
    const item = new this.servicesModel({
      ...createServiceDto,
    });
    return item.save();
  }

  async findAll() {
    return this.servicesModel.find().exec();
  }

  async findOne(id: string) {
    return this.servicesModel.findById(id).exec();
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    return this.servicesModel
      .findByIdAndUpdate(id, updateServiceDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.servicesModel.findByIdAndDelete(id).exec();
  }
}
