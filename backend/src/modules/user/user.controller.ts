import { Body, Controller, Delete, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { updateUserDTO } from './dto';
import { jwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiTags("API")
    @ApiResponse({status: 200, type: updateUserDTO})
    @UseGuards(jwtAuthGuard)
    @Patch()
    updateUser(@Body() updateDto: updateUserDTO, @Req() request): Promise<updateUserDTO> {
        const user = request.user
        return this.userService.updateUser(user.email, updateDto)
    }

    @UseGuards(jwtAuthGuard)
    @Delete()
    deleteUser(@Req() request): Promise<boolean> {
        const user = request.user
        return this.userService.deleteUser(user.email)
    }
}
