import { InvalidPhoneFormatException } from "./RegisterError";

export class PhoneNumber {
  private _cellPhone?: string;
  private _homePhone?: string;
  private _corporatePhone: string;

  constructor(corporatePhone: string, cellPhone?: string, homePhone?: string) {
    this.validatePhone(corporatePhone, 'corporate'); 
    this._corporatePhone = corporatePhone;

    if (cellPhone) {
      this.validatePhone(cellPhone, 'cell');
      this._cellPhone = cellPhone;
    }

    if (homePhone) {
      this.validatePhone(homePhone, 'home');
      this._homePhone = homePhone;
    }
  }

  private validatePhone(phone: string, type: 'cell' | 'home' | 'corporate'): void {
    const cellRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    const homeRegex = /^\(\d{2}\) \d{4}-\d{4}$/;
    const corporateRegex = /^\(\d{2}\) \d{4}-\d{4}$/;

    switch (type) {
      case 'cell':
        if (!cellRegex.test(phone)) {
          throw new InvalidPhoneFormatException('Invalid cell phone format');
        }
        break;
      case 'home':
        if (!homeRegex.test(phone)) {
          throw new InvalidPhoneFormatException('Invalid home phone format');
        }
        break;
      case 'corporate':
        if (!corporateRegex.test(phone)) {
          throw new InvalidPhoneFormatException('Invalid corporate phone format');
        }
        break;
    }
  }

  get cellPhone(): string | undefined {
    return this._cellPhone;
  }

  get homePhone(): string | undefined {
    return this._homePhone;
  }

  get corporatePhone(): string {
    return this._corporatePhone;
  }
}
