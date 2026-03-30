import { TypeORMConfig } from 'src/infrastructure/config/env.types'

declare global {
  namespace NestJS {
    interface Config {
      app: {
        env: string;
        port: number;
      };
      database: TypeORMConfig;
    }
  }
}
