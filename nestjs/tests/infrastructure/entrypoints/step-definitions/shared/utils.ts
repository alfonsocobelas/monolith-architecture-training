/* eslint-disable @typescript-eslint/no-explicit-any */
export function parseDataTableRows(dataTable: any): any[] {
  return dataTable.hashes().map((row: any) => {
    const processedRow = { ...row }

    for (const key in processedRow) {
      if (typeof processedRow[key] === 'string') {
        if (processedRow[key] === 'null') {
          processedRow[key] = null
        } else if (processedRow[key] === '[]') {
          processedRow[key] = []
        } else if (processedRow[key].startsWith('[')) {
          processedRow[key] = JSON.parse(processedRow[key])
        }
      }
      if (
        processedRow[key] !== null &&
        !Array.isArray(processedRow[key]) &&
        !isNaN(processedRow[key]) &&
        processedRow[key] !== ''
      ) {
        processedRow[key] = Number(processedRow[key])
      }
    }

    return processedRow
  })
}
