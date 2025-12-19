import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from './entities/client.entity';
import { Model } from 'mongoose';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const item = new this.clientModel({
      ...createClientDto,
    });
    return item.save();
  }

  async findAll() {
    return this.clientModel.find().exec();
  }

  async findOne(id: string) {
    return this.clientModel.findById(id).exec();
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientModel
      .findByIdAndUpdate(id, updateClientDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.clientModel.findByIdAndDelete(id).exec();
  }
}
