import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { UserExtend } from './entity/UserExtend';
import { Posts } from './entity/Posts';
import { Tags } from './entity/Tags';

createConnection().then(async connection => {
    // 创建tag1
    // const tag1 = new Tags();
    // tag1.name = 'mysql';

    // // 创建tag2
    // const tag2 = new Tags();
    // tag2.name = 'node';

    // // 帖子一
    // const posts1 = new Posts();
    // posts1.title = '文章一';
    // posts1.content = '文章一内容';
    // posts1.tags = [tag1, tag2];

    // // 帖子二
    // const posts2 = new Posts();
    // posts2.title = '文章二';
    // posts2.content = '文章二内容';
    // posts2.tags = [tag1];

    // // 创建一个用户
    // const user = new User();
    // user.username = '王五';
    // user.password = '123456';
    // user.posts = [posts1, posts2];


    // const userRepository = connection.getRepository(User);
    // const postsRepository = connection.getRepository(Posts);
    // const tagRepository = connection.getRepository(Tags);
    // await tagRepository.save(tag1);
    // await tagRepository.save(tag2);

    // await postsRepository.save(posts1);
    // await postsRepository.save(posts2);
    // await userRepository.save(user);
    // console.log('添加数据成功');

    const postsRepository = connection.getRepository(Posts);
    const result = await postsRepository.findOne({ where: { id: 1 }, relations: ['tags', 'user'] });
    console.log(result);

}).catch(error => console.log(error));
