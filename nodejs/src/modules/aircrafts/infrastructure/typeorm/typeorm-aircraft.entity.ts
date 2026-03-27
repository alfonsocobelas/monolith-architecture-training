import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Check
} from 'typeorm'
import { EngineEntity } from 'src/modules/engines/infrastructure/typeorm/typeorm-engine.entity'
import { FleetEntity } from 'src/modules/fleets/infrastructure/typeorm/typeorm-fleet.entity'
import { AircraftModelEntity } from 'src/modules/aircraft-models/infrastructure/typeorm/typeorm-aircraft-model.entity'
import { AircraftStatus } from '../../domain/aircraft-enums'
import { AIRCRAFT_CONSTRAINTS as LIMITS } from '../../domain/aircraft-constants'

@Entity('aircrafts')
@Check(`"totalFlightHours" >= ${LIMITS.FLIGHT_HOURS.MIN} AND "totalFlightHours" <= ${LIMITS.FLIGHT_HOURS.MAX}`)
@Check(`"fuelLevelPercentage" >= ${LIMITS.FUEL_LEVEL.MIN} AND "fuelLevelPercentage" <= ${LIMITS.FUEL_LEVEL.MAX}`)
@Check(
  `char_length("tailNumber") >= ${LIMITS.TAIL_NUMBER.MIN_LENGTH} AND char_length("tailNumber") <= ${LIMITS.TAIL_NUMBER.MAX_LENGTH}`
)
export class AircraftEntity {
  @PrimaryColumn('uuid')
    id!: string

  @Column('uuid', { nullable: true })
    fleetId!: string | null

  @Column('uuid')
    modelId!: string

  @Column('uuid', { array: true })
    engineIds!: string[]

  @Column('varchar', { length: LIMITS.TAIL_NUMBER.MAX_LENGTH, unique: true })
    tailNumber!: string

  @Column('float')
    totalFlightHours!: number

  @Column('int')
    fuelLevelPercentage!: number

  @Column('bool')
    isActive!: boolean

  @Column('enum', { enum: AircraftStatus })
    status!: AircraftStatus

  // --- AUDIT FIELDS --- //
  @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date

  // --- JOINS RELATIONS --- //
  @ManyToOne(() => AircraftModelEntity)
  @JoinColumn({ name: 'modelId' })
    model!: AircraftModelEntity

  @OneToMany(() => EngineEntity, engine => engine.aircraft)
    engines!: EngineEntity[]

  @ManyToOne(() => FleetEntity)
  @JoinColumn({ name: 'fleetId' })
    fleet!: FleetEntity
}
