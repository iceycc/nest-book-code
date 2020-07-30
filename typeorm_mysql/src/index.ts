import "reflect-metadata";
import { createConnection, Not } from "typeorm";
import { User } from "./entity/User";
import { UserExtend } from './entity/UserExtend';
import { Posts } from './entity/Posts';
import { Tags } from './entity/Tags';

createConnection().then(async connection => {
    // 1.查询全部的字段
    // const userRepository = connection.getRepository(User);
    // const result = await userRepository.find();
    // console.log(result);

    // 2.使用select选择性的查询字段
    // const userRepository = connection.getRepository(User);
    // const result = await userRepository.find({ select: ['id', 'username'] });
    // console.log(result);

    // 3.使用where条件查询
    // const userRepository = connection.getRepository(User);
    // const result = await userRepository.find({ where: { id: 1 } });
    // console.log(result);

    // 4.使用where..and查询
    // const userRepository = connection.getRepository(User);
    // const result = await userRepository.find({ where: { id: 1, username: 'xx' } });
    // console.log(result);

    // 5.使用where..or查询数据
    // const userRepository = connection.getRepository(User);
    // const result = await userRepository.find({ where: [{ id: 1 }, { username: 'xx' }] });
    // console.log(result);

    // 6.relations关系查询
    // const userRepository = connection.getRepository(User);
    // const result = await userRepository.find({ relations: ['userDetail'] });
    // console.log(result);

    // 7.使用join
    // const userRepository = connection.getRepository(User);
    // const result = await userRepository.find({
    //     join: {
    //         alias: 'user',
    //         leftJoinAndSelect: {
    //             detail: 'user.userDetail',
    //             posts: 'user.posts'
    //         }
    //     }
    // });
    // console.log(JSON.stringify(result));

    // 8.排序
    // const userRepository = connection.getRepository(User);
    // const result = await userRepository.find({
    //     order: {
    //         id: 'DESC',
    //         username: 'ASC'
    //     }
    // });
    // console.log(result);

    // // 9.分页查询
    // const userRepository = connection.getRepository(User);
    // const result = await userRepository.find({
    //     skip: 0,
    //     take: 10,
    // })
    // console.log(result);

    // 10.Not
    const userRepository = connection.getRepository(User);
    const result = await userRepository.find({
        username: Not('王五')
    });
    console.log(result);

}).catch(error => console.log(error));
