import { Controller, Get,Post, Param,Query, ParseIntPipe, Body, Render } from '@nestjs/common';
@Controller('user')
export class UserController {
    @Get()
    userList(
        @Query() query:any
    ):string{
        console.log(query)
        return '用户列表'
    }
    // @Get('/2')
    // userList2(
    //     @Query('age',new ParseIntPipe()) age:number,
    //     @Query('name') name:string
    // ):string{
    //     console.log(age,name)
    //     return '用户列表2'
    // }
    // @Get(':id')
    // userList3(
    //     @Param() param:any
    // ):string{
    //     console.log(param)
    //     return '用户列表3'
    // }
    // @Get(':id')
    // userList4(
    //     @Param('id',new ParseIntPipe()) id:number,
    // ):string{
    //     console.log(id)
    //     return '用户列表4'
    // }
    @Get(':id/:age')
    userList3(
        @Param('id',new ParseIntPipe()) id:number,
        @Param('age',new ParseIntPipe()) age:number
    ):string{
        console.log(id,age)
        return '用户列表5'
    }

    @Post()
    addUser(
        @Body() body:any
    ):string{
        console.log(body)
        return '增加用户'
    }

    @Get('login')
    @Render('login')
    login(){
        return {title:'login登录'}
    }
}
