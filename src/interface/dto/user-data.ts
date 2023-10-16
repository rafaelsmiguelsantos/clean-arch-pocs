import { ObjectId } from "mongodb";

export class UserData {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  _id?: string | ObjectId; 
}