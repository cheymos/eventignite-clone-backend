import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('🔥 EventIgnite API')
  .setDescription('The EventIgnite clone API docs')
  .setExternalDoc(
    'Source code',
    'https://github.com/cheymos/eventignite-clone-backend',
  )
  .setVersion('v1')
  .addBearerAuth({
    type: 'http',
    description: 'This token is available 30 mins',
  })
  .build();

export const swaggerModuleOptions: SwaggerCustomOptions = {
  customSiteTitle: 'EventIgnite API docs',
  customfavIcon: '../favicon.ico',
};
