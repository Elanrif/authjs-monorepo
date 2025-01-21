import {Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginDto} from "./dto/auth.dto";
import {UserService} from "../user/user.service";
import {compare} from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import * as process from "node:process";

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private jwtService: JwtService,) {}

    async login(dto: LoginDto){
        const user=  await this.validateUser(dto);
        const payload = {
            username: user.email,
            sub: {
                name: user.name,
            }
        }

        return {
            user,
            backendTokens:{
                accessToken: await this.jwtService.signAsync(payload,{
                    expiresIn: '1h',
                    secret: process.env.JWTSECRETKEY,
                }),
                refreshToken: await this.jwtService.signAsync(payload,{
                    expiresIn: '7d',
                    secret: process.env.JWTREFRESHTOKENKEY,
                }),
            },
        };
    }

    async validateUser(dto:LoginDto){
            const user = await this.userService.findByEmail(dto.username);

            if(user && (await compare(dto.password, user.password))){
                const {password, ...result} = user;

                return result;
            }
            throw new UnauthorizedException();
    }
}
