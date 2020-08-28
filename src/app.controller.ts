import { Controller, Get, Post, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('Redis')
  postRedis(): string {
    return this.appService.postTestRedis();
  }
  
  @Get('Redis')
  getRedis(): any {
    return this.appService.getTestRedis();
  }


  @Delete('Redis')
  deleteRedis(): any {
    return this.appService.deleteTestRedis();
  }
}
