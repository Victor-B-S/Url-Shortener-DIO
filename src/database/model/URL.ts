 import { prop, getModelForClass } from "@typegoose/typegoose"

 export class URL {
    @prop ({ required: true })
    hash: string
    
    @prop ({ required: true })
    originalURL: string

    @prop ({ required: true })
    shortURL: string

    @prop ({ required: true })
    timesUsed: number
 }

 export const URLModel = getModelForClass(URL)