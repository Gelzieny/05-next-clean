// src/controllers/create-account.controller.ts
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes, // Import UsePipes
  ValidationPipe, // Import ValidationPipe
} from '@nestjs/common'
import { hash } from 'bcryptjs'

import { PrismaService } from 'src/prisma/prisma.service'
import { CreateAccountBody } from './dtos/create-account-dto'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  async handle(@Body() body: CreateAccountBody) {
    const { name, email, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same e-mail address already exists.',
      )
    }

    const hashedPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  }
}
