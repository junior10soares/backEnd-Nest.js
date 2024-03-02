import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BackendnestEntity } from './entity/backendnest.entity';
import { CreateBackDto } from './dto/create-back';
import { UpdateBackDto } from './dto/update-back';

@Injectable()
export class BackendnestService {
  // faz a injeção no banco de dados
  constructor(
    @InjectRepository(BackendnestEntity)
    private readonly backRepository: Repository<BackendnestEntity>,
  ) {}

  async findAll() {
    return await this.backRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOneOrFail(id: string) {
    try {
      return await this.backRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateBackDto) {
    return await this.backRepository.save(this.backRepository.create(data));
  }

  async update(id: string, data: UpdateBackDto) {
    const todo = await this.findOneOrFail(id);

    this.backRepository.merge(todo, data);
    return await this.backRepository.save(todo);
  }

  async deleteById(id: string) {
    await this.findOneOrFail(id);
    await this.backRepository.softDelete(id);
  }
}
