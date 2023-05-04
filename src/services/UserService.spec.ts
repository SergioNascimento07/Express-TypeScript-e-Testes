import UserService from "./UserService"
import { IUser } from "./UserService"

//forma de passar banco
describe("UserService", ()=> {
    const mockDb:IUser[] = []
    const userService = new UserService(mockDb)

    it("deve adicionar um novo usuário", ()=> {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('sergio', 'sergio@gmail.com')
        expect(mockConsole).toHaveBeenCalledWith("Db atualizado... ", mockDb)
    })
})