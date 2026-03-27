import RemoveAircraftModelUseCase from 'src/modules/aircraft-models/application/delete/remove-aircraft-model-usecase.service'
import { AircraftsOfModelSpecification } from 'src/modules/aircrafts/domain/specifications/aircrafts-of-model.specification'
import { RemoveAircraftModelInputMother } from './remove-aircraft-model-input.mother'
import { AircraftModelMother } from '../../domain/aircraft-model.mother'
import { AircraftRepositoryMock } from '../../../aircrafts/mocks/aircraft.repository.mock'
import { AircraftModelRepositoryMock } from '../../mocks/aircraft-model.repository.mock'

const ZERO_AIRCRAFTS_COUNT = 0

describe('RemoveAircraftModelUseCase (unit tests)', () => {
  let modelRepository: AircraftModelRepositoryMock
  let aircraftRespository: AircraftRepositoryMock
  let useCase: RemoveAircraftModelUseCase

  beforeEach(() => {
    modelRepository = new AircraftModelRepositoryMock()
    aircraftRespository = new AircraftRepositoryMock()
    useCase = new RemoveAircraftModelUseCase(modelRepository, aircraftRespository)
  })

  it('should delete an existing aircraft model by code', async () => {
    // GIVEN
    const input = RemoveAircraftModelInputMother.random()
    const expectedModel = AircraftModelMother.fromInput(input)
    const aircraftCount = ZERO_AIRCRAFTS_COUNT
    modelRepository.givenFound(expectedModel)
    aircraftRespository.givenCount(aircraftCount)

    // WHEN
    await useCase.invoke(input)

    // THEN
    aircraftRespository.assertCalledWith('count', expect.any(AircraftsOfModelSpecification))
    modelRepository.assertCalledWith('remove', expectedModel.id)
  })

  it('should throw EntityNotFoundError if model does not exist', async () => {
    // GIVEN
    const input = RemoveAircraftModelInputMother.random()
    modelRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`AircraftModel with id "${input.id}" not found.`)
    modelRepository.assertCalledWith('get', input.id)
    aircraftRespository.assertCalledWith('count', expect.any(AircraftsOfModelSpecification))
    modelRepository.assertNotCalled('remove')
  })
})
