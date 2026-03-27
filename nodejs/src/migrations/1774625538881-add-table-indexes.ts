import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTableIndexes1774625538881 implements MigrationInterface {
  name = 'AddTableIndexes1774625538881'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_ENGINE_SERIAL_NUMBER" ON "engines" ("serialNumber") ')
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_COMPANY_NAME" ON "companies" ("name") ')
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_FLEET_NAME" ON "fleets" ("name") ')
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_AIRCRAFT_MODEL_CODE" ON "aircraft_models" ("code") ')
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_AIRCRAFT_TAIL_NUMBER" ON "aircrafts" ("tailNumber") ')
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_ISSUE_CODE" ON "issues" ("code") ')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "public"."IDX_ISSUE_CODE"')
    await queryRunner.query('DROP INDEX "public"."IDX_AIRCRAFT_TAIL_NUMBER"')
    await queryRunner.query('DROP INDEX "public"."IDX_AIRCRAFT_MODEL_CODE"')
    await queryRunner.query('DROP INDEX "public"."IDX_FLEET_NAME"')
    await queryRunner.query('DROP INDEX "public"."IDX_COMPANY_NAME"')
    await queryRunner.query('DROP INDEX "public"."IDX_ENGINE_SERIAL_NUMBER"')
  }
}
