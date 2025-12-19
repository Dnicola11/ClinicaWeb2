import { Injectable } from '@nestjs/common';
import { CreateExpertDto } from './dto/create-expert.dto';
import { UpdateExpertDto } from './dto/update-expert.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expert, ExpertDocument } from './entities/expert.entity';
import { Model } from 'mongoose';
@Injectable()
export class ExpertsService {
  constructor(
    @InjectModel(Expert.name)
    private readonly expertsModel: Model<ExpertDocument>,
  ) {}
  async create(createExpertDto: CreateExpertDto) {
    const item = new this.expertsModel({
      ...createExpertDto,
    });
    return item.save();
  }

  async findAll() {
    return this.expertsModel.find().exec();
  }

  async findOne(id: string) {
    return this.expertsModel.findById(id).exec();
  }

  async update(id: string, updateExpertDto: UpdateExpertDto) {
    return this.expertsModel
      .findByIdAndUpdate(id, updateExpertDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.expertsModel.findByIdAndDelete(id).exec();
  }
}
