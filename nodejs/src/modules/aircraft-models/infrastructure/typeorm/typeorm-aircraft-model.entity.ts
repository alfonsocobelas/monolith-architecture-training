import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Check } from 'typeorm'
import { AircraftModelStatus } from '../../domain/aircraft-model-enums'
import { AIRCRAFT_MODEL_CONSTRAINTS as LIMITS } from '../../domain/aircraft-model-constants'

@Entity('aircraft_models')
@Check(
  `"name" IS NOT NULL AND LENGTH("name") >= ${LIMITS.NAME.MIN_LENGTH} AND LENGTH("name") <= ${LIMITS.NAME.MAX_LENGTH}`
)
@Check(
  `"code" IS NOT NULL AND LENGTH("code") >= ${LIMITS.CODE.MIN_LENGTH} AND LENGTH("code") <= ${LIMITS.CODE.MAX_LENGTH}`
)
@Check(
  `"manufacturer" IS NOT NULL AND LENGTH("manufacturer") >= ${LIMITS.MANUFACTURER.MIN_LENGTH} AND LENGTH("manufacturer") <= ${LIMITS.MANUFACTURER.MAX_LENGTH}`
)
@Check(`"passengerCapacity" >= ${LIMITS.PASSENGERS.MIN} AND "passengerCapacity" <= ${LIMITS.PASSENGERS.MAX}`)
@Check(`"numEngines" >= ${LIMITS.ENGINES.MIN} AND "numEngines" <= ${LIMITS.ENGINES.MAX}`)
export class AircraftModelEntity {
  @PrimaryColumn('uuid')
    id!: string

  @Column('varchar', { length: LIMITS.NAME.MAX_LENGTH })
    name!: string

  @Column('varchar', { length: LIMITS.CODE.MAX_LENGTH, unique: true })
    code!: string

  @Column('varchar', { length: LIMITS.MANUFACTURER.MAX_LENGTH })
    manufacturer!: string

  @Column('int')
    passengerCapacity!: number

  @Column('int')
    numEngines!: number

  @Column('enum', { enum: AircraftModelStatus })
    status!: AircraftModelStatus

  @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date
}
