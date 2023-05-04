import express, {Request, Response, json} from 'express'
import UserController from './controllers/UserController'
import router from './routes/routes'

const app = express()
const PORT = 3000 || process.env.PORT

//tem que ser declarado antes das rotas

app.use(express.json(), router)

app.listen(PORT, ()=> {
    console.log(`Servidor está rodando em http://localhost:${PORT}`)
})


