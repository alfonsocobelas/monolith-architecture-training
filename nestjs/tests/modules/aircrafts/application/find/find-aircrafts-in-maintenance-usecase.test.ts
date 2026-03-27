import { FindAircraftsInMaintenanceUseCase } from 'src/modules/aircrafts/application/find/find-aircrafts-in-maintenance-usecase.service'
import { AircraftsInMaintenanceSpecification } from 'src/modules/aircrafts/domain/specifications/aircrafts-in-maintenance.specification'
import { FindAircraftsInMaintenanceOutput } from 'src/modules/aircrafts/application/find/find-aircrafts-in-maintenance-output.dto'
import { FindAircraftsInMaintenanceOutputMother } from './find-aircrafts-in-maintenance-output.mother'
import { Aircraft } from 'src/modules/aircrafts/domain/aircraft'
import { AircraftMother } from '../../domain/aircraft.mother'
import { AircraftRepositoryMock } from '../../mocks/aircraft.repository.mock'

describe('FindAircraftsInMaintenanceUseCase', () => {
  let repository: AircraftRepositoryMock
  let useCase: FindAircraftsInMaintenanceUseCase

  beforeEach(() => {
    repository = new AircraftRepositoryMock()
    useCase = new FindAircraftsInMaintenanceUseCase(repository)
  })

  it('should return a list of aircrafts in maintenance', async () => {
    // GIVEN
    const aircraftsInMaintenance = [AircraftMother.inMaintenance(), AircraftMother.inMaintenance()]
    const expectedOutput = FindAircraftsInMaintenanceOutputMother.fromDomainList(aircraftsInMaintenance)
    repository.givenMatching(aircraftsInMaintenance)

    // WHEN
    const result = await useCase.invoke()

    // THEN
    expect(result).toEqual(expectedOutput)
    repository.assertCalledWith('matching', expect.any(AircraftsInMaintenanceSpecification))
  })

  it('should return an empty list if no aircrafts are in maintenance', async () => {
    // GIVEN
    const emptyAircraftsInMaintenance: Aircraft[] = []
    const expectedOutput: FindAircraftsInMaintenanceOutput[] = []
    repository.givenMatching(emptyAircraftsInMaintenance)

    // WHEN
    const result = await useCase.invoke()

    // THEN
    expect(result).toEqual(expectedOutput)
    repository.assertCalledWith('matching', expect.any(AircraftsInMaintenanceSpecification))
  })
})
