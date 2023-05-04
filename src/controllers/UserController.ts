import { Request, Response } from "express"
import UserService from "../services/UserService"

class UserController {
    userService: UserService
    
    constructor(userService = new UserService()) {
        this.userService = userService
    }

    createUser = (req: Request, res: Response)=> {
        const {name, email} = req.body

        if(!name) {
            return res.status(400).json({message: "Nome obrigatório"})
        }
    
        this.userService.createUser(name, email)
        return res.status(200).json({message: "Usuario criado"})
    }

    getAllUsers = (req: Request, res: Response)=> {
        const users = this.userService.getAllUsers()
        return res.status(200).json(users)
    }

    deleteUser = (req: Request, res: Response)=> {
        const user = req.body
        this.userService.deleteUser(user)
        return res.status(200).json({message: "Usuário deletado"})
    }
}

export default UserController