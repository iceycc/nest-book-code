import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1597882027719 implements MigrationInterface {
    name = 'Test1597882027719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `role_access` (`id` int NOT NULL AUTO_INCREMENT COMMENT '主键id', `role_id` int NULL COMMENT '角色id', `access_id` int NULL COMMENT '资源id', `type` varchar(10) NULL COMMENT '类型,type=1表示菜单,type=2表示接口', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `access` CHANGE `module_id` `module_id` int NOT NULL COMMENT '父模块id' DEFAULT -1");
        await queryRunner.query("ALTER TABLE `access` CHANGE `sort` `sort` int NOT NULL COMMENT '排序' DEFAULT 1");
        await queryRunner.query("ALTER TABLE `access` CHANGE `status` `status` tinyint NULL COMMENT '状态,1表示正常,0表示禁用' DEFAULT 1");
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
        await queryRunner.query("ALTER TABLE `access` CHANGE `status` `status` tinyint NULL COMMENT '状态,1表示正常,0表示禁用' DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `access` CHANGE `sort` `sort` int NOT NULL COMMENT '排序' DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `access` CHANGE `module_id` `module_id` int NOT NULL COMMENT '父模块id' DEFAULT '-1'");
        await queryRunner.query("DROP TABLE `role_access`");
    }

}
