import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsString } from "class-validator";

export enum SortOrder {
    ASC = 'asc',
    DESC = "desc"
}

export enum OrderCoulmn {
    name = "name",
    price = 'price'
}

export class GetProductDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    search?: string

    @ApiProperty({ example: 1, required: false  })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page?: number = 1

    @ApiProperty({ example: 10, required: false })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    limit?: number = 10

    @ApiProperty({ enum: SortOrder, example: 'asc', required: false })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | "desc" = "desc"

    @ApiProperty({ enum: OrderCoulmn, example: 'name', required: false })
    @IsOptional()
    @IsIn(['name', 'price'])
    column?: string
}