import { InvalidTypeError } from '../errors';
import { Rule } from '../types';

export class ArrayRule<T> implements Rule<Array<T>> {
	data: Array<T> | null = null;

	constructor(public rule: Rule<T>, public required: boolean = true) {}

	validate(data: Array<T> | null): string | null {
		this.data = data;
		if ('rule' in this.rule && !Array.isArray(this.data)) {
			throw new InvalidTypeError('Array dimension mismatch');
		}
		if ((this.required && this.data === null) || this.data?.length === 0) {
			return 'Required';
		}
		if (this.data !== null) {
			if (Array.isArray(this.data)) {
				for (let i = 0; i < this.data.length; i++) {
					const error = this.rule.validate(this.data[i]);
					if (error !== null) {
						return error;
					}
				}
			} else {
				const error = this.rule.validate(this.data);
				if (error !== null) {
					return error;
				}
			}
		}
		return null;
	}

	cleanedData(): Array<T> | null {
		if (this.data === null) {
			return null;
		}
		return this.data;
	}
}
