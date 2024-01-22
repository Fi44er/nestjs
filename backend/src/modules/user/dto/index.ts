import { IsString } from "class-validator";

export class CreateUserDTO {
    @IsString() // проверка на строку
    firstName: string

    @IsString()
    userName: string

    @IsString()
    email: string

    @IsString()
    password: string
}