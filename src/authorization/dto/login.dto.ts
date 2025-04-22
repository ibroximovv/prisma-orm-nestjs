import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class LoginUserDto {
    @ApiProperty({ example: 'ilyosbekibroximov23@gmail.com' })
    @IsEmail()
    email: string

    @ApiProperty({ example: 'parol1234' })
    @IsString()
    password: string

    @ApiProperty({ example: '123456' })
    @IsString()
    otp: string
}