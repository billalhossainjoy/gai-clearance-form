import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
    cors({
      origin: [
        'https://gai-clearance-form.vercel.app',
        'https://www.gai.gov.bd',
        'http://localhost:5173',
        'https://gai.gov.bd',
        'https://dev.gai.gov.bd',
      ],
      credentials: true,
    }),
  );
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
