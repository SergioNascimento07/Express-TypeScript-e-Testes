import { Request, Response } from "express"
import UserService from "../services/UserService"

class UserController {
    private constructor() {

    }

    static createUser = (req: Request, res: Response)=> {
        const {name, email} = req.body

        if(!name) {
            return res.status(400).json({message: "Nome obrigatório"})
        }
    
        UserService.createUser(name, email)
        return res.status(200).json({message: "Usuario criado"})
    }

    static getAllUsers = (req: Request, res: Response)=> {
        const users = UserService.getAllUsers()
        return res.status(200).json(users)
    }

    static deleteUser = (req: Request, res: Response)=> {
        const user = req.body
        UserService.deleteUser(user)
        return res.status(200).json({message: "Usuário deletado"})
    }
}

export default UserController