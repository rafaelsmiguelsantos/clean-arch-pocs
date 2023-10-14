export class Address {
    private street: string;
    private city: string;
    private state: string;
    private postalCode: string;
    private country: string;
  
    constructor(
      street: string,
      city: string,
      state: string,
      postalCode: string,
      country: string,
    ) {
      this.street = this.validateField(street, 5, 255, 'Street');
      this.city = this.validateField(city, 2, 100, 'City');
      this.state = this.validateField(state, 2, 50, 'State');
      this.postalCode = this.validateField(postalCode, 4, 12, 'Postal code');
      this.country = this.validateField(country, 2, 50, 'Country');
    }
  
    private validateField(fieldValue: string, minLength: number, maxLength: number, fieldName: string): string {
      if (!fieldValue || fieldValue.length < minLength) {
        throw new Error(`${fieldName} must be at least ${minLength} characters long.`);
      }
  
      if (fieldValue.length > maxLength) {
        throw new Error(`${fieldName} cannot exceed ${maxLength} characters.`);
      }
  
      return fieldValue;
    }
  }
  