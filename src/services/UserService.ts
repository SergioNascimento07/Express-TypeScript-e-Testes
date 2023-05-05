// export interface IUser {
//     name: string,
//     email: string
// }

import { AppDataSource } from "../database"
import { User } from "../entities/User"
import { UserRepository } from "../repositories/UserRepository"

// const db: IUser[] = [
//     {
//         name: "Joana",
//         email: "joana@dio.com"
//     }
// ]

class UserService {
    user: User | undefined
    // db: IUser[]

    // public constructor(database=db) {
    //     this.db = database
    // }

    public userRepository: UserRepository

    constructor(
        userRepository = new UserRepository(AppDataSource.manager)
    ) {
        this.userRepository = userRepository
    }

    createUser = async (name: string, email: string, password: string)=> {
        this.user = new User(name, email, password)
        return await this.userRepository.createUser(this.user)
    }
    
    getUser = () => {
        // return this.db
    }

    // deleteUser = (user: IUser): void => {
    //     console.log("Deletand usuário... ", user)
    // }
}

export default UserService