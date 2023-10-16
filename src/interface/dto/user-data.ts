import { ObjectId } from "mongodb";

export class UserData {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  password: string;  // Adding the hashed password field (optional).
  _id?: string | ObjectId; 
}