import { Injectable } from '@nestjs/common';
import TodoModel from './Domain/Models/TodoModel';
import RedisAdapter from './Infra/Repository/RedisAdapter';
const Redis = require("ioredis");
const client = new Redis({
  host:'redis'
}); 

 
client.on('error',(err) => {
  console.log("ERROR")
  console.log(err)
})


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  postTestRedis(){
    const adapter = new RedisAdapter<TodoModel>({destination:'REDIS',client})

    adapter.insertData({
      todoCompleted:false,
      todoDate:new Date().toISOString(),
      todoText:"HELLO WORLD",
      userId:"FILIPE_KERTCHER"
    })

    return "AEHOO"
  }

 async getTestRedis(){
    const adapter = new RedisAdapter<TodoModel>({destination:'REDIS',client})

    const result = await adapter.listData("FILIPE_KERTCHER")
     
    return result
  }


  async deleteTestRedis(){
    const adapter = new RedisAdapter<TodoModel>({destination:'REDIS',client})

    const result = await adapter.removeData("ca7c022c-f880-491a-bc97-a05adfaf5702")
     
    return result
  }
}
