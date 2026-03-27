import { GlobalSeed } from './global-seed'

export default async () => {
  const seedManager = GlobalSeed.getInstance()
  const masterSeed = seedManager.getMasterSeed()
  process.env.JEST_MASTER_SEED = String(masterSeed)
}
