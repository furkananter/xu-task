"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
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
//# sourceMappingURL=main.js.map