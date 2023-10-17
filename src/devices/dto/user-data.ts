import { ObjectId } from "mongodb";
import { Roles } from "src/entities/roles";
import { Phones } from "src/use-cases/dto/user-dto";

export class UserData {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  password: string;  // Adding the hashed password field (optional).
  phones: Phones[];
  _id?: string | ObjectId; 
  roles?: Roles;
}