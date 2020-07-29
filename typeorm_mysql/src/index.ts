import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";

createConnection().then(async connection => {
    // 1.新增数据
    // const user = new User()
    // user.username = '张三';
    // user.password = '123456';
    // // save里面传递一个对象
    // connection.manager.save(user).then(user => {
    //     console.log('插入成功', user);
    // });

    // 2.使用async+await
    // const user = new User();
    // user.username = '李四';
    // user.password = '123456';
    // const result = await connection.manager.save(user);
    // console.log('插入结果', result);

    // 3.使用Repositories方式新增数据
    // const user = new User();
    // user.username = '王五';
    // user.password = '123456';
    // const userRepository = connection.getRepository(User);
    // const result = await userRepository.save(user);
    // console.log(result);

    // 4.删除数据
    // 4.1创建一个句柄
    // const userRepository = connection.getRepository(User);
    // // 4.2根据句柄去查询实体findOne传递数字会默认根据id查询
    // const user = await userRepository.findOne(1);
    // // 4.3删除数据
    // await userRepository.remove(user);

    // 5.修改数据
    const userRepository = connection.getRepository(User);
    const user = await userRepository.findOne(2);
    user.password = '23456';
    await userRepository.save(user);

}).catch(error => console.log(error));
