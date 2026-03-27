import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, Check, Index } from 'typeorm'
import { AircraftEntity } from 'src/modules/aircrafts/infrastructure/typeorm/typeorm-aircraft.entity'
import { EngineEntity } from 'src/modules/engines/infrastructure/typeorm/typeorm-engine.entity'
import { IssuePartCategory, IssueSeverityLevel } from '../../domain/issue-enums'
import { ISSUE_CONSTRAINTS as LIMITS } from '../../domain/issue-constants'

@Entity('issues')
@Check(`char_length("code") >= ${LIMITS.CODE.MIN_LENGTH} AND char_length("code") <= ${LIMITS.CODE.MAX_LENGTH}`)
@Check(`char_length("description") >= ${LIMITS.DESCRIPTION.MIN_LENGTH} AND char_length("description") <= ${LIMITS.DESCRIPTION.MAX_LENGTH}`)
@Index('IDX_ISSUE_CODE', ['code'], { unique: true })

export class IssueEntity {
  @PrimaryColumn('uuid')
    id!: string

  @Column('varchar', { unique: true, length: LIMITS.CODE.MAX_LENGTH })
    code!: string

  @Column('uuid', { nullable: true })
    aircraftId!: string | null

  @Column('uuid', { nullable: true })
    engineId!: string | null

  @Column('varchar', { length: LIMITS.DESCRIPTION.MAX_LENGTH })
    description!: string

  @Column({ type: 'enum', enum: IssueSeverityLevel })
    severity!: IssueSeverityLevel

  @Column({ type: 'boolean', default: false })
    requiresGrounding!: boolean

  @Column({ type: 'enum', enum: IssuePartCategory })
    partCategory!: IssuePartCategory

  // --- AUDIT FIELDS --- //
  @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date

  // --- JOINS RELATIONS --- //
  @ManyToOne(() => AircraftEntity, { nullable: true })
  @JoinColumn({ name: 'aircraftId' })
    aircraft?: AircraftEntity

  @ManyToOne(() => EngineEntity, { nullable: true })
  @JoinColumn({ name: 'engineId' })
    engine?: EngineEntity
}
