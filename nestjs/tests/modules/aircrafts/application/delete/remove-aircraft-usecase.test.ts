import { RemoveAircraftUseCase } from 'src/modules/aircrafts/application/delete/remove-aircraft-usecase.service'
import { RemoveAircraftInputMother } from './remove-aircraft-input.mother'
import { AircraftRepositoryMock } from '../../mocks/aircraft.repository.mock'
import { AircraftMother } from '../../domain/aircraft.mother'

describe('RemoveAircraftUseCase (unit tests)', () => {
  let aircraftRepository: AircraftRepositoryMock
  let useCase: RemoveAircraftUseCase

  beforeEach(() => {
    aircraftRepository = new AircraftRepositoryMock()
    useCase = new RemoveAircraftUseCase(aircraftRepository)
  })

  it('should delete an existing aircraft by id', async () => {
    // GIVEN
    const input = RemoveAircraftInputMother.random()
    const expectedAircraft = AircraftMother.fromInput(input)
    aircraftRepository.givenFound(expectedAircraft)

    // WHEN
    await useCase.invoke(input)
    aircraftRepository.whenRemoveSuccess()

    // THEN
    aircraftRepository.assertCalledWith('get', input.id)
    aircraftRepository.assertCalledWith('remove', expectedAircraft)
  })

  it('should throw EntityNotFoundError if aircraft does not exist', async () => {
    // GIVEN
    const input = RemoveAircraftInputMother.random()
    aircraftRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Aircraft with id "${input.id}" not found.`)
    aircraftRepository.assertCalledWith('get', input.id)
    aircraftRepository.assertNotCalled('remove')
  })
})

