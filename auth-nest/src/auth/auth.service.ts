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
                    expiresIn: '20s',
                    secret: process.env.JWT_SECRET_KEY,
                }),
                refreshToken: await this.jwtService.signAsync(payload,{
                    expiresIn: '7d',
                    secret: process.env.JWT_REFRESH_TOKEN_KEY,
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

    // user it's the payload created in line 15: it's not a user type, it's just a payload that extracted from a refreshJwt
    async refreshToken(user: any){
        const payload = {
            username: user.username,
            sub: user.sub
        }

        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '20s',
                secret: process.env.JWT_SECRET_KEY,
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
                secret: process.env.JWT_REFRESH_TOKEN_KEY,
            })
        }
    }
}
