import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { UserExtend } from './entity/UserExtend';
import { Posts } from './entity/Posts';

createConnection().then(async connection => {
    // 帖子一
    const posts1 = new Posts();
    posts1.title = '文章一';
    posts1.content = '文章一内容';

    // 帖子二
    const posts2 = new Posts();
    posts2.title = '文章二';
    posts2.content = '文章二内容';

    // 创建一个用户
    const user = new User();
    user.username = '王五';
    user.password = '123456';
    user.posts = [posts1, posts2];

    const userRepository = connection.getRepository(User);
    const postsRepository = connection.getRepository(Posts);
    await postsRepository.save(posts1);
    await postsRepository.save(posts2);
    await userRepository.save(user);
    console.log('添加数据成功');

}).catch(error => console.log(error));
