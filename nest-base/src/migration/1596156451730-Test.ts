import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1596156451730 implements MigrationInterface {
    name = 'Test1596156451730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `is_del` tinyint NOT NULL COMMENT '是否删除,1表示删除,0表示正常' DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `is_del`");
    }

}
