import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'postgres',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // Set to false in production
  };
  
  export default config;