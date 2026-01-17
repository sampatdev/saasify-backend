import { Injectable } from "@nestjs/common";
import { OrganizationsRepository } from "./organizations.repository";

@Injectable()
export class OrganizationsService {
    constructor(private readonly organizationsRepository:OrganizationsRepository) {}

    async createOrganizationForSignup(email: string){
        const orgName = email.split('@')[0]

        return this.organizationsRepository.create(orgName);
    }
}