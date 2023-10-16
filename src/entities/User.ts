import { EmailAddress } from "./EmailAddress";
import { FullName } from "./FullName";
import { ValidationError } from "./RegisterError";

export class User {
  private id?: string; // Usando string como tipo, por exemplo, para UUIDs ou ObjectIDs do MongoDB
  private name: FullName;
  private email: EmailAddress;

  constructor(
    name: FullName,
    email: EmailAddress,
    id?: string
  ) {
    // Basic validations (we assume the value objects handle their internal validations)
    if (!name || !email) {
      throw new ValidationError('Some required fields are missing.');
    }

    this.name = name;
    this.email = email;
    this.id = id;
  }

  // Getter methods
  getName(): FullName {
    return this.name;
  }

  getEmail(): EmailAddress {
    return this.email;
  }

  // Getter methods
  getId(): string | undefined {
    return this.id;
  }

  // Setter method for ID, in case you want to set it after instantiation
  setId(id: string): void {
    this.id = id;
  }
}
