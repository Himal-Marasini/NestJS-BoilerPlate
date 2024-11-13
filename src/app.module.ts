import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { ThrottlerModule } from "@nestjs/throttler"

import { validate } from "./env.validation"
import { AuthModule } from "./modules/auth/auth.module"
import { PrismaModule } from "./prisma/prisma.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100
      }
    ]),
    PrismaModule,
    AuthModule
  ]
})
export class AppModule {}
