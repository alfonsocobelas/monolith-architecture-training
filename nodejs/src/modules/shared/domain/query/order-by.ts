import { InvalidArgumentError } from 'src/common/errors'

export class OrderBy {
  constructor(readonly value: string) {
    if (!value) {
      throw new InvalidArgumentError('OrderBy value cannot be empty')
    }
  }
}
