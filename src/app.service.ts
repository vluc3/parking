import { Injectable } from '@nestjs/common';

import * as fs from 'fs';

var http = require('http');
var parseString = require('xml2js').parseString;

@Injectable()
export class AppService {

  private url: string = 'http://data.lacub.fr/wfs?key=9Y2RU3FTE8&SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=ST_PARK_P&SRSNAME=EPSG:4326';
  private path: string = 'asset/parking.json';

  async getXml(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.readUrl(this.url, function(error: any, result: any) {
        if (error) {
          return reject(error);
        } else {
          return resolve(result);
        }
      });
    });
  }

  async getJson(): Promise<any> {
    try {
      return fs.readFileSync(this.path, {encoding: 'utf8'});
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private async readUrl(url: string, callback: any) {
    http.get(url, (response: any) => {
      var xml = '';

      response.on('data', (chunk: string) => {
        xml += chunk;
      });

      response.on('error', (error: any) => {
        callback(error, null);
      });

      response.on('timeout', (error: any) => {
        callback(error, null);
      });

      response.on('end', () => {
        parseString(xml, (error: any, result: any) => {
          callback(null, result);
        });
      });
    });
  }
}
