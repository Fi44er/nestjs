import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable() // для возможности расширения класса
export class jwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // берем jwt из request
            ignoreExpiration: false, // если срок jwt истек, то он считается не действительным
            secretOrKey: configService.get('secret_jwt') // секретный ключ
        })
    }

    async validate(payload: any) {
        return {...payload.user}
    }

}