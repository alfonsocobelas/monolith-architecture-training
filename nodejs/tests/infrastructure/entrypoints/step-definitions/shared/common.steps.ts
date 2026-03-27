/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import assert from 'assert'
import request from 'supertest'
import { expect } from 'chai'
import { Given, When, Then } from '@cucumber/cucumber'
import { MyWorld } from './world'
import { EntityMapper } from './entity-mapper'
import { parseDataTableRows } from './utils'

Given('the following {string} exist in the system:', async function (this: MyWorld, entityName: string, dataTable) {
  const entityClass = EntityMapper[entityName.toLowerCase()]

  if (!entityClass) {
    throw new Error(`Entity "${entityName}" not found in EntityMapper.`)
  }

  const data = parseDataTableRows(dataTable)

  await this.arranger!.insertMany(entityClass, data)
})

Given('I set the following query parameters:', function (this: MyWorld, dataTable: any) {
  const params = dataTable.rowsHash()
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'string' && value === '<saved nextCursor>') {
      this.queryParams[key] = this.savedCursor
    } else {
      this.queryParams[key] = value
    }
  })
})

// Given('I add the following filters:', function (this: MyWorld, dataTable: any) {
//   this.currentFilters.push(...dataTable.hashes())
// })

// Given('I add the following orders:', function (this: MyWorld, dataTable: any) {
//   this.currentOrders.push(...dataTable.hashes())
// })

// When('I send a GET request to {string}', async function (this: MyWorld, route: string) {
//   const filters = this.currentFilters.length ? JSON.stringify(this.currentFilters) : undefined
//   const orders = this.currentOrders.length ? JSON.stringify(this.currentOrders) : undefined

//   this.response = await request(this.app!.httpServer)
//     .get(route)
//     .query({
//       ...this.queryParams,
//       filters,
//       orders
//     })
// })

Then('the response body should be:', function (this: MyWorld, docString: string) {
  assert.deepStrictEqual(this.response?.body, JSON.parse(docString))
})

Then('the response body should contain {int} items', function (this: MyWorld, count: number) {
  assert.strictEqual(this.response?.body.length, count)
})

// Then('the response status code should be {int}', function (this: MyWorld, status: number) {
//   assert.strictEqual(this.response?.status, status)
// })

When('I send a POST request to {string} with body:', async function (this: MyWorld, route: string, body: string) {
  this.response = await request(this.app!.httpServer).post(route).send(JSON.parse(body))
})

Then('the following {string} should exist in the system:', async function (this: MyWorld, entityName: string, table) {
  const entityClass = EntityMapper[entityName.toLowerCase()]

  if (!entityClass) {
    throw new Error(`Entity ${entityName} not mapped.`)
  }

  const expectedRows = table.hashes()

  for (const expected of expectedRows) {
    const actual = await this.arranger!.findOneBy(entityClass, { id: expected.id })

    assert.ok(actual, `Record with id ${expected.id} was not persisted in ${entityName}`)

    // Validate that all expected fields match the actual record
    Object.keys(expected).forEach(key => {
      let expectedValue = expected[key]
      let actualValue = actual[key]

      if (Array.isArray(expectedValue) && typeof actualValue === 'string') {
        actualValue = [actualValue]
      }

      if (Array.isArray(actualValue) && typeof expectedValue === 'string') {
        const parsed = JSON.parse(expectedValue)
        if (Array.isArray(parsed)) {
          expectedValue = parsed
        }
      }

      if (Array.isArray(expectedValue) && Array.isArray(actualValue)) {
        assert.deepStrictEqual(
          actualValue,
          expectedValue,
          `Mismatch in field "${key}": expected ${JSON.stringify(expectedValue)} but got ${JSON.stringify(actualValue)}`
        )
      } else {
        assert.strictEqual(
          String(actualValue),
          String(expectedValue),
          `Mismatch in field "${key}": expected ${expectedValue} but got ${actualValue}`
        )
      }
    })
  }
})

When('I send a DELETE request to {string}', async function (this: MyWorld, route: string) {
  this.response = await request(this.app!.httpServer).delete(route)
})

Then(
  'the following {string} should not exist in the system:',
  async function (this: MyWorld, entityName: string, table) {
    const entityClass = EntityMapper[entityName.toLowerCase()]
    const expectedRows = table.hashes()

    for (const expected of expectedRows) {
      const actual = await this.arranger!.findOneBy(entityClass, { id: expected.id })
      assert.strictEqual(actual, null, `Record with id ${expected.id} still exists in ${entityName}`)
    }
  }
)

// --- CONFIGURACIÓN DE PARÁMETROS ---

Given('I set the {string} query parameter to {string}', function (this: MyWorld, key: string, value: string) {
  this.queryParams[key] = value
})

Given('I add the following filters:', function (this: MyWorld, table: any) {
  this.currentFilters.push(...table.hashes())
})

Given('I add the following orders:', function (this: MyWorld, table: any) {
  this.currentOrders.push(...table.hashes())
})

// --- EJECUCIÓN ---

When('I send a GET request to {string}', async function (this: MyWorld, path: string) {
  const query = {
    ...this.queryParams,
    // Formateamos para que el controlador reciba los objetos de filtro/orden
    filters: this.currentFilters.length ? JSON.stringify(this.currentFilters) : undefined,
    orders: this.currentOrders.length ? JSON.stringify(this.currentOrders) : undefined
  }

  this.response = await request(this.app!.httpServer).get(path).query(query)
})

// --- ASERCIONES CON CHAI ---

Then('the response status code should be {int}', function (this: MyWorld, code: number) {
  expect(this.response?.status).to.equal(code)
})

Then('the response {string} should be {string}', function (this: MyWorld, path: string, expected: string) {
  const actual = String(this.response?.body[path])
  expect(actual).to.equal(expected)
})

Then('the response {string} should not be null', function (this: MyWorld, path: string) {
  expect(this.response?.body[path]).to.not.be.null
})

Then('the response {string} should be null', function (this: MyWorld, path: string) {
  expect(this.response?.body[path]).to.be.null
})

Then('the response should contain the following {string}:', function (this: MyWorld, path: string, table: any) {
  const expectedRows = table.hashes()
  const actualItems = this.response?.body[path]

  expect(actualItems).to.be.an('array')

  expectedRows.forEach((expected: any, i: number) => {
    const actual = actualItems[i]
    expect(actual, `The item at index ${i} does not exist`).to.not.be.undefined

    Object.keys(expected).forEach(key => {
      const expectedVal = expected[key]
      const actualVal = actual[key]

      if (!isNaN(expectedVal) && !isNaN(actualVal)) {
        expect(Number(actualVal).toFixed(2)).to.equal(Number(expectedVal).toFixed(2), `Fail in the item[${i}].${key}`)
      } else {
        expect(actualVal.toString()).to.equal(expectedVal.toString(), `Fail in the item[${i}].${key}`)
      }
    })
  })
})

// --- GESTIÓN DEL CURSOR ---

Then('I save the {string} from the last response', function (this: MyWorld, path: string) {
  this.savedCursor = this.response?.body[path]
  expect(this.savedCursor, 'Fail: Attempted to save a null cursor').to.not.be.null
})

Given('I set the {string} query parameter to the saved cursor', function (this: MyWorld, key: string) {
  this.queryParams[key] = this.savedCursor
})

// // Step to validate specific fields in the pagination JSON
// Then('the pagination field {string} should be {int}', function (this: MyWorld, field: string, value: number) {
//   assert.strictEqual(this.response?.body[field], value)
// })

// Then('the first element should have {string} {string}', function (this: MyWorld, field: string, value: string) {
//   assert.strictEqual(String(this.response?.body.items[0][field]), value)
// })

// Then('I save the {string} from the response', function (this: MyWorld, field: string) {
//   this.savedCursor = this.response?.body[field]
// })

// Then('the response body should contain:', function (this: MyWorld, docString: string) {
//   const expected = JSON.parse(docString)
//   const actual = this.response?.body

//   Object.entries(expected).forEach(([key, value]) => {
//     if (Array.isArray(value)) {
//       value.forEach((item, idx) => {
//         Object.entries(item).forEach(([itemKey, itemValue]) => {
//           if (actual[key] && actual[key][idx]) {
//             assert.strictEqual(actual[key][idx][itemKey], itemValue)
//           }
//         })
//       })
//     } else {
//       assert.strictEqual(actual[key], value)
//     }
//   })
// })

// // --- GESTIÓN DEL CURSOR ---

// Given('I save the {string} from the last response', function (path: string) {
//   this.savedCursor = this.lastResponse.body[path]
// })

// Given('I set the {string} query parameter to the saved cursor', function (key: string) {
//   this.queryParams[key] = this.savedCursor
// })

// // --- VALIDACIÓN DE TABLAS (ITEMS) ---

// Then('the response should contain the following {string}:', function (path: string, table: any) {
//   const expected = table.hashes()
//   const actual = this.lastResponse.body[path]

//   expected.forEach((row: any, i: number) => {
//     Object.keys(row).forEach(key => {
//       // assert.strictEqual(actual, esperado, mensaje_opcional)
//       assert.strictEqual(actual[i][key].toString(), row[key].toString())
//     })
//   })
// })

// // --- VALIDACIÓN DE CAMPOS SIMPLES ---

// Then('the response {string} should be {string}', function (path: string, val: string) {
//   const actual = this.lastResponse.body[path]
//   assert.strictEqual(String(actual), val)
// })

// Then('the response {string} should be null', function (path: string) {
//   assert.strictEqual(this.lastResponse.body[path], null)
// })

// Then('the response {string} should contain {int} elements', function (path: string, count: number) {
//   assert.strictEqual(this.lastResponse.body[path].length, count)
// })

// Then('the response item {string} {string} should be {string}',
// function (index: string, field: string, value: string) {
//   const item = this.lastResponse.body.items[parseInt(index)]
//   assert.strictEqual(item[field].toString(), value)
// })

// Then('the response {string} should be an empty list', function (path: string) {
//   const actual = this.lastResponse.body[path]
//   assert.ok(Array.isArray(actual) && actual.length === 0)
// })
