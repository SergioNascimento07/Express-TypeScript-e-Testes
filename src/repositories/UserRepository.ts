
//manage permite gerenciar todas
//as funcoes do repositorio

import { EntityManager } from "typeorm";
import { User } from "../entities/User";

//criar, apagar, pegar
export class UserRepository {
    public manager: EntityManager

    constructor(manager: EntityManager) {
        this.manager = manager
    }

    printa = () => {
        console.log(100200)
    }

    createUser = async (user: User): Promise<User>=> {
        return await this.manager.save(user)
    }

    //where busca nessa coluna por tal valor
    getUser = async (userId: string): Promise<User|null> => {
        return this.manager.findOne(User, {
            where: {
                user_id: userId
            }
        })
    }
}