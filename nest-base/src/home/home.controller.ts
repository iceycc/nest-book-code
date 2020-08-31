import { Controller , Get,Render} from '@nestjs/common';

@Controller()
export class HomeController {
    @Get()
    @Render('index')
    home():any{
       return { title: '哈哈aaa' };
    }
}
