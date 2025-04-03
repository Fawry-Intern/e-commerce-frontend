import { DayOfWeek } from "../../enums/day-of-weak.model";

export interface DeliveryPersonCreationDetails{

  firstName:String,
  lastName:String,
  email:String,
  address:String,
  phoneNumber:String,
  password:String,
  workDays: DayOfWeek[];
}
