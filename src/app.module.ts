import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackendnestModule } from './app/backendnest/backendnest.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('DB_HOST', 'localhost'),
        port: Number(configService.get('DB_PORT', 27017)),
        database: configService.get('DB_DATABASE', 'backendnest'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      }),
    }),
    BackendnestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
