import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class OrganizationsRepository {
    constructor(private readonly prisma : PrismaService) {}

    async create(name:string){
        return this.prisma.organization.create({
            data : {name},
        })
    }

    async findById(id: string){
        return this.prisma.organization.findUnique({
            where : {id}
        })
    }
}