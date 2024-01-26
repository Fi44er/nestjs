import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto';
import { UserLoginDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAuthResponse } from './response';
import { jwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiTags('API') // добавление маршрута в раздел API в swagger
    @ApiResponse({status: 201, type: CreateUserDTO})
    @Post('register')
    register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
        return this.authService.registersUsers(dto)
    }

    @ApiTags('API')
    @ApiResponse({status: 200, type: UserAuthResponse})
    @Post('login')
    login(@Body() dto: UserLoginDTO): Promise<UserAuthResponse> {
        return this.authService.loginUser(dto)
    }

    @UseGuards(jwtAuthGuard)
    @Post('test')
    test() {
        return true
    }
}
