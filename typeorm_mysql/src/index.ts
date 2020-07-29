import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { UserExtend } from './entity/UserExtend';

createConnection().then(async connection => {
    // // 创建一个用户
    // const user = new User();
    // user.username = '王五';
    // user.password = '123456';

    // const userExtend = new UserExtend();
    // userExtend.mobile = '13412345678';
    // userExtend.address = '中国';
    // // 关联两个数据模型
    // userExtend.user = user;

    // // 必须先保存用户表,因为他要提供主键出来
    // const userRepository = connection.getRepository(User);
    // await userRepository.save(user);

    // const userExtendRepository = connection.getRepository(UserExtend);
    // await userExtendRepository.save(userExtend);
    // console.log('插入数据成功');

    // 使用relations关联查询数据(正向查找)
    // const userRepository = connection.getRepository(User);
    // const result = await userRepository.find({ relations: ['userDetail'] })
    // console.log(result);

    const userExtendRepository = connection.getRepository(UserExtend);
    const result = await userExtendRepository.find({ relations: ['user'] });
    console.log(result);

}).catch(error => console.log(error));
