import { arrayProp, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Episode } from '@libs/db/models/episode.model';

@modelOptions({
  schemaOptions: {
    //给模型的每个字段加上时间，createdAt、updatedAt
    timestamps: true,
  },
})
export class Course {
  @ApiModelProperty({description:'课程名称',example:'产品思维30讲'})
  @prop()
  courseName:string

  @ApiModelProperty({description:'封面图'})
  @prop()
  cover:string

  @arrayProp({itemsRef:'Episode'})
  episodes:Ref<Episode>[]

}
