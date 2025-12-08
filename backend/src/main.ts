import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS for frontend communication
    app.enableCors({
        origin: 'http://localhost:4200',
        credentials: true,
    });

    await app.listen(4000);
    console.log('🚀 Backend server running on http://localhost:4000');
    console.log('📊 GraphQL Playground available at http://localhost:4000/graphql');
}

bootstrap();
