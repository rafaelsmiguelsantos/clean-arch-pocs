import { BadRequestException } from "@nestjs/common";
import { ExistingUserError, InvalidPhoneFormatException, ValidationError } from "src/entities/RegisterError";

export class ErrorHandler {

	static handle(error: Error): never {
		if (error instanceof ExistingUserError) {
			throw new BadRequestException(error.message);
		} else if (error instanceof ValidationError) {
			throw new BadRequestException(error.message);
		} else if (error instanceof InvalidPhoneFormatException) {
			throw new BadRequestException(error.message);
		} else if (error.message && error.message.includes('input must be a 24 character hex string')) {
			throw new BadRequestException(error.message);
		}
		else {
			throw new BadRequestException("Unexpected error");
		}
	}
}

