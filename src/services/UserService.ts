interface IUser {
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
    static createUser = (name: string, email: string)=> {
        const user = {
            name: name,
            email: email
        }
        db.push(user)
        console.log(db)
    }

    static getAllUsers = (): IUser[] => {
        return db
    }

    static deleteUser = (user: IUser): void => {
        console.log("Deletand usuário... ", user)
    }
}

export default UserService