import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { MailModule } from './mail/mail.module';
import { PrismaService } from './prisma/prisma.service';
import { MulterController } from './multer/multer.controller';

@Module({
  imports: [ProductsModule, UsersModule, PrismaModule, AuthorizationModule, MailModule, PrismaModule],
  controllers: [AppController, MulterController],
  providers: [AppService],
})
export class AppModule {}
