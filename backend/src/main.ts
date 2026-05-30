import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // === CẤU HÌNH CORS MẠNH HƠN ===
  app.enableCors({
    origin: [
      "https://bt-1-zodschema-zod-resolve-frontend-66oz2plls-jdnqs-projects.vercel.app",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:3001",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin"],
    credentials: true,
    exposedHeaders: ["Authorization"],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("Auth API")
    .setDescription("API cho Login va Register")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(process.env.PORT || 3001);
  console.log(`🚀 Server is running on port ${process.env.PORT || 3001}`);
}

bootstrap();
