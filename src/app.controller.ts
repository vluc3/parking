import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {

  constructor(
    private readonly appService: AppService) {
  }

  @Get('xml')
  async getXml(): Promise<any> {
    return await this.appService.getXml();
  }

  @Get('json')
  async getJson(): Promise<any> {
    return this.appService.getJson();
  }
}
