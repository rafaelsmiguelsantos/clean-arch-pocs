export class FullName {
    private _firstName: string;
    private _lastName: string;
    private _middleName?: string;

    constructor(firstName: string, lastName: string, middleName?: string) {
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setMiddleName(middleName);
    }

    private validateName(name: string, fieldName: string): void {
        if (!name) {
            throw new Error(`${fieldName} cannot be empty.`);
        }
        if (name.length > 50) {
            throw new Error(`${fieldName} is too long.`);
        }
    }

    private setFirstName(name: string): void {
        this.validateName(name, 'First name');
        this._firstName = name;
    }

    private setLastName(name: string): void {
        this.validateName(name, 'Last name');
        this._lastName = name;
    }

    private setMiddleName(name?: string): void {
        if (name) {
            this.validateName(name, 'Middle name');
            this._middleName = name;
        }
    }

    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }

    get middleName(): string | undefined {
        return this._middleName;
    }
}
