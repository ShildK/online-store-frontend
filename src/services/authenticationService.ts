import axios, { AxiosResponse } from "axios";
import { User } from "../types/user";
import { RegisterRequest } from "./models/registerRequest";
import { BACKEND_URL } from "../components/App/App";

export class AuthenticationService {
   async register(userData: RegisterRequest): Promise<Boolean> {
    try {
        const response = await axios.post(
            BACKEND_URL + "/register",
            JSON.stringify(userData),
            {
               headers: { "Content-Type": "application/json" },
            }
         );

         return response.status === 201;
      } catch (error) {
        if (error instanceof Error) {
            console.error("Login failed:", error.message);
        }
        return false;
      }
   }
   async login(mail: string, password: string): Promise<User | null> {
      try {
        this.logout();

        const response = await axios.post(
            BACKEND_URL + "/login",
            JSON.stringify({ mail: mail, password: password }),
            {
               headers: { "Content-Type": "application/json" },
            }
         );
   
         let user: User = JSON.parse(JSON.stringify(response.data));

         this._setUser(user);

         return user;

      } catch (error) {
        if (error instanceof Error) {
            console.error('Login failed:', error.message);
        }
        return null;
      }
   }
   _setUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
   }
   getUser(): User | null {
      let userLS = localStorage.getItem("user");
      if (userLS === null) return null;
      let user: User = JSON.parse(userLS);
      // let user = Object.assign(new User(), JSON.parse(userLS))
      return user;
   }
   logout() {
      localStorage.removeItem("user");
   }
}
