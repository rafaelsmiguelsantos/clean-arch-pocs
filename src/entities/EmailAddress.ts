import { ValidationError } from "./RegisterError";

export class EmailAddress {
  private _email: string;

  constructor(email: string) {
    this.validateEmail(email);
    this._email = email;
  }

  private validateEmail(email: string): void {
    // Uma expressão regular simples para validar formatos comuns de e-mail
    // Observação: Não cobre todos os casos possíveis de e-mails válidos, mas é suficiente para muitos casos.
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    if (!emailRegex.test(email)) {
      throw new ValidationError('Invalid email format');
    }
  }

  get email(): string {
    return this._email;
  }

  getValue(): string {
    return this._email;
  }
}

