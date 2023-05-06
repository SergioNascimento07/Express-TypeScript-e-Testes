import { Request, Response } from "express"
import UserService from "../services/UserService"

class UserController {
    userService: UserService
    
    constructor(userService = new UserService()) {
        this.userService = userService
    }

    createUser = (req: Request, res: Response)=> {
        const {name, email, password} = req.body

        if(!name) {
            return res.status(400).json({message: "Nome obrigatório"})
        }

        if(!email) {
            return res.status(400).json({message: "Email é obrigatório"})
        }

        if(!password) {
            return res.status(400).json({message: "Senha é obrigatória"})
        }
    
        this.userService.createUser(name, email, password)
        return res.status(200).json({message: "Usuario criado"})
    }

    getUsers = (req: Request, res: Response)=> {
        return res.status(200)
    }

    // deleteUser = (req: Request, res: Response)=> {
    //     const user = req.body
    //     this.userService.deleteUser(user)
    //     return res.status(200).json({message: "Usuário deletado"})
    // }
}

export default UserController