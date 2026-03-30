import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmCriteriaConverter } from './typeorm/typeorm-criteria-converter'

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({ ...config.get('typeorm') })
    })
  ],
  providers: [TypeOrmCriteriaConverter],
  exports: [TypeOrmModule, TypeOrmCriteriaConverter]
})
export class PersistenceModule {}
