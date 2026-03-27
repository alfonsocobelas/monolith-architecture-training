import GetAircraftUseCase from 'src/modules/aircrafts/application/find/get-aircraft-usecase.service'
import { GetAircraftInputMother } from './get-aircraft-input.mother'
import { GetAircraftOutputMother } from './get-aircraft-output.mother'
import { AircraftReadModelMother } from '../../domain/aircraft-read-model.mother'
import { AircraftRepositoryMock } from '../../mocks/aircraft.repository.mock'
import { AircraftModelMother } from '../../../aircraft-models/domain/aircraft-model.mother'
import { EngineMother } from '../../../engines/domain/engine.mother'

describe('GetAircraftUseCase (unit tests)', () => {
  let repository: AircraftRepositoryMock
  let useCase: GetAircraftUseCase

  beforeEach(() => {
    repository = new AircraftRepositoryMock()
    useCase = new GetAircraftUseCase(repository)
  })

  it('should get an existing aircraft by id', async () => {
    // GIVEN
    const input = GetAircraftInputMother.random()
    const aircraftModel = AircraftModelMother.random()
    const engines = [EngineMother.random(), EngineMother.random()]
    const expectedAircraftHydrate = AircraftReadModelMother.technicalSheet(input.id, aircraftModel, engines)
    const expectedOutput = GetAircraftOutputMother.fromDomain(expectedAircraftHydrate)
    repository.givenTechnicalSheet(expectedAircraftHydrate)

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    expect(result).toEqual(expectedOutput)
    repository.assertCalledWith('getTechnicalSheet', input.id)
  })

  it('should throw EntityNotFoundError if aircraft does not exist', async () => {
    // GIVEN
    const input = GetAircraftInputMother.random()
    repository.givenNoTechnicalSheet()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Aircraft with id "${input.id}" not found.`)
    repository.assertCalledWith('getTechnicalSheet', input.id)
  })
})
