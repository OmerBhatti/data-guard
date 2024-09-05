export class InvalidDataError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidDataError';
	}
}

export class InvalidTypeError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidTypeError';
	}
}
