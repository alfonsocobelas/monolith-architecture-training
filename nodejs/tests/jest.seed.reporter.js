/* eslint-disable no-undef */
class JestSeedReporter {
  onRunComplete(contexts, results) {
    const failed = results.numFailedTests > 0 || results.numFailedTestSuites > 0
    const context = process.env.JEST_ENV
    const seed = process.env.JEST_MASTER_SEED

    if (failed) {
      console.warn(`\n[JEST SEED REPORTER] 🎲 Seed used for reproducibility  (${context}): ${seed}\n`)
    }
  }
}

module.exports = JestSeedReporter
