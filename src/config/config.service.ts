import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {
    get(key: string): string {
        const value =  process.env[key]
        if(!value){
            throw new Error('Missing key')
        }
        return value;
    }
}