import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1597816762114 implements MigrationInterface {
    name = 'Test1597816762114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `admin_user_role` (`id` int NOT NULL AUTO_INCREMENT COMMENT '主键id', `user_id` int NOT NULL COMMENT '用户id', `role_id` int NOT NULL COMMENT '角色id', PRIMARY KEY (`id`)) ENGINE=InnoDB");
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
        await queryRunner.query("DROP TABLE `admin_user_role`");
    }

}
