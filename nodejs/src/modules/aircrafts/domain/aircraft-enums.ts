export enum AircraftStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  RETIRED = 'RETIRED', // retiro permanente planificado (	Fin de vida útil )
  STORED = 'STORED', // retiro temporal
  WRITTEN_OFF = 'WRITTEN_OFF', // pérdida total o retiro forzoso
  SCRAPPED = 'SCRAPPED' // desguace o reciclaje
}
