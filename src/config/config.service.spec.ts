import { Test, TestingModule } from '@nestjs/testing';
import { ConfigServiceFile } from './config.service';
import { resolve } from 'path';

describe('ConfigService', () => {
  let service: ConfigServiceFile;

  beforeEach(async () => {
  service=new ConfigServiceFile
  });

  it('should be defined config service ', () => {
    const templatepath = resolve(__dirname,'../..','views')
    expect(service.get<string>('templates.path')).toEqual(templatepath);
  });
});
