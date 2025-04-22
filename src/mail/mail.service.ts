import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from "nodemailer";


@Injectable()
export class MailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'islomaka2323@gmail.com',
            pass: 'gsaw pank yuao vftk'
        }
    })

    async sendSmsToEmail(email: string, subject: string, text: string, html?: string) {
        try {
            await this.transporter.sendMail({
                to: email,
                subject,
                text,
                html
            })
            return { message: 'successfully sendSMS'}
        } catch (error) {
            console.log(error.message);
            
            throw new InternalServerErrorException('Internal server error')
        }
    }
}
