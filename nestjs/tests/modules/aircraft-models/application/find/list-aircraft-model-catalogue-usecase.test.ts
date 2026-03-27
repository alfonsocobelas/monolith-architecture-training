import { ListAircraftModelCatalogueUseCase } from 'src/modules/aircraft-models/application/find/list-aircraft-model-catalogue-usecase.service'
import { ListAircraftModelCatalogueOutputMother } from './list-aircraft-model-catalogue-output.mother'
import { AircraftModelRepositoryMock } from '../../mocks/aircraft-model.repository.mock'
import { AircraftModelMother } from '../../domain/aircraft-model.mother'

describe('ListAircraftModelCatalogueUseCase', () => {
  let repository: AircraftModelRepositoryMock
  let useCase: ListAircraftModelCatalogueUseCase

  beforeEach(() => {
    repository = new AircraftModelRepositoryMock()
    useCase = new ListAircraftModelCatalogueUseCase(repository)
  })

  it('should list all aircraft models in the catalogue', async () => {
    // GIVEN
    const expectedModels = [AircraftModelMother.random(), AircraftModelMother.random()]
    const expectedOutput = expectedModels.map(ListAircraftModelCatalogueOutputMother.fromDomain)
    repository.givenCatalogue(expectedModels)

    // WHEN
    const result = await useCase.invoke()

    // THEN
    expect(result).toEqual(expectedOutput)
    repository.assertCalled('listCatalogue')
  })

  it('should return an empty array if there are no aircraft models in the catalogue', async () => {
    // GIVEN
    repository.givenCatalogue([])

    // WHEN
    const result = await useCase.invoke()

    // THEN
    expect(result).toEqual([])
    repository.assertCalled('listCatalogue')
  })
})
