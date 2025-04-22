import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { CreateAuthorizationDto } from './dto/create-authorization.dto';
import { UpdateAuthorizationDto } from './dto/update-authorization.dto';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { SendOtp } from './dto/send-otp.dto';

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Post('send-otp')
  sendOtp(@Body() sendOtp: SendOtp) {
    return this.authorizationService.sendOtp(sendOtp)
  }

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authorizationService.register(registerUserDto)
  }
  
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authorizationService.login(loginUserDto)
  }
}
