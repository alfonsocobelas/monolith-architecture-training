import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Check, Index } from 'typeorm'
import { COMPANY_CONSTRAINTS as LIMITS } from '../../domain/company-constants'

@Entity('companies')
@Check(`char_length("name") >= ${LIMITS.NAME.MIN_LENGTH} AND char_length("name") <= ${LIMITS.NAME.MAX_LENGTH}`)
@Index('IDX_COMPANY_NAME', ['name'], { unique: true })

export class CompanyEntity {
  @PrimaryColumn('uuid')
    id!: string

  @Column('varchar', { length: LIMITS.NAME.MAX_LENGTH, unique: true })
    name!: string

  // --- AUDIT FIELDS --- //
  @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date
}
