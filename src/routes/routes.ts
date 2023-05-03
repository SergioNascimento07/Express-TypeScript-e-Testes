import {Router} from 'express'
import UserController from '../controllers/UserController'

const router = Router()

router
    .get('/user', UserController.getAllUsers)   
    .post("/user", UserController.createUser)
    .delete('/user', UserController.deleteUser)





export default router