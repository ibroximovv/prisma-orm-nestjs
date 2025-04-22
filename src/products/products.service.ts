import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { GetProductDto } from './dto/get-product.dto';
import { contains } from 'class-validator';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService){}
  async create(createProductDto: CreateProductDto, req: Request) {
    try {
      return await this.prisma.product.create({
        data: {
          ...createProductDto,
          userId: req['user_id']
        }, 
        include: {
          user: true
        }
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async findAll(query: GetProductDto) {
    const { search, page = 1, limit = 10, order = 'desc', column = 'name' } = query;
    try {
      const where = search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            price: {
              equals: isNaN(Number(search)) ? undefined : Number(search),
            },
          },
        ],
      }
    : {};

      return await this.prisma.product.findMany({
        where,
        include: { user: true },
        orderBy: {
          [column]: order,
        },
        skip: (page - 1) * limit,
        take: limit,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async findOne(id: string) {
    try {
      const findOne = await this.prisma.product.findFirst({ where: { id }})
      if (!findOne) {
        return { message: 'Product not found' }
      }
      return findOne;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const findOne = await this.prisma.product.findFirst({ where: { id }})
      if (!findOne) {
        return { message: 'Product not found' }
      }
      return await this.prisma.product.update({ where: { id }, data: updateProductDto });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async remove(id: string) {
    try {
      const findOne = await this.prisma.product.findFirst({ where: { id }})
      if (!findOne) {
        return { message: 'Product not found' }
      }
      return await this.prisma.product.delete({ where: { id }});
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal server error')
    }
  }
}
