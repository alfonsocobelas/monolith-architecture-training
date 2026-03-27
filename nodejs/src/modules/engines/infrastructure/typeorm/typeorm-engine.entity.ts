import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Check, Index } from 'typeorm'
import { AircraftEntity } from '../../../aircrafts/infrastructure/typeorm/typeorm-aircraft.entity'
import { EngineStatus } from '../../domain/engine-enums'
import { ENGINE_CONSTRAINTS as LIMITS } from '../../domain/engine-constants'

@Entity('engines')
@Check(`"healthScore" >= ${LIMITS.HEALTH_SCORE.MIN} AND "healthScore" <= ${LIMITS.HEALTH_SCORE.MAX}`)
@Check(`char_length("serialNumber") >= ${LIMITS.SERIAL_NUMBER.MIN_LENGTH} AND char_length("serialNumber") <= ${LIMITS.SERIAL_NUMBER.MAX_LENGTH}`)
@Index('IDX_ENGINE_SERIAL_NUMBER', ['serialNumber'], { unique: true })

export class EngineEntity {
  @PrimaryColumn('uuid')
    id!: string

  @Column('varchar', { length: 50, unique: true })
    serialNumber!: string

  @Column('float')
    healthScore!: number

  @Column('float')
    flyingHoursAccumulated!: number

  @Column('int')
    cyclesSinceLastOverhaul!: number

  @Column('enum', { enum: EngineStatus })
    status!: EngineStatus

  @Column('boolean')
    isInstalled!: boolean

  @Column('uuid', { nullable: true })
    aircraftId!: string | null

  // --- AUDIT FIELDS --- //
  @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date

  // --- JOINS RELATIONS --- //
  @ManyToOne(() => AircraftEntity, aircraft => aircraft.engines)
  @JoinColumn({ name: 'aircraftId' })
    aircraft?: AircraftEntity
}
