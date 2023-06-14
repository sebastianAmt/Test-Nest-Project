import { Module } from '@nestjs/common';
import { locationController } from "./location.controller";

@Module({
    controllers:[locationController]
})
export class LocationModule {}
