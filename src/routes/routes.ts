import {Router} from 'express'
import UserController from '../controllers/UserController'

const router = Router()

const userController = new UserController()

router
    .get('/user', userController.getAllUsers)   
    .post("/user", userController.createUser)
    .delete('/user', userController.deleteUser)





export default router