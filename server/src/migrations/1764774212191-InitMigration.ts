import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1764774212191 implements MigrationInterface {
    name = 'InitMigration1764774212191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`antecedente\` (\`idAntecedente\` int NOT NULL AUTO_INCREMENT, \`tipoAntecedente\` enum ('medico', 'familiar', 'psicologico', 'social') NOT NULL, \`descripcion\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`idHistoria\` int NULL, PRIMARY KEY (\`idAntecedente\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`historiaClinica\` (\`idHistoria\` int NOT NULL AUTO_INCREMENT, \`fechaCreacion\` date NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`idPaciente\` int NULL, UNIQUE INDEX \`REL_ef11f60c6ef681c40ca0d37343\` (\`idPaciente\`), PRIMARY KEY (\`idHistoria\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`intervencion\` (\`idIntervencion\` int NOT NULL AUTO_INCREMENT, \`tipoIntervencion\` varchar(100) NOT NULL, \`descripcion\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`idEvolucion\` int NULL, PRIMARY KEY (\`idIntervencion\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`MedicamentoRecetado\` (\`idMedicamentoRecetado\` int NOT NULL AUTO_INCREMENT, \`nombreMedicamento\` varchar(200) NOT NULL, \`dosis\` varchar(100) NOT NULL, \`frecuencia\` varchar(100) NOT NULL, \`duracion\` varchar(100) NOT NULL, \`fechaExpiracion\` date NOT NULL, \`estadoAutorizacion\` enum ('Aprobada', 'Pendiente', 'Rechazada') NOT NULL DEFAULT 'Pendiente', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`idEvolucion\` int NULL, PRIMARY KEY (\`idMedicamentoRecetado\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`evolucion\` (\`idEvolucion\` int NOT NULL AUTO_INCREMENT, \`fecha\` date NOT NULL, \`hora\` time NOT NULL, \`motivoConsulta\` text NOT NULL, \`observaciones\` text NULL, \`diagnostico\` text NOT NULL, \`planIntervencion\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`idHistoria\` int NULL, \`idProfesional\` int NULL, PRIMARY KEY (\`idEvolucion\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profesional\` (\`idProfesional\` int NOT NULL AUTO_INCREMENT, \`licencia\` varchar(100) NOT NULL, \`especialidad\` enum ('psicología', 'psiquiatría') NOT NULL DEFAULT 'psicología', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`idPersona\` int NULL, UNIQUE INDEX \`REL_db909a3ed74496c2e42a4e2daa\` (\`idPersona\`), PRIMARY KEY (\`idProfesional\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`persona\` (\`idPersona\` int NOT NULL AUTO_INCREMENT, \`nombres\` varchar(100) NOT NULL, \`apellidos\` varchar(100) NOT NULL, \`tipoDocumento\` varchar(20) NOT NULL, \`numeroDocumento\` varchar(50) NOT NULL, \`fechaNacimiento\` date NOT NULL, \`genero\` enum ('femenino', 'masculino', 'otro') NOT NULL DEFAULT 'otro', \`ciudadResidencia\` varchar(100) NOT NULL, \`celular\` varchar(20) NOT NULL, \`correo\` varchar(100) NOT NULL, \`eps\` varchar(100) NOT NULL, \`nombresContactoEmergencia\` varchar(100) NOT NULL, \`celularContactoEmergencia\` varchar(20) NOT NULL, \`contrasena\` varchar(100) NOT NULL, \`rol\` enum ('paciente', 'profesional', 'administrativo') NOT NULL DEFAULT 'paciente', \`estado\` enum ('activo', 'inactivo') NOT NULL DEFAULT 'activo', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_a654b50abe367d8728a709407e\` (\`numeroDocumento\`), UNIQUE INDEX \`IDX_6150bc0608b585b62f23c4dfd8\` (\`correo\`), PRIMARY KEY (\`idPersona\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`administrativo\` (\`idAdministrativo\` int NOT NULL AUTO_INCREMENT, \`cargo\` varchar(100) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`idPersona\` int NULL, UNIQUE INDEX \`REL_dfd0b8cec55a920c026453848c\` (\`idPersona\`), PRIMARY KEY (\`idAdministrativo\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Cita\` (\`idCita\` int NOT NULL AUTO_INCREMENT, \`estado\` enum ('Confirmada', 'Asistida', 'No asistida', 'Cancelada') NOT NULL DEFAULT 'Confirmada', \`fechaCita\` date NOT NULL, \`horaCita\` time NOT NULL, \`modalidad\` enum ('presencial', 'virtual') NOT NULL DEFAULT 'presencial', \`motivo\` varchar(255) NULL, \`consultorio\` varchar(100) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`idPaciente\` int NULL, \`idProfesional\` int NULL, \`idAdministrativo\` int NULL, PRIMARY KEY (\`idCita\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`antecedente\` ADD CONSTRAINT \`FK_8bba4b0a5c732804e6a452c6b3b\` FOREIGN KEY (\`idHistoria\`) REFERENCES \`historiaClinica\`(\`idHistoria\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`historiaClinica\` ADD CONSTRAINT \`FK_ef11f60c6ef681c40ca0d37343e\` FOREIGN KEY (\`idPaciente\`) REFERENCES \`persona\`(\`idPersona\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`intervencion\` ADD CONSTRAINT \`FK_2c161eb27f36761cbe3e2038205\` FOREIGN KEY (\`idEvolucion\`) REFERENCES \`evolucion\`(\`idEvolucion\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`MedicamentoRecetado\` ADD CONSTRAINT \`FK_f100cf2b400d8208f54f3ca3ed2\` FOREIGN KEY (\`idEvolucion\`) REFERENCES \`evolucion\`(\`idEvolucion\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`evolucion\` ADD CONSTRAINT \`FK_56d8a8eef1bab0bfd216bfe1f42\` FOREIGN KEY (\`idHistoria\`) REFERENCES \`historiaClinica\`(\`idHistoria\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`evolucion\` ADD CONSTRAINT \`FK_f3035207cd094e983e958d760db\` FOREIGN KEY (\`idProfesional\`) REFERENCES \`profesional\`(\`idProfesional\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profesional\` ADD CONSTRAINT \`FK_db909a3ed74496c2e42a4e2daa6\` FOREIGN KEY (\`idPersona\`) REFERENCES \`persona\`(\`idPersona\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`administrativo\` ADD CONSTRAINT \`FK_dfd0b8cec55a920c026453848ca\` FOREIGN KEY (\`idPersona\`) REFERENCES \`persona\`(\`idPersona\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Cita\` ADD CONSTRAINT \`FK_9fec48fbdf9c3fd426d2144c85d\` FOREIGN KEY (\`idPaciente\`) REFERENCES \`persona\`(\`idPersona\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Cita\` ADD CONSTRAINT \`FK_b792110fc73af4f7fe7888a60dc\` FOREIGN KEY (\`idProfesional\`) REFERENCES \`profesional\`(\`idProfesional\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Cita\` ADD CONSTRAINT \`FK_45476f07cd958c60624b9754b22\` FOREIGN KEY (\`idAdministrativo\`) REFERENCES \`administrativo\`(\`idAdministrativo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Cita\` DROP FOREIGN KEY \`FK_45476f07cd958c60624b9754b22\``);
        await queryRunner.query(`ALTER TABLE \`Cita\` DROP FOREIGN KEY \`FK_b792110fc73af4f7fe7888a60dc\``);
        await queryRunner.query(`ALTER TABLE \`Cita\` DROP FOREIGN KEY \`FK_9fec48fbdf9c3fd426d2144c85d\``);
        await queryRunner.query(`ALTER TABLE \`administrativo\` DROP FOREIGN KEY \`FK_dfd0b8cec55a920c026453848ca\``);
        await queryRunner.query(`ALTER TABLE \`profesional\` DROP FOREIGN KEY \`FK_db909a3ed74496c2e42a4e2daa6\``);
        await queryRunner.query(`ALTER TABLE \`evolucion\` DROP FOREIGN KEY \`FK_f3035207cd094e983e958d760db\``);
        await queryRunner.query(`ALTER TABLE \`evolucion\` DROP FOREIGN KEY \`FK_56d8a8eef1bab0bfd216bfe1f42\``);
        await queryRunner.query(`ALTER TABLE \`MedicamentoRecetado\` DROP FOREIGN KEY \`FK_f100cf2b400d8208f54f3ca3ed2\``);
        await queryRunner.query(`ALTER TABLE \`intervencion\` DROP FOREIGN KEY \`FK_2c161eb27f36761cbe3e2038205\``);
        await queryRunner.query(`ALTER TABLE \`historiaClinica\` DROP FOREIGN KEY \`FK_ef11f60c6ef681c40ca0d37343e\``);
        await queryRunner.query(`ALTER TABLE \`antecedente\` DROP FOREIGN KEY \`FK_8bba4b0a5c732804e6a452c6b3b\``);
        await queryRunner.query(`DROP TABLE \`Cita\``);
        await queryRunner.query(`DROP INDEX \`REL_dfd0b8cec55a920c026453848c\` ON \`administrativo\``);
        await queryRunner.query(`DROP TABLE \`administrativo\``);
        await queryRunner.query(`DROP INDEX \`IDX_6150bc0608b585b62f23c4dfd8\` ON \`persona\``);
        await queryRunner.query(`DROP INDEX \`IDX_a654b50abe367d8728a709407e\` ON \`persona\``);
        await queryRunner.query(`DROP TABLE \`persona\``);
        await queryRunner.query(`DROP INDEX \`REL_db909a3ed74496c2e42a4e2daa\` ON \`profesional\``);
        await queryRunner.query(`DROP TABLE \`profesional\``);
        await queryRunner.query(`DROP TABLE \`evolucion\``);
        await queryRunner.query(`DROP TABLE \`MedicamentoRecetado\``);
        await queryRunner.query(`DROP TABLE \`intervencion\``);
        await queryRunner.query(`DROP INDEX \`REL_ef11f60c6ef681c40ca0d37343\` ON \`historiaClinica\``);
        await queryRunner.query(`DROP TABLE \`historiaClinica\``);
        await queryRunner.query(`DROP TABLE \`antecedente\``);
    }

}
