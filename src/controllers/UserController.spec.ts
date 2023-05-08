import UserService from "../services/UserService"
import UserController from "./UserController"
import {Params} from 'express-serve-static-core'
import {Request, Response} from 'express'
import { makeMockRequest } from "../__mocks__/mockRequest.mock"
import { makeMockResponse } from "../__mocks__/mockResponse.mock"

jest.mock("../database", ()=> {
    initialize: jest.fn()
})

const mockUserService = {
    createUser: jest.fn(),
    getUser: jest.fn()
}

jest.mock("../services/UserService", ()=> {
    return {
        UserService: jest.fn().mockImplementation(()=> {
            return mockUserService
        })
    }
})

describe("UserController", ()=> {
    //necessario passar as funcoes que vao ser usadas
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getUser: jest.fn()
    }
    const userController = new UserController(mockUserService as UserService)

    it("Deve adicionar um novo usuário", ()=> {
        const mockRequest = {
            body: {
                name: "nath",
                email: "nath@teste.com",
                password: "123"
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest , mockResponse) 
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({message: 'Usuario criado'})
    })

    it("Deve retornar um erro por causa do nome não ter sido passado, com status 400", ()=> {
        const mockRequest = {
            body: {
                email: "nath@teste.com",
                password: "123"
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest , mockResponse) 
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: "Nome obrigatório"})
    })

    // it("Deve chamar a função getAllUsers", ()=> {
    //     const mockRequest = {} as Request
    //     const mockResponse = makeMockResponse()
    //     userController.getAllUsers(mockRequest, mockResponse)
    //     expect(mockUserService.getAllUsers).toHaveBeenCalled()
    //     expect(mockResponse.state.status).toBe(200)
    //     expect(mockResponse.state.json).toMatchObject([
    //         {
    //             name: "Joana",
    //             email: "joana@dio.com"
    //         }
    //     ])
    // })

    it("Deve retornar um erro caso o email não tenha sido passado", ()=> {
        const mockRequest = {
            body: {
                name: "nath@teste.com",
                password: "123"
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: "Email é obrigatório"})
    })

    it("Deve retornar um erro caso o password não tenha sido passado", ()=> {
        const mockRequest = {
            body: {
                name: "nath@teste.com",
                email: "email@dada"
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: "Senha é obrigatória"})
    })


    // it("Deve deletar o usuario", ()=> {
    //     const mockRequest = {
    //         body: {
    //             name: "Joana"
    //         }
    //     } as Request
    //     const mockResponse = makeMockResponse()
    //     userController.deleteUser(mockRequest, mockResponse)
    //     expect(mockResponse.state.status).toBe(200)
    //     expect(mockResponse.state.json).toMatchObject({message: "Usuário deletado"})
    // })

    it("Deve retornar o usuário com o userId informado", ()=> {
        const mockRequest = makeMockRequest({
            params: {
                userId: "123",
            }
        })
        const mockResponse = makeMockResponse()
        userController.getUser(mockRequest, mockResponse)
        expect(mockUserService.getUser).toHaveBeenCalledWith('123')
        // expect(mockResponse.state.status).toBe(200)
        // expect(mockResponse.state.json).toMatchObject()
    })
})