import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @ApiProperty({example: 'olma'})
    @IsString()
    name: string

    @ApiProperty({ example: 23456 })
    @IsNumber()
    price: number

    @ApiProperty({ example: 'olma.png' })
    @IsString()
    image: string
}
