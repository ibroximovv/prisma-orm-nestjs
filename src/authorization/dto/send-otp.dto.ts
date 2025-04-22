import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class SendOtp {
    @ApiProperty({ example: 'sarvar' })
    @IsString()
    username: string

    @ApiProperty({ example: 'ilyosbekibroximov23@gmail.com' })
    @IsString()
    email: string
}