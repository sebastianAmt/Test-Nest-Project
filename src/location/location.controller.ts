import { Controller, Get } from "@nestjs/common";

@Controller()

export class locationController {
    constructor() {
        
    }

    @Get('locationdistrict')
    locationDistrict():any{
        return{
            district:['Chennai','Madurai','Trichy']
        }
    }
}