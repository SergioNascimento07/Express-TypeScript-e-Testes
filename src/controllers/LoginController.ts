import { Request, Response } from "express"
import UserService from "../services/UserService"

const user = {
    id_user: "12345",
    name: "Sergio",
    email: "sergio@gmail.com",
    password: "123"
}

export class LoginController {
    userService: UserService

    constructor(userService = new UserService()) {
        this.userService = userService
    }

    login = async (req: Request, res: Response)=> {
        const {email, password} = req.body

        try {
            const token = await this.userService.getToken(email, password)

            return res.status(200).json({token: token})
        } catch(err) {
            return res.status(500).json({message: "Email ou senha errados"})
        }

       
    } 
}   