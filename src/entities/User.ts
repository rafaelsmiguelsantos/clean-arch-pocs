import { EmailAddress } from "./EmailAddress";
import { FullName } from "./FullName";
import { Password } from "./Password";
import { PhoneNumber } from "./PhoneNumber";
import { ValidationError } from "./RegisterError";

export class User {
  private id?: string; // Usando string como tipo, por exemplo, para UUIDs ou ObjectIDs do MongoDB
  private name: FullName;
  private email: EmailAddress;
  private password: Password;
  private phones: PhoneNumber[];  // Lista de telefones

  constructor(
    name: FullName,
    email: EmailAddress,
    password: Password,
    phones: PhoneNumber[],  // Lista de telefones como parâmetro
    id?: string
  ) {
    // Basic validations (we assume the value objects handle their internal validations)
    if (!name || !email || !password || !phones || phones.length === 0) {
      throw new ValidationError('Some required fields are missing.');
    }

    this.name = name;
    this.email = email;
    this.id = id;
    this.password = password;
    this.phones = phones;
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

  getPhones(): PhoneNumber[] {
    return this.phones;
  }
}
