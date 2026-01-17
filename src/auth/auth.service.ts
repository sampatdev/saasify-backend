import { Injectable } from "@nestjs/common";
import { LoginDto, SignupDto } from "./auth.types";
import * as bcrypt from 'bcrypt'
import { Result } from "src/common/types/result.type";
import { JwtService } from "@nestjs/jwt";
import { UsersRepository } from "src/users/users.repository";
import { Role } from "@prisma/client";
import { OrganizationsService } from "src/organizations/organizations.service";


type User = {
    id: string,
    email: string,
    passwordHash : string,
    role: 'ADMIN' | 'MEMBER'
}

@Injectable()
export class AuthService {
    private users: User[] = []

    constructor(
        private readonly jwtService: JwtService,
        private readonly usersRepository: UsersRepository,
        private readonly organizationsService: OrganizationsService
    ) {}

    async signup(dto: SignupDto): Promise<Result<{id: string, email: string}>>{
        const existingUser =  await this.usersRepository.findByEmail(dto.email);

        if(existingUser){
            return {status:"error", error : "user already exist"}
        }

        const organization = await this.organizationsService.createOrganizationForSignup(dto.email)

        const passwordHash  =  await bcrypt.hash(dto.password, 10)

        const organizationId = crypto.randomUUID()

        // create user
        const user = await this.usersRepository.create({
            email: dto.email,
            passwordHash,
            role: Role.ADMIN,
            organizationId:organization.id,
            name: ""
        })

        this.users.push(user)

        return {
            status : 'success',
            data : {
                id:user.id,
                email:user.email
            }
        }
    }


    async login(dto: LoginDto): Promise<Result<{accessToken: string}>>{

        // find user
        const user =  await this.usersRepository.findByEmail(dto.email)

        if(!user){
            return {status :"error", error : "Invalid credentials"}
        }

        const passwordValid =  await bcrypt.compare(
            dto.password,
            user.passwordHash
        )

        if(!passwordValid){
            return {status : "error", error :"Invalid Credentials"}
        }

        // generate access token

        const accessToken =  this.jwtService.sign({
            sub: user.id,
            email:user.email,
            role: user.role
        })

        return {
            status : "success",
            data : {accessToken}
        }
    }
}