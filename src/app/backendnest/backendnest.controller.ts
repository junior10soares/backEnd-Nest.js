import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BackendnestService } from './backendnest.service';
import { CreateBackDto } from './dto/create-back';
import { UpdateBackDto } from './dto/update-back';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexSwagger } from './swagger/index.swagger';
import { ShowSwagger } from './swagger/show.swagger';
import { UpdateSwagger } from './swagger/update.swagger';
import { CreateSwagger } from './swagger/create.swagger';
import { BadRequestSwagger } from './helpers/bad-request.swagger';
import { NotFoundSwagger } from './helpers/not-found.swagger';

@Controller('api/v1/backendnests') //baseURL
@ApiTags('backend')
export class BackendnestController {
  constructor(private readonly backService: BackendnestService) {}

  @Get() //mostrar td infor
  @ApiOperation({ summary: 'Listar todas as tarefas' }) //mostra msg no body
  @ApiResponse({
    status: 200,
    description: 'Listar tarefas com sucesso',
    type: IndexSwagger,
  })
  async index() {
    return await this.backService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar tarefas' })
  @ApiResponse({
    status: 201,
    description: 'Nova tarefa criada com sucesso',
    type: CreateSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    type: BadRequestSwagger,
  })
  async create(@Body() body: CreateBackDto) {
    return await this.backService.create(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Exibir os dados de uma tarefa' })
  @ApiResponse({
    status: 200,
    description: 'Dados tarefa retornado com sucesso',
    type: ShowSwagger, //ex dentro do swagger como obj
  })
  @ApiResponse({
    status: 404,
    description: 'Dados não foi encontrado',
    type: NotFoundSwagger,
  })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    //tem que ser o id se nao da erro
    return await this.backService.findOneOrFail(id); //retorna o id
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar os dados' })
  @ApiResponse({
    status: 200,
    description: 'Atualizado com sucesso',
    type: UpdateSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Dados não foi encontrado',
    type: BadRequestSwagger,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateBackDto,
  ) {
    return await this.backService.update(id, body); //retorna o id
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover uma tarefa' })
  @ApiResponse({ status: 204, description: 'Removido com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Não foi encontrado',
    type: NotFoundSwagger,
  })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.backService.deleteById(id);
  }
}
