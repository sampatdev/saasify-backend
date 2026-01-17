import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "src/config/config.service";
import { ConfigModule } from "src/config/config.module";
import { OrganizationsModule } from "src/organizations/organizations.module";
import { UsersModule } from "src/users/users.module";


@Module({
    imports: [
        ConfigModule,
        UsersModule,
        OrganizationsModule,
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:(config: ConfigService) => ({
                secret: config.get('JWT_SECRET'),
                signOptions: {expiresIn:'15m'}
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})

export class AuthModule {}