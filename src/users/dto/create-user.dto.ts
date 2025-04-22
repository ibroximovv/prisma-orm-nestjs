import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { IsEmail, IsEnum, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'sarvar'})
    @IsString()
    username: string

    @ApiProperty({ example: 'ilyosbekibroximov23@gmail.com' })
    @IsEmail()
    email: string

    @ApiProperty({ example: 'parol1234' })
    @IsString()
    password: string

    @ApiProperty({ example: 'ADMIN', enum: UserRole })
    @IsEnum(UserRole)
    role: UserRole
}
