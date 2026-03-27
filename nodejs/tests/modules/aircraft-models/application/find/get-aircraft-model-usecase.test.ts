import GetAircraftModelUseCase from 'src/modules/aircraft-models/application/find/get-aircraft-model-usecase.service'
import { GetAircraftModelInputMother } from './get-aircraft-model-input.mother'
import { GetAircraftModelOutputMother } from './get-aircraft-model-output.mother'
import { AircraftModelRepositoryMock } from '../../mocks/aircraft-model.repository.mock'
import { AircraftModelMother } from '../../domain/aircraft-model.mother'

describe('GetAircraftModelUseCase (unit tests)', () => {
  let repository: AircraftModelRepositoryMock
  let useCase: GetAircraftModelUseCase

  beforeEach(() => {
    repository = new AircraftModelRepositoryMock()
    useCase = new GetAircraftModelUseCase(repository)
  })

  it('should get an existing aircraft model by id', async () => {
    // GIVEN
    const input = GetAircraftModelInputMother.random()
    const expectedModel = AircraftModelMother.fromInput(input)
    const expectedOutput = GetAircraftModelOutputMother.fromDomain(expectedModel)
    repository.givenFound(expectedModel)

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    expect(result).toEqual(expectedOutput)
    repository.assertCalledWith('get', input.id)
  })

  it('should throw EntityNotFoundError if model does not exist', async () => {
    // GIVEN
    const input = GetAircraftModelInputMother.random()
    repository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`AircraftModel with id "${input.id}" not found.`)
    repository.assertCalledWith('get', input.id)
  })
})
