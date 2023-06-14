import { Injectable } from '@nestjs/common';
import * as config from 'config';

@Injectable()
export class ConfigServiceFile {
  getDatabaseConfig: any;
    constructor() {}
  public get<T>(key:string):T{
    return config.get<T>(key);
  }

}
