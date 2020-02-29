import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //跨域控制
  app.enableCors()
  //swagger 配置
  const options = new DocumentBuilder()
    .setTitle('full stack')
    .setDescription('后台管理api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);



  console.log(`http://localhost:3000/api-docs`)
}
bootstrap();
