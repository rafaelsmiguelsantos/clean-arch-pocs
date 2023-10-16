import { EmailAddress } from "./EmailAddress";
import { FullName } from "./FullName";
import { Password } from "./Password";
import { ValidationError } from "./RegisterError";

export class User {
  private id?: string; // Usando string como tipo, por exemplo, para UUIDs ou ObjectIDs do MongoDB
  private name: FullName;
  private email: EmailAddress;
  private password: Password;

  constructor(
    name: FullName,
    email: EmailAddress,
    password: Password,
    id?: string
  ) {
    // Basic validations (we assume the value objects handle their internal validations)
    if (!name || !email) {
      throw new ValidationError('Some required fields are missing.');
    }

    this.name = name;
    this.email = email;
    this.id = id;
    this.password = password;
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

  setId(id: string): void {
    this.id = id;
  }

  getPassword(): Password {
    return this.password;
  }

  setPassword(password: Password): void {
    this.password = password;
  }
}
