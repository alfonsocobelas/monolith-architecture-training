import { faker } from '@faker-js/faker'

export function randomNumber(min: number, max: number): number {
  return faker.number.int({ min, max })
}
