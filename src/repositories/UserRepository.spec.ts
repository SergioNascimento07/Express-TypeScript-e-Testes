import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock"
import { User } from "../entities/User"
import { UserRepository } from "./UserRepository"

describe("UserRepository", ()=> {
    let userRepository: UserRepository

    const mockUser: User = {
        id_user: '123',
        name: 'testeUser',
        email: "testeEmail"
    }

    //oq é colocado na função beforeAll é executado depois de todos os testes
    beforeAll(async ()=> {
        const managerMock = await getMockEntityManager({})
        userRepository = new UserRepository(managerMock)
    })

    it("Deve cadastrar um novo usuário no banco de dados", async ()=> {
        await userRepository.createUser({})
    })
})