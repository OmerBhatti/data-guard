import { InvalidTypeError } from '../errors';
import { Rule } from '../types';

export class DateRule implements Rule<Date> {
	data: Date | null = null;

	constructor(public required: boolean = true, public min: Date | null = null, public max: Date | null = null) {}

	validate(data: Date | null): string | null {
		this.data = data;
		if (this.required && this.data === null) {
			return 'Required';
		}
		if (this.data !== null && this.min !== null && this.data < this.min) {
			return `This field must be at least ${this.min}`;
		}
		if (this.data !== null && this.max !== null && this.data > this.max) {
			return `This field must be at most ${this.max}`;
		}
		if (this.data !== null) {
			const date = new Date(this.data);
			if (date.toString() === 'Invalid Date') {
				throw new InvalidTypeError(
					`Invalid data type! expected "date" or "number" or "string"\n${JSON.stringify(this.data, null, 3)}`
				);
			}
		}
		return null;
	}

	cleanedData(): Date | null {
		if (this.data === null) {
			return null;
		}
		return new Date(this.data);
	}
}
