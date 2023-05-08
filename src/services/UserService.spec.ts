// import { User } from "../entities/User"
// import { UserRepository } from "../repositories/UserRepository"
import UserService from "./UserService"
import * as jwt from 'jsonwebtoken'
//mockar a funcao que faz a inicializacao do appDataSource
jest.mock("../database", ()=> {
    initialize: jest.fn()
})

jest.mock('jsonwebtoken')
// const mockUserRepository = jest.mock("../repositories/UserRepository", ()=> ({
//     ...jest.requireActual("../repositories/UserRepository"),
//     createUser: ()=> {return 1}
// }))

//mockando o path
//ainda da pra ter acesso a tudo que tem la atraves do require
//necessario mockar as funcoes
jest.mock('../repositories/UserRepository')
const mockUserRepository = require('../repositories/UserRepository')

//forma de passar banco
describe("UserService", ()=> {
    const mockUser = {
        user_id: 'criado',
        name: 'sergio',
        email: 'sergio@gmail.com',
        password: '123'
    }
    
    const userService = new UserService(mockUserRepository)

    it("deve adicionar um novo usuário", async ()=> {
        // const mockConsole = jest.spyOn(global.console, 'log')
        // await userService.createUser('sergio', 'sergio@gmail.com', '123')
        // expect(mockConsole).toHaveBeenCalledWith("Db atualizado... ", mockDb)

        //mockUserRepository é o mesmo que chamar userService.userRepository 
        // pois foi passado no construtor do userService
        mockUserRepository.createUser = jest.fn(()=> {
            console.log("meu teste ta rodando ")
            return Promise.resolve(mockUser)
        })
        const response = await userService.createUser('sergio', 'sergio@gmail.com', '123')
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject(mockUser)
    })

    it("Deve retornar um token de usuário", async ()=> {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(()=> 
            Promise.resolve(mockUser)
        )
        jest.spyOn(jwt, 'sign').mockImplementation(()=> 'token')
        const token = await userService.getToken("sergio@gmail.com", "123")
        expect(token).toBe('token')
    })

    it("Deve retornar um erro, caso não encontre usuário", async ()=> {
        jest.spyOn(userService, "getAuthenticatedUser").mockImplementation(()=> Promise.resolve(null))
        await expect(userService.getToken("invalido", "123")).rejects.toThrowError(new Error("Email ou password inválido"))
    })
})