import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1597830747220 implements MigrationInterface {
    name = 'Test1597830747220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_4a74ca47fe1aa34a28a6db3c72` ON `role`");
        await queryRunner.query("ALTER TABLE `access` CHANGE `module_id` `module_id` int NOT NULL COMMENT '父模块id' DEFAULT -1");
        await queryRunner.query("ALTER TABLE `access` CHANGE `sort` `sort` int NOT NULL COMMENT '排序' DEFAULT 1");
        await queryRunner.query("ALTER TABLE `access` CHANGE `is_del` `is_del` tinyint NOT NULL COMMENT '是否删除,1表示删除,0表示正常' DEFAULT 0");
        await queryRunner.query("ALTER TABLE `role` CHANGE `is_del` `is_del` tinyint NOT NULL COMMENT '是否删除,1表示删除,0表示正常' DEFAULT 0");
        await queryRunner.query("DROP INDEX `username_is_del` ON `admin_user`");
        await queryRunner.query("ALTER TABLE `admin_user` CHANGE `is_del` `is_del` tinyint NOT NULL COMMENT '是否删除,1表示删除,0表示正常' DEFAULT 0");
        await queryRunner.query("CREATE UNIQUE INDEX `username_is_del` ON `admin_user` (`username`, `is_del`)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `username_is_del` ON `admin_user`");
        await queryRunner.query("ALTER TABLE `admin_user` CHANGE `is_del` `is_del` tinyint NOT NULL COMMENT '是否删除,1表示删除,0表示正常' DEFAULT '0'");
        await queryRunner.query("CREATE UNIQUE INDEX `username_is_del` ON `admin_user` (`username`, `is_del`)");
        await queryRunner.query("ALTER TABLE `role` CHANGE `is_del` `is_del` tinyint NOT NULL COMMENT '是否删除,1表示删除,0表示正常' DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `access` CHANGE `is_del` `is_del` tinyint NOT NULL COMMENT '是否删除,1表示删除,0表示正常' DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `access` CHANGE `sort` `sort` int NOT NULL COMMENT '排序' DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `access` CHANGE `module_id` `module_id` int NOT NULL COMMENT '父模块id' DEFAULT '-1'");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_4a74ca47fe1aa34a28a6db3c72` ON `role` (`title`)");
    }

}
