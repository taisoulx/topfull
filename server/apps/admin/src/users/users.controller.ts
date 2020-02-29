import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: User,
})
@Controller('users')
@ApiTags('用户')
export class UsersController {
  //依赖注入
  constructor(@InjectModel(User) private readonly model) {}

  @Get('option')
  option(){
    return {
      title:'用户管理',
      page:true,
      align:'center',
      menuAlign:'center',
      column:[
        {
          label:'用户名',
          prop:'username'
        },
        {
          label:'密码',
          prop:'password'
        }
      ]
    }
  }}
