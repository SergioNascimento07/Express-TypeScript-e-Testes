
//manage permite gerenciar todas
//as funcoes do repositorio

import { EntityManager } from "typeorm";
import { User } from "../entities/User";

//criar, apagar, pegar
export class UserRepository {
    private manager: EntityManager

    constructor(manager: EntityManager) {
        this.manager = manager
    }

    createUser = async (user: User)=> {
        return this.manager.save(user)
    }
}