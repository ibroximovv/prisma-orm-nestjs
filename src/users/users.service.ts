import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUserDto } from './dto/get-user.dto';
import { contains } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService){}

  async findAll(query: GetUserDto) {
   const { search, page = 1, limit = 10, order = 'desc', column = 'username' } = query;
    try {
      const where = search ? {
        OR: [
          {
            username: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            email: {
              contains: search,
              mode: 'insensitive' as const
            },
          },
        ],
      }
    : {};
      return await this.prisma.user.findMany({where,
        orderBy: {
          [column]: order,
        },
        skip: (page - 1) * limit,
        take: limit,});
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const findOne = await this.prisma.user.findFirst({ where: { id }})
      if(!findOne) {
        return { message: 'User not found' }
      }
      return findOne;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('INternal server error')
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const findOne = await this.prisma.user.findFirst({ where: { id }})
      if(!findOne) {
        return { message: 'User not found' }
      }
      return await this.prisma.user.update({where: { id }, data: updateUserDto })
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('INternal server error')
    }
  }

  async remove(id: string) {
    try {
      const findOne = await this.prisma.user.findFirst({ where: { id }})
      if(!findOne) {
        return { message: 'User not found' }
      }
      return await this.prisma.user.delete({ where: { id }});
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('INternal server error')
    }
  }
}
