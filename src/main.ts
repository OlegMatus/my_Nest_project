import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { SwaggerHelper } from './common/helper/swagger.helper';
import { CustomConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: CustomConfigService =
    app.get<CustomConfigService>(CustomConfigService);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Swagger')
    .setDescription('User documentation')
    .setVersion('1.0')
    .addTag('march-2023')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConfig.app_port, () => {
    Logger.log(
      `http://${appConfig.app_host}:${appConfig.app_port}/api`,
      'DOCUMENTATION',
    );
  });
}
bootstrap();
