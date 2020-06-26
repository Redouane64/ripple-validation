import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query("a")address: string = "X7vgT83JCJWvMWrWpyMBZNJ8sqzJq33wDtvzP5Wb4a5KK6x") {
    return this.appService.validateRipple(address);
  }
}
