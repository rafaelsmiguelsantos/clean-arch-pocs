import { EmailAddress } from "./EmailAddress";
import { FullName } from "./FullName";
import { ValidationError } from "./RegisterError";

export class User {
  private name: FullName;
  private email: EmailAddress;

  constructor(
    name: FullName,
    email: EmailAddress,
  ) {
    // Basic validations (we assume the value objects handle their internal validations)
    if (!name || !email) {
      throw new ValidationError('Some required fields are missing.');
    }

    this.name = name;
    this.email = email;
  }

  // Getter methods
  getName(): FullName {
    return this.name;
  }

  getEmail(): EmailAddress {
    return this.email;
  }
}
