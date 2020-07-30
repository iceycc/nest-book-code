import "reflect-metadata";
import { createConnection, Not, getConnection, getManager, getRepository } from "typeorm";
import { User } from "./entity/User";
import { UserExtend } from './entity/UserExtend';
import { Posts } from './entity/Posts';
import { Tags } from './entity/Tags';

createConnection().then(async connection => {
    // 1.使用connection创建
    // const user = await getConnection()
    //     .createQueryBuilder()
    //     .select(['user.id', 'user.username']) // 需要选择查询的字段,如果想要全部查询可以不加select
    //     .from(User, 'user') // 从哪张表,并且定义别名为user
    //     .where('(user.id=:id)', { id: 1 }) // 过滤条件
    //     .getOne(); // 查询一个
    // console.log(user);

    // 2.使用connection创建
    // const user = await getConnection()
    //     .createQueryBuilder(User, 'user')
    //     .select(['user.id', 'user.username'])
    //     .where('(user.id=:id)', { id: 1 })
    //     .getOne();
    // console.log(user);

    // // 3.使用entity manager创建
    // const user = await getManager()
    //     .createQueryBuilder(User, 'user')
    //     .select('user')
    //     .getMany();
    // console.log(user);

    // // 4.使用repository创建
    // const user = await getRepository(User)
    //     .createQueryBuilder('user')
    //     .getMany();
    // console.log(user);

    // 插入数据
    // const result = await getConnection()
    //     .createQueryBuilder()
    //     .insert() // 插入数据的时候要指明插入到那个实体类
    //     .into(User)
    //     .values([{ username: '张三', password: '1234' }, { username: '李四', password: '12345' }])
    //     .execute();
    // console.log(result);

    // 更新数据
    // const result = await getConnection()
    //     .createQueryBuilder()
    //     .update(User)
    //     .set({ username: '哈哈哈' })
    //     .where('id=:id', { id: 1 })
    //     .execute();
    // console.log(result);

    // // 删除数据
    // const result = await getConnection()
    //     .createQueryBuilder()
    //     .delete()
    //     .from(User)
    //     .where('id=:id', { id: 3 })
    //     .execute();
    // console.log(result);

    // 创建关系查询
    // const result = await getConnection()
    //     .createQueryBuilder(User, 'user')
    //     // 第一个参数是定义字段,第二个实体类,第三个是别名,第四个是条件
    //     .leftJoinAndMapMany('user.posts', Posts, 'posts', 'user.id=posts.userId')
    //     .getMany();
    // console.log(JSON.stringify(result));
    const result = await getConnection()
        .createQueryBuilder(User, 'user')
        .select('SUM(user.id)', 'sum')
        .getRawOne();
    console.log(result);

}).catch(error => console.log(error));
