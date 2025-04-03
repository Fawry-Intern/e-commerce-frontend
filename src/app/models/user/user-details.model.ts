import { UserRole } from "../../enums/user-role.model";

export interface UserDetails{
    id:Number,
    firstName:String,
    lastName:String,
    email:String,
    isActive:Boolean,
    role:UserRole
}


