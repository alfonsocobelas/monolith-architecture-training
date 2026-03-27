import { GetEngineUseCase } from 'src/modules/engines/application/find/get-engine-usecase.service'
import { GetEngineInputMother } from './get-engine-input.mother'
import { GetEngineOutputMother } from './get-engine-output.mother'
import { EngineRepositoryMock } from '../../mocks/engine.repository.mock'
import { EngineMother } from '../../domain/engine.mother'

describe('GetEngineUseCase (unit tests)', () => {
  let repository: EngineRepositoryMock
  let useCase: GetEngineUseCase

  beforeEach(() => {
    repository = new EngineRepositoryMock()
    useCase = new GetEngineUseCase(repository)
  })

  it('should get an existing engine by id', async () => {
    // GIVEN
    const input = GetEngineInputMother.random()
    const expectedEngine = EngineMother.fromInput(input)
    const expectedOutput = GetEngineOutputMother.fromDomain(expectedEngine)
    repository.givenFound(expectedEngine)

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    expect(result).toEqual(expectedOutput)
    repository.assertCalledWith('get', input.id)
  })

  it('should throw EntityNotFoundError if engine does not exist', async () => {
    // GIVEN
    const input = GetEngineInputMother.random()
    repository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Engine with id "${input.id}" not found.`)
    repository.assertCalledWith('get', input.id)
  })
})
