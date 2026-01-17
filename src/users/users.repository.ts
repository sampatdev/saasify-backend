import { Injectable } from "@nestjs/common"
import { Role } from "src/common/types/role.type"
import { PrismaService } from "src/database/prisma.service"
import { PaginationSchema } from '../common/pagination/pagination.schema';
import { PaginationDto } from "src/common/pagination/pagination.dto";
import { Prisma } from "@prisma/client";


type CreateUserInput = {
    name:string,
    email:string,
    passwordHash:string
    role:Role,
    organizationId:string
}

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma:PrismaService) {}

    async findByEmail(email:string){
        return this.prisma.user.findUnique({
            where : {email}
        })
    }

    async create(data:CreateUserInput){
        return this.prisma.user.create({
            data,
        })
    }

    async findPaginated(pagination: PaginationDto){
        const {page, limit,search, role, sortBy, order} = pagination
        const skip = (page-1)*limit

        const where: Prisma.UserWhereInput = {
            ...(search && {
                OR:[
                    {email:{contains:search,mode:Prisma.QueryMode.insensitive}},
                    {name:{contains:search,mode:Prisma.QueryMode.insensitive}}
                ]
            }),
            ...(role && {role}),
        }

        const [data,total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take:limit,
                orderBy:{
                    [sortBy]: order,
                }
            }),
            this.prisma.user.count({where})
        ])
        return {
            data,
            total
        }
    }

}