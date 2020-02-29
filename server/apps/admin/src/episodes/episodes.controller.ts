import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Episode } from '@libs/db/models/episode.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model:Episode
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode) private readonly model:ReturnModelType<typeof Episode>
  ) {}

  @Get('option')
  option(){
    return {
      title:'课时管理',
      page:false,
      align:'center',
      menuAlign:'center',
      column:[
        {
          label:'课时名称',
          prop:'name'
        },
        {
          label:'课时文件',
          prop:'file'
        }
      ]
    }
  }
}
