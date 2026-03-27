import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, Index, Check } from 'typeorm'
import { OperationRegion, FleetType, FleetStatus } from '../../domain/fleet-enums'
import { CompanyEntity } from 'src/modules/companies/infrastructure/typeorm/typeorm-company.entity'
import { FLEET_CONSTRAINTS as LIMITS } from '../../domain/fleet-constants'

@Entity('fleets')
@Check(`char_length("name") >= ${LIMITS.NAME.MIN_LENGTH} AND char_length("name") <= ${LIMITS.NAME.MAX_LENGTH}`)
@Index('IDX_FLEET_NAME', ['name'], { unique: true })

export class FleetEntity {
  @PrimaryColumn('uuid')
    id!: string

  @Column('uuid', { array: true })
    aircraftIds!: string[]

  @Column('uuid')
    companyId!: string

  @Column('varchar', { length: LIMITS.NAME.MAX_LENGTH, unique: true })
    name!: string

  @Column('enum', { enum: OperationRegion })
    operationRegion!: OperationRegion

  @Column('enum', { enum: FleetType })
    type!: FleetType

  @Column('float')
    maintenanceBudget!: number

  @Column('enum', { enum: FleetStatus })
    status!: FleetStatus

  // --- AUDIT FIELDS --- //
  @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date

  // --- JOINS RELATIONS --- //
  @ManyToOne(() => CompanyEntity)
  @JoinColumn({ name: 'companyId' })
    company!: CompanyEntity
}
