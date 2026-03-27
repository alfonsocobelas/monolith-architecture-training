import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection'

async function loadContainer(): Promise<ContainerBuilder> {
  const env = process.env.NODE_ENV || 'dev'
  const builder = new ContainerBuilder()
  const loader = new YamlFileLoader(builder)

  try {
    await loader.load(`${__dirname}/application-${env}.yaml`)
  } catch (error) {
    console.error(`Failed to load main configuration: ${error}`)
    throw error
  }

  return builder
}

export default loadContainer
