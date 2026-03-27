import { faker } from '@faker-js/faker'

export function randomString(minLength: number, maxLength: number): string {
  return faker.string.alphanumeric({ length: { min: minLength, max: maxLength } })
}
