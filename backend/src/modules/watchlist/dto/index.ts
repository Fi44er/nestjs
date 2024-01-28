import { IsString } from "class-validator"

export class watchlistDTO {
    @IsString()
    name: string

    @IsString()
    assetId: string
}