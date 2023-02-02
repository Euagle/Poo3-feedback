import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";
import { UserController } from "./controller/UserController";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public async findUsers(q: string | undefined) {
        let usersDB

        if (q) {
            const result: UserDB[] = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .where("name", "LIKE", `%${q}%`)

            usersDB = result
        } else {
            const result: UserDB[] = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)

            usersDB = result
        }

        return usersDB
    }

    public async findUserById(id: string) {
        const [ userDB ]: UserDB[] | undefined[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ id })

        return userDB
    }

    public async insertUser(newUserDB: UserDB) {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(newUserDB)
    }
    
public async deletUser(id: string){
    await BaseDatabase
    .connection(UserDatabase.TABLE_USERS)
    .del()
    .where({id})
}
public async editById(id: string){
    const [userDB]: UserDB[] | undefined[] = await BaseDatabase
    .connection(UserDatabase.TABLE_USERS)
    .where({id})
return userDB
}
}
