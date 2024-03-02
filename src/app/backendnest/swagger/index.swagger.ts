import { OmitType } from '@nestjs/swagger';
import { BackendnestEntity } from '../entity/backendnest.entity';

export class IndexSwagger extends OmitType(BackendnestEntity, [
  'createdAt', //caso eu queira 'sumir' para nao aparecer no swagger de obg ou array
]) {}
