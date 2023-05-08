// export interface IUser {
//     name: string,
//     email: string
// }

import { sign } from "jsonwebtoken"
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
    
    getUser = async (userId: string): Promise<User|null> => {
        return this.userRepository.getUser(userId)
    }

    getAuthenticatedUser = (email: string, password: string):Promise<User|null> => {
        return this.userRepository.getUserByEmailAndPassword(email, password)
    }

    getToken = async (email: string, password: string) => {
        const user = await this.getAuthenticatedUser(email, password)

        if(!user) {
            throw new Error("Email ou password inválido")
        }

        const tokenData = {
            name: user?.name,
            email: user?.email
        }
        const tokenKey = '123'
        const tokenOptions = {
            subject: user?.user_id
        }
        // const tokenOptions = {
        //     subject: user.id_user,
        //     algorithm: 'PS256',
        //     expireIn: '4h'
        // }

        const token = sign(tokenData, tokenKey, tokenOptions)

        return token
    }

    // deleteUser = (user: IUser): void => {
    //     console.log("Deletand usuário... ", user)
    // }
}

export default UserService