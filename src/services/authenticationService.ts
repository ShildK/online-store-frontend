import { User } from "../types/user";
import { RegisterRequest } from "./models/registerRequest";

export class AuthenticationService {
    register(userData: RegisterRequest): Boolean {
        //TODO: добавить backend

        return true;
    }
    authorize(mail: string, password: string): User{
        let user = new User()
        user.name = "Karina"
        user.token = "karina"

        localStorage.setItem("user", JSON.stringify(user))

        return user
    }
    getUser(): User | null {
        let userLS = localStorage.getItem("user") 
        if(userLS === null) return null
        let user = Object.assign(new User(), JSON.parse(userLS))
        return user
    }
    logout(){
        localStorage.removeItem("user")
    }
}