import { MigrationInterface, QueryRunner } from 'typeorm'

export class V1FirstMigration1773931238953 implements MigrationInterface {
  name = 'V1FirstMigration1773931238953'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TYPE "public"."engines_status_enum" AS ENUM(\'OPERATIONAL\', \'MAINTENANCE\')')
    await queryRunner.query(
      'CREATE TABLE "engines" ("id" uuid NOT NULL, "serialNumber" character varying(50) NOT NULL, "healthScore" double precision NOT NULL, "flyingHoursAccumulated" double precision NOT NULL, "cyclesSinceLastOverhaul" integer NOT NULL, "status" "public"."engines_status_enum" NOT NULL, "isInstalled" boolean NOT NULL, "aircraftId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_56c82092607a87c8a8b58057465" UNIQUE ("serialNumber"), CONSTRAINT "CHK_4967ea7e7f1c65d455bfd2a658" CHECK (char_length("serialNumber") >= 2 AND char_length("serialNumber") <= 50), CONSTRAINT "CHK_f5f9a5392074064da296ed5591" CHECK ("healthScore" >= 60 AND "healthScore" <= 100), CONSTRAINT "PK_983c05bf61572322f7fedb7633c" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "companies" ("id" uuid NOT NULL, "name" character varying(100) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_3dacbb3eb4f095e29372ff8e131" UNIQUE ("name"), CONSTRAINT "CHK_558a4ea7f112c7b0f7a1b4d9af" CHECK (char_length("name") >= 2 AND char_length("name") <= 100), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))'
    )
    await queryRunner.query("CREATE TYPE \"public\".\"fleets_operationregion_enum\" AS ENUM('AMER', 'EMEA', 'APAC')")
    await queryRunner.query(
      "CREATE TYPE \"public\".\"fleets_type_enum\" AS ENUM('CARGO', 'PASSENGER', 'MILITARY', 'PRIVATE', 'SPECIALIZED')"
    )
    await queryRunner.query(
      "CREATE TYPE \"public\".\"fleets_status_enum\" AS ENUM('DRAFT', 'OPERATIVE', 'RETIRED', 'SCRAPPED')"
    )
    await queryRunner.query(
      'CREATE TABLE "fleets" ("id" uuid NOT NULL, "aircraftIds" uuid array NOT NULL, "companyId" uuid NOT NULL, "name" character varying(100) NOT NULL, "operationRegion" "public"."fleets_operationregion_enum" NOT NULL, "type" "public"."fleets_type_enum" NOT NULL, "maintenanceBudget" double precision NOT NULL, "status" "public"."fleets_status_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_fdcdafb112075c2916d766f0de8" UNIQUE ("name"), CONSTRAINT "PK_18a71e919faac62c1da6b5f8754" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      "CREATE TYPE \"public\".\"aircraft_models_status_enum\" AS ENUM('DRAFT', 'WITHDRAW', 'OPERATIONAL', 'DECOMMISSIONED')"
    )
    await queryRunner.query(
      'CREATE TABLE "aircraft_models" ("id" uuid NOT NULL, "name" character varying(30) NOT NULL, "code" character varying(10) NOT NULL, "manufacturer" character varying(20) NOT NULL, "passengerCapacity" integer NOT NULL, "numEngines" integer NOT NULL, "status" "public"."aircraft_models_status_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_89570632115e51ceb3faaddfb1b" UNIQUE ("code"), CONSTRAINT "CHK_258b687e16130010acfc3d83db" CHECK ("numEngines" >= 1 AND "numEngines" <= 6), CONSTRAINT "CHK_1f831a04b6cb810125b7495c9e" CHECK ("passengerCapacity" >= 1 AND "passengerCapacity" <= 400), CONSTRAINT "CHK_b092b595d7d5cac186d0a9d39d" CHECK ("manufacturer" IS NOT NULL AND LENGTH("manufacturer") >= 2 AND LENGTH("manufacturer") <= 20), CONSTRAINT "CHK_7b7c1807ce8590d6a4448cca8a" CHECK ("code" IS NOT NULL AND LENGTH("code") >= 2 AND LENGTH("code") <= 10), CONSTRAINT "CHK_1db376fc06a3ead6f72bd36ff8" CHECK ("name" IS NOT NULL AND LENGTH("name") >= 2 AND LENGTH("name") <= 30), CONSTRAINT "PK_53c80d0e1bf02630aec8beb644d" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      "CREATE TYPE \"public\".\"aircrafts_status_enum\" AS ENUM('DRAFT', 'ACTIVE', 'MAINTENANCE', 'RETIRED', 'STORED', 'WRITTEN_OFF', 'SCRAPPED')"
    )
    await queryRunner.query(
      'CREATE TABLE "aircrafts" ("id" uuid NOT NULL, "fleetId" uuid, "modelId" uuid NOT NULL, "engineIds" uuid array NOT NULL, "tailNumber" character varying(20) NOT NULL, "totalFlightHours" double precision NOT NULL, "fuelLevelPercentage" integer NOT NULL, "isActive" boolean NOT NULL, "status" "public"."aircrafts_status_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_65f5b31c1a44d4f86a24caeb1c8" UNIQUE ("tailNumber"), CONSTRAINT "CHK_26c710b269e07ee2e447922f67" CHECK (char_length("tailNumber") >= 5 AND char_length("tailNumber") <= 20), CONSTRAINT "CHK_c6d78e31376e6a3675e673232e" CHECK ("fuelLevelPercentage" >= 0 AND "fuelLevelPercentage" <= 100), CONSTRAINT "CHK_e5bcced1861db937b1de0e2bee" CHECK ("totalFlightHours" >= 0 AND "totalFlightHours" <= 100000), CONSTRAINT "PK_7da518226f0426668b00b2eade3" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      "CREATE TYPE \"public\".\"issues_severity_enum\" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')"
    )
    await queryRunner.query(
      "CREATE TYPE \"public\".\"issues_partcategory_enum\" AS ENUM('ENGINE', 'FUSELAGE', 'AVIONICS')"
    )
    await queryRunner.query(
      'CREATE TABLE "issues" ("id" uuid NOT NULL, "code" character varying(20) NOT NULL, "aircraftId" uuid, "engineId" uuid, "description" character varying(500) NOT NULL, "severity" "public"."issues_severity_enum" NOT NULL, "requiresGrounding" boolean NOT NULL DEFAULT false, "partCategory" "public"."issues_partcategory_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_5be3a6bb806b982704cb1adffd6" UNIQUE ("code"), CONSTRAINT "CHK_eb3d9d63ffd35e0d63a3d35e66" CHECK (char_length("description") >= 2 AND char_length("description") <= 500), CONSTRAINT "CHK_0599ce5bc5182d169b274eb13d" CHECK (char_length("code") >= 2 AND char_length("code") <= 20), CONSTRAINT "PK_9d8ecbbeff46229c700f0449257" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'ALTER TABLE "engines" ADD CONSTRAINT "FK_4bff46830e20a5d185b074c3742" FOREIGN KEY ("aircraftId") REFERENCES "aircrafts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "fleets" ADD CONSTRAINT "FK_ccd66320317fcdded55b1e73b56" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "aircrafts" ADD CONSTRAINT "FK_ec1bd4474866988540f4bc7fdb0" FOREIGN KEY ("modelId") REFERENCES "aircraft_models"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "aircrafts" ADD CONSTRAINT "FK_1e4e2025dd5256544f37117bea2" FOREIGN KEY ("fleetId") REFERENCES "fleets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "issues" ADD CONSTRAINT "FK_bea8e1814ec8020f21a646497a8" FOREIGN KEY ("aircraftId") REFERENCES "aircrafts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "issues" ADD CONSTRAINT "FK_303ca0887939207bb454ea70c6a" FOREIGN KEY ("engineId") REFERENCES "engines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "issues" DROP CONSTRAINT "FK_303ca0887939207bb454ea70c6a"')
    await queryRunner.query('ALTER TABLE "issues" DROP CONSTRAINT "FK_bea8e1814ec8020f21a646497a8"')
    await queryRunner.query('ALTER TABLE "aircrafts" DROP CONSTRAINT "FK_1e4e2025dd5256544f37117bea2"')
    await queryRunner.query('ALTER TABLE "aircrafts" DROP CONSTRAINT "FK_ec1bd4474866988540f4bc7fdb0"')
    await queryRunner.query('ALTER TABLE "fleets" DROP CONSTRAINT "FK_ccd66320317fcdded55b1e73b56"')
    await queryRunner.query('ALTER TABLE "engines" DROP CONSTRAINT "FK_4bff46830e20a5d185b074c3742"')
    await queryRunner.query('DROP TABLE "issues"')
    await queryRunner.query('DROP TYPE "public"."issues_partcategory_enum"')
    await queryRunner.query('DROP TYPE "public"."issues_severity_enum"')
    await queryRunner.query('DROP TABLE "aircrafts"')
    await queryRunner.query('DROP TYPE "public"."aircrafts_status_enum"')
    await queryRunner.query('DROP TABLE "aircraft_models"')
    await queryRunner.query('DROP TYPE "public"."aircraft_models_status_enum"')
    await queryRunner.query('DROP TABLE "fleets"')
    await queryRunner.query('DROP TYPE "public"."fleets_status_enum"')
    await queryRunner.query('DROP TYPE "public"."fleets_type_enum"')
    await queryRunner.query('DROP TYPE "public"."fleets_operationregion_enum"')
    await queryRunner.query('DROP TABLE "companies"')
    await queryRunner.query('DROP TABLE "engines"')
    await queryRunner.query('DROP TYPE "public"."engines_status_enum"')
  }
}
