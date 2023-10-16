export class Password {
  private readonly value: string;

  constructor(value: string) {
    // 6 Regras de validação
    if (!this.hasMinimumLength(value)) {
      throw new Error("Password must have a minimum length of 8 characters.");
    }
    if (!this.hasUppercase(value)) {
      throw new Error("Password must have at least one uppercase character.");
    }
    if (!this.hasLowercase(value)) {
      throw new Error("Password must have at least one lowercase character.");
    }
    if (!this.hasNumeric(value)) {
      throw new Error("Password must have at least one numeric character.");
    }
    if (!this.hasSpecialCharacter(value)) {
      throw new Error("Password must have at least one special character.");
    }
    if (!this.hasNoSpaces(value)) {
      throw new Error("Password must not have spaces.");
    }

    this.value = value;
  }

  // Validations
  private hasMinimumLength(value: string): boolean {
    return value.length >= 8;
  }
  private hasUppercase(value: string): boolean {
    return /[A-Z]/.test(value);
  }
  private hasLowercase(value: string): boolean {
    return /[a-z]/.test(value);
  }
  private hasNumeric(value: string): boolean {
    return /[0-9]/.test(value);
  }
  private hasSpecialCharacter(value: string): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(value);
  }
  private hasNoSpaces(value: string): boolean {
    return !/\s/.test(value);
  }

  getValue(): string {
    return this.value;
  }
}
