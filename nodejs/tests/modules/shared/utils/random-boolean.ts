import { faker } from '@faker-js/faker'

export function randomBoolean(): boolean {
  return faker.datatype.boolean()
}
