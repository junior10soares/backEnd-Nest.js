import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateBackDto {
  //input dos front salvar
  @IsNotEmpty()
  @ApiProperty()
  task: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsIn([0, 1]) //q seja 0 ou 1
  isDone: number;
}
