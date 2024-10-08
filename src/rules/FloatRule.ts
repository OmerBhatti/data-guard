import { InvalidTypeError } from '../errors';
import { Rule } from '../types';

export class FloatRule implements Rule<number> {
	data: number | null = null;

	constructor(
		public required: boolean = true,
		public precision: number = 2,
		public min: number | null = null,
		public max: number | null = null,
		public choices: number[] = []
	) {}

	validate(data: number | null): string | null {
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
		if (this.data !== null && this.choices.length > 0 && !this.choices.includes(this.data)) {
			return `This field must be one of ${this.choices.join(', ')}`;
		}
		if (this.data !== null) {
			const parsed = parseFloat(this.data.toString());
			if (typeof this.data !== 'number' && isNaN(parsed)) {
				throw new InvalidTypeError(
					`Invalid data type! expected \"number\" \n${JSON.stringify(this.data, null, 3)}`
				);
			}
		}
		return null;
	}

	cleanedData(): number | null {
		if (this.data === null) {
			return null;
		}
		const parsed = parseFloat(this.data.toString());
		this.data = parsed;
		return parseFloat(this.data.toFixed(this.precision));
	}
}
