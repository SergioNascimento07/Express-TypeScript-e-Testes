export interface IUser {
    name: string,
    email: string
}

const db: IUser[] = [
    {
        name: "Joana",
        email: "joana@dio.com"
    }
]

class UserService {
    public db: IUser[]

    public constructor(database=db) {
        this.db = database
    }

    createUser = (name: string, email: string)=> {
        const user = {
            name: name,
            email: email
        }
        this.db.push(user)
        console.log("Db atualizado... ", this.db)
    }

    getAllUsers = (): IUser[] => {
        return this.db
    }

    deleteUser = (user: IUser): void => {
        console.log("Deletand usuário... ", user)
    }
}

export default UserService