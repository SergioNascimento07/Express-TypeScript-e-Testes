import UserService from "../services/UserService"
import UserController from "./UserController"
import {Params} from 'express-serve-static-core'
import {Request, Response} from 'express'
import { makeMockRequest } from "../__mocks__/mockRequest.mock"
import { makeMockResponse } from "../__mocks__/mockResponse.mock"

describe("UserController", ()=> {
    //necessario passar as funcoes que vao ser usadas
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn()
    }
    const userController = new UserController(mockUserService as UserService)

    it("Deve adicionar um novo usuário", ()=> {
        const mockRequest = {
            body: {
                name: "nath",
                email: "nath@teste.com"
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest , mockResponse) 
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({message: 'Usuario criado'})
    })

    it("Deve retornar um erro por dados errados, com status 400", ()=> {
        const mockRequest = {
            body: {
                email: "nath@teste.com"
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest , mockResponse) 
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: "Nome obrigatório"})
    })
})