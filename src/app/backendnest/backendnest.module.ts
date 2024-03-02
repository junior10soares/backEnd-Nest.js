import { Module } from '@nestjs/common';
import { BackendnestController } from './backendnest.controller';
import { BackendnestService } from './backendnest.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackendnestEntity } from './entity/backendnest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BackendnestEntity])], //import a entity
  controllers: [BackendnestController],
  providers: [BackendnestService],
  exports: [BackendnestService],
})
export class BackendnestModule {}
