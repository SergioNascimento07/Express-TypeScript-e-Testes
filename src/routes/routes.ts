import {Router} from 'express'
import UserController from '../controllers/UserController'
import { LoginController } from '../controllers/LoginController'
import { verifyAuth } from '../middleware/verifyAuth'

const router = Router()

const userController = new UserController()
const loginController = new LoginController()


router
    .get('/user', userController.getUsers) 
    .get("/user/:userId", verifyAuth, userController.getUser)  
    .post("/user", userController.createUser)
    .delete('/user', userController.deleteUser)
    .post("/login", loginController.login)




export default router