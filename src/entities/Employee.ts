import { EmailAddress } from "./EmailAddress";
import { FullName } from "./FullName";
import { Password } from "./Password";
import { PhoneNumber } from "./PhoneNumber";
import { ValidationError } from "./RegisterError";
import { Roles } from "./roles"; // 1. Importando o enum Roles

export class Employee {
  private id?: string; 
  private name: FullName;
  private email: EmailAddress;
  private password: Password;
  private phones: PhoneNumber[]; 
  private role: Roles; // 2. Adicionando o campo role
  private companyId: string;
  private userId: string;

  constructor(
    name: FullName,
    email: EmailAddress,
    password: Password,
    phones: PhoneNumber[],
    role: Roles,
    companyId: string,
    userId: string,
    id?: string
  ) {
    // 3. Validação do role
    if (!Object.values(Roles).includes(role)) {
      throw new ValidationError('Invalid role provided.');
    }

    if (!name || !email || !password || !phones || phones.length === 0 || !companyId || !userId) {
      throw new ValidationError('Some required fields are missing.');
    }

    this.name = name;
    this.email = email;
    this.id = id;
    this.password = password;
    this.phones = phones;
    this.role = role;
    this.companyId = companyId;
    this.userId = userId;
  }

  // Getter methods
  getName(): FullName {
    return this.name;
  }

  getEmail(): EmailAddress {
    return this.email;
  }

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

  // Getter para role
  getRole(): Roles {
    return this.role;
  }

  getCompanyId(): string {
    return this.companyId;
  }

  getUserId(): string {
    return this.userId;
  }
}
