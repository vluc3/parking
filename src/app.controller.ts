import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  private isXml: boolean = true;

  constructor(
    private readonly appService: AppService) {
  }

  @Get()
  async get(): Promise<any> {
    let result: Promise<any> = null;

    if (this.isXml) {
      result = await this.appService.getXml();
    } else {
      result = this.appService.getJson();
    }

    return result;
  }
}
