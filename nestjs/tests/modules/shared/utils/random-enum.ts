import { faker } from '@faker-js/faker'

export function randomEnumValue<T extends object>(enumObj: T): T[keyof T] {
  const values = Object.values(enumObj) as T[keyof T][]
  return faker.helpers.arrayElement(values)
}
