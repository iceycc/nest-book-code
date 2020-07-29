import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";

createConnection().then(async connection => {
    const user = new User()
    user.username = '张三';
    user.password = '123456';
    // save里面传递一个对象
    connection.manager.save(user).then(user => {
        console.log('插入成功', user);
    });

}).catch(error => console.log(error));
