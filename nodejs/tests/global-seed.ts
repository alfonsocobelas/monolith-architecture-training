import { createHash } from 'crypto'

export class GlobalSeed {
  private static instance: GlobalSeed
  private masterSeed: number

  private constructor() {
    const context = process.env.JEST_ENV

    if (context === 'integration') {
      this.masterSeed = 12345
    } else {
      this.masterSeed = process.env.JEST_SEED ? Number(process.env.JEST_SEED) : Date.now()
    }
  }

  static getInstance(): GlobalSeed {
    if (!GlobalSeed.instance) {
      GlobalSeed.instance = new GlobalSeed()
    }
    return GlobalSeed.instance
  }

  getMasterSeed(): number {
    return this.masterSeed
  }

  getReseed(testName: string): number {
    const hash = createHash('sha256').update(testName).digest('hex')
    return this.masterSeed + parseInt(hash.substring(0, 8), 16)
  }
}
