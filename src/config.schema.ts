import * as joi from '@hapi/joi'

export const configureSchema= joi.object({
    STAGE:joi.string().required(),
    DB_PORT:joi.string().required(),
DB_USERNAME:joi.string().required(),
DB_PASSWORD:joi.string().required(),
DB_DATABASE:joi.string().required(),
JWT_secreatkey:joi.string().required()

})