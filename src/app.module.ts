import * as path from 'node:path';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './config/config.module';
import { CustomConfigService } from './config/config.service';
import { AuthModule } from './modules/auth/auth.module';
import { CarModule } from './modules/car/car.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      useFactory: (customConfigService: CustomConfigService) => {
        console.log(__dirname);
        return {
          type: 'postgres',
          host: customConfigService.db_host,
          port: customConfigService.db_port,
          username: customConfigService.db_username,
          password: customConfigService.db_password,
          database: customConfigService.db_database,
          synchronize: true,
          entities: [
            path.join(__dirname, 'database', '**', '*.entity{.ts,.js}'),
          ],
        };
      },
      inject: [CustomConfigService],
    }),
    UserModule,
    AuthModule,
    CarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
