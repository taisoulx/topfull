import {Global, Module} from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose'
import { User } from "@libs/db/models/user.model";
import { Course } from '@libs/db/models/course.model';
import { Episode } from '@libs/db/models/episode.model';

const models = TypegooseModule.forFeature( [
  User,
  Course,
  Episode
] )

@Global()
@Module({
  imports:[
    TypegooseModule.forRoot('mongodb://localhost/topfull',{
      useNewUrlParser:true,
      useUnifiedTopology:true,
      useCreateIndex:true,
      useFindAndModify:false
    }),
    models
  ],
  providers: [DbService],
  exports: [DbService,models],
})
export class DbModule {}
