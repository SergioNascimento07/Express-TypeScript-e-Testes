import { EntityManager } from "typeorm"
import { User } from "../entities/User"
import { UserRepository } from "./UserRepository"
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock"

describe("UserRepository", ()=> {
    let userRepository: UserRepository
    let managerMock: Partial<EntityManager>

    const mockUser: User = {
        user_id: "123",
        name: 'testeUser',
        email: "testeEmail",
        password: "123"
    }

    //oq é colocado na função beforeAll é executado antes de todos os testes
    beforeAll(async ()=> {
        const managerMock = await getMockEntityManager({
            saveReturn: mockUser
        })
        userRepository = new UserRepository(managerMock)
    })

    it("Deve cadastrar um novo usuário no banco de dados", async ()=> {
        const response = await userRepository.createUser(mockUser)
        expect(userRepository.manager.save).toHaveBeenCalled()
        expect(response).toMatchObject(mockUser)
    })
})