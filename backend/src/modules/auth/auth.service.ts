import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto';
import { AppError } from 'src/common/constants/errors';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt'
import { UserAuthResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) {}

    async registersUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
        const existUser = await this.userService.findUserByEmail(dto.email)
        if(existUser) throw new BadRequestException(AppError.USER_EXIST)
        return this.userService.createUser(dto)
    }

    async loginUser(dto: UserLoginDTO): Promise<UserAuthResponse> {
        const existUser = await this.userService.findUserByEmail(dto.email)
        if(!existUser) throw new BadRequestException(AppError.USER_NOT_FOUND)
        const validatePassword = await bcrypt.compare(dto.password, existUser.password)
        if(!validatePassword) throw new BadRequestException(AppError.WRONG_DATA)
        const user = await this.userService.publicUser(dto.email)
        const token = await this.tokenService.generateJwtToken(user)
        return {...user, token}
    }
}
