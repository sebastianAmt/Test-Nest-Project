import addJestHbrExtension from 'jest-hbs-extension'
import { resolve } from 'path'
const viewpath=resolve(__dirname,'..','views')
addJestHbrExtension(viewpath)