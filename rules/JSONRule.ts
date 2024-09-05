import { InvalidTypeError } from '../errors';
import { Dictionary, Rule } from '../types';

export class JSONRule implements Rule<Dictionary<any>> {
	data: Dictionary<any> | null = null;

	constructor(public required: boolean = true, public rules: Dictionary<Rule<any>> = {}) {}

	validate(data: Dictionary<any> | null): string | null {
		this.data = data;
		if (this.required && this.data === null) {
			return 'Required';
		}
		if (this.data !== null) {
			Object.keys(this.rules).forEach(key => {
				const rule = this.rules[key];
				// @ts-ignore
				const error = rule.validate(this.data[key]);
				if (error !== null) {
					throw new InvalidTypeError(error);
				}
			});
		}
		return null;
	}

	cleanedData(): Dictionary<any> | null {
		if (this.data === null) {
			return null;
		}
		return this.data;
	}
}
