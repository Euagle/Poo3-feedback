
import { Request, Response } from "express"
import { UserDatabase } from "../UserDatabase"
import { User } from "../../models/User"
import { UserDB } from "../../types"
import { BaseDatabase } from "../BaseDatabase"



export class UserController{
    public getUsers = async(req: Request, res: Response) =>{

    try {
        const q = req.query.q as string | undefined

        const userDatabase = new UserDatabase()
        const usersDB = await userDatabase.findUsers(q)

        const users: User[] = usersDB.map((userDB) => new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
        ))   
        res.status(200).send(users) 
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
}
public createUser=async(req: Request, res: Response) =>{
    try {
        const { id, name, email, password } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser string")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser string")
        }

        if (typeof password !== "string") {
            res.status(400)
            throw new Error("'password' deve ser string")
        }

        const userDatabase = new UserDatabase()
        const userDBExists = await userDatabase.findUserById(id)

        if (userDBExists) {
            res.status(400)
            throw new Error("'id' já existe")
        }

        const newUser = new User(
            id,
            name,
            email,
            password,
        ) 

        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
        }

        await userDatabase.insertUser(newUserDB)

        res.status(201).send(newUser)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
}


  



public editUser = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        const userDatabase = new UserDatabase()
        const userDB = await userDatabase.editById(id)

        if (!userDB) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password
        )

       
        await userDatabase.editById(id)
        
        res.status(200).send(user)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
}

// public deletUser = async(req: Request, res: Response)=>{
//     try {
//         const idToDelete = req.params.id

//         const [ user ] = await  UserDatabase.(idToDelete).where({ id: idToDelete })

//         if (user) {
//             await UserDatabase.deletUser(idToDelete).del().where({ id: idToDelete })
//         } else {
//             res.status(404)
//             throw new Error("'id' não encontrada")
//         }

//         res.status(200).send({ message: "Usuário deletada com sucesso" })
//     } catch (error) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// }
}

