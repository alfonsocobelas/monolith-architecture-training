export abstract class EnvironmentArranger {
  abstract arrange(): Promise<void>
  abstract close(): Promise<void>
  abstract insertOne<T>(entity: { new (): T }, data: Partial<T>): Promise<void>
  abstract insertMany<T>(entity: { new (): T }, dataArray: Partial<T>[]): Promise<void>
  abstract findOneBy<T>(entity: { new (): T }, query: Partial<T>): Promise<T | null>
  abstract find<T>(entity: { new (): T }, query: Partial<T>): Promise<T[]>
}
