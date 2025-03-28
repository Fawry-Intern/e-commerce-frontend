import { UserRole } from "../../enums/user-role.enum";

export interface UserDetails{
    id:Number,
    username:String,
    email:String,
    isActive:Boolean,
    role:UserRole
}


