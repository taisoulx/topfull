import { modelOptions, prop } from '@typegoose/typegoose';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

//定以model配置
@modelOptions({
  schemaOptions: {
    //给模型的每个字段加上时间，createdAt、updatedAt
    timestamps: true,
  },
})
export class User {
  @ApiModelProperty({ description: '用户名', example: 'taisoulx' })
  @prop()
  username: string;

  @ApiModelProperty({ description: '密码', example: '450403015' })
  @prop()
  password: string;
}
