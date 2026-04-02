import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmCriteriaConverter } from './typeorm/typeorm-criteria-converter'
import { TypeOrmTransactionManager } from './typeorm/typeorm-transaction-manager'
import { TransactionManager } from 'src/modules/shared/domain/persistence/transaction-manager'

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({ ...config.get('typeorm') })
    })
  ],
  providers: [
    TypeOrmCriteriaConverter,
    TypeOrmTransactionManager,
    {
      provide: TransactionManager,
      useExisting: TypeOrmTransactionManager
    }
  ],
  exports: [
    TypeOrmModule,
    TypeOrmCriteriaConverter,
    TypeOrmTransactionManager,
    TransactionManager
  ]
})
export class PersistenceModule {}
