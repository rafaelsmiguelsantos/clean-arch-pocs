import { EmailAddress } from './EmailAddress';
import { PhoneNumber } from './PhoneNumber';
import { ValidationError } from "./RegisterError";

export enum PriorityLevel {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW'
}

export class Address {
    private _city: string;
    private _state: string;
    private _street: string;
    private _cep: string;

    constructor(city: string, state: string, street: string, cep: string) {
        this.validateAddress(city, state, street, cep);
        this._city = city;
        this._state = state;
        this._street = street;
        this._cep = cep;
    }

    private validateAddress(city: string, state: string, street: string, cep: string): void {
        if (!city || !state || !street || !cep) {
            throw new ValidationError("All address fields are required");
        }
        // Aqui, você pode adicionar validações mais específicas para cada campo, se necessário.
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get street(): string {
        return this._street;
    }

    get cep(): string {
        return this._cep;
    }
}

export class Company {
    private _id?: string;
    private _name: string;
    private _fictitiousName: string;
    private _phone: PhoneNumber;
    private _address: Address;
    private _priorityLevel: PriorityLevel;
    private _userId: string;
    private _emailCorporate: EmailAddress;
    private _cnpj: string;

    constructor(
        name: string,
        fictitiousName: string,
        phone: PhoneNumber,
        address: Address,
        priorityLevel: PriorityLevel,
        userId: string,
        emailCorporate: EmailAddress,
        cnpj: string,
        id?: string,
    ) {
        this.validate(fictitiousName, userId, cnpj);
        this._id = id;
        this._name = name;
        this._fictitiousName = fictitiousName;
        this._phone = phone;
        this._address = address;
        this._priorityLevel = priorityLevel;
        this._userId = userId;
        this._emailCorporate = emailCorporate;
        this._cnpj = cnpj;
    }

    private validate(fictitiousName: string, userId: string, cnpj: string) {
        if (!fictitiousName) {
            throw new ValidationError("Fictitious name cannot be empty.");
        }
        if (!userId) {
            throw new ValidationError("User ID cannot be empty.");
        }
        if (!cnpj) {
            throw new ValidationError("CNPJ cannot be empty.");
        }
    }

    // Getters
    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get fictitiousName(): string {
        return this._fictitiousName;
    }

    get phone(): PhoneNumber {
        return this._phone;
    }

    get address(): Address {
        return this._address;
    }

    get priorityLevel(): PriorityLevel {
        return this._priorityLevel;
    }

    get userId(): string {
        return this._userId;
    }

    get emailCorporate(): EmailAddress {
        return this._emailCorporate;
    }

    get cnpj(): string {
        return this._cnpj;
    }
}
