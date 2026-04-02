import { TransactionManager } from 'src/modules/shared/domain/persistence/transaction-manager'
import { MockRepository } from './mock.repository'

export class TransactionManagerMock
  extends MockRepository<void>
  implements TransactionManager
{
  runInTransaction<T>(fn: () => Promise<T>): Promise<T> {
    return this.getMock('runInTransaction')(fn)
  }

  getEntityManager(): unknown {
    return this.getMock('getEntityManager')()
  }

  // Helpers
  whenRunInTransactionSuccess(): void {
    this.getMock('runInTransaction').mockImplementation(async (fn: () => Promise<void>) => {
      await fn()
    })
  }

  whenRunInTransactionUnsuccess(error: Error): void {
    this.getMock('runInTransaction').mockImplementation(async (fn: () => Promise<void>) => {
      await fn()
      throw error
    })
  }
}
