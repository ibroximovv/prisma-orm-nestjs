import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthorizationDto } from './dto/create-authorization.dto';
import { UpdateAuthorizationDto } from './dto/update-authorization.dto';
import { totp } from "otplib";
import { SendOtp } from './dto/send-otp.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from "bcrypt";
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register.dto';

totp.options = {
  step: 300
}

@Injectable()
export class AuthorizationService {
  constructor(private readonly prisma: PrismaService, private readonly mail: MailService, private readonly jwt: JwtService){}
  async findUser(email: string) {
    return await this.prisma.user.findFirst({where: { email }})
  }

  async sendOtp(sendOtpAuthDto: SendOtp) {
    try {
      const otp = totp.generate(sendOtpAuthDto.email + 'secret1')
      this.mail.sendSmsToEmail(sendOtpAuthDto.email, 'Tasdiqlash kodi', 'Iltimos kodni hech kimga bermang', `<h2>${otp}</h2>`)
      return { message: 'otp sent'}
    } catch (error) {
      console.log(error);
    }
  }

  async register(registerUserDto: RegisterUserDto) {
    const findUser = await this.findUser(registerUserDto.email)
    if (findUser) {
      throw new NotFoundException('User already exists')
    }

    const hashedPassword = bcrypt.hashSync(registerUserDto.password, 10)

    const createNewAuthUser = await this.prisma.user.create({ data: {
      ...registerUserDto,
      password: hashedPassword
    }})

    return createNewAuthUser;
  }

  async login(loginUserDto: LoginUserDto) {
    try {      
      const findUser = await this.findUser(loginUserDto.email)
      if (!findUser) {
        throw new NotFoundException('User not exists')
      }

      const matchPassword = bcrypt.compareSync(loginUserDto.password, findUser.password)
      if(!matchPassword) {
        throw new UnauthorizedException('password wrong error')
      }

      const chackOtp = totp.verify({token: loginUserDto.otp, secret: loginUserDto.email + 'secret1'})
      if(!chackOtp) {
        return {message: 'Otp not provided'}
      }

      this.mail.sendSmsToEmail(loginUserDto.email, 'new logined', `date: ${new Date()}`)
      const token = this.jwt.sign({ id: findUser.id, role: findUser.role })
      
      return { token }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal server error')
    }
  }
}
