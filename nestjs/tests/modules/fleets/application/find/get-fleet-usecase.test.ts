import { GetFleetUseCase } from 'src/modules/fleets/application/find/get-fleet-usecase.service'
import { GetFleetInputMother } from './get-fleet-input.mother'
import { GetFleetOutputMother } from './get-fleet-output.mother'
import { FleetRepositoryMock } from '../../mocks/fleet.repository.mock'
import { FleetMother } from '../../domain/fleet.mother'

describe('GetFleetUseCase (unit tests)', () => {
  let repository: FleetRepositoryMock
  let useCase: GetFleetUseCase

  beforeEach(() => {
    repository = new FleetRepositoryMock()
    useCase = new GetFleetUseCase(repository)
  })

  it('should get an existing fleet by id', async () => {
    // GIVEN
    const input = GetFleetInputMother.random()
    const expectedFleet = FleetMother.fromInput(input)
    const expectedOutput = GetFleetOutputMother.fromDomain(expectedFleet)
    repository.givenFound(expectedFleet)

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    expect(result).toEqual(expectedOutput)
    repository.assertCalledWith('get', input.id)
  })

  it('should throw EntityNotFoundError if fleet does not exist', async () => {
    // GIVEN
    const input = GetFleetInputMother.random()
    repository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Fleet with id "${input.id}" not found.`)
    repository.assertCalledWith('get', input.id)
  })
})
