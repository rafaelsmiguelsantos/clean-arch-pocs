export class InvalidPhoneFormatException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class ExistingUserError extends Error {
    constructor(message: string = "User already exists") {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, ExistingUserError.prototype);
    }
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}
