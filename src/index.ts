import { InvalidDataError } from './errors';
import { Rule, Dictionary } from './types';

export default class Validator {
	constructor(public rules: Dictionary<Rule<any>> = {}, public data: Dictionary<any> = {}) {}

	validate(raiseErrors: boolean = false): Dictionary<string> {
		const errors: Dictionary<string> = {};
		Object.keys(this.rules).forEach(key => {
			const rule = this.rules[key];
			const value = this.data[key];
			if (!(key in this.data)) {
				if (rule.required) {
					errors[key] = 'Required';
				}
			} else {
				const error = rule.validate(value);
				if (error !== null) {
					errors[key] = error;
				}
			}
		});
		if (raiseErrors && Object.keys(errors).length > 0) {
			throw new InvalidDataError(JSON.stringify(errors, null, 3));
		}
		return errors;
	}

	cleanedData(): Dictionary<any> {
		return Object.keys(this.rules).reduce((acc, key) => {
			const rule = this.rules[key];
			const value = rule.cleanedData();
			if (value !== null) {
				// @ts-ignore
				acc[key] = value;
			}
			return acc;
		}, {});
	}
}

export * from './types';
export * from './errors';
export { StringRule, IntegerRule, BooleanRule, JSONRule, ArrayRule, DateRule, FileRule, FloatRule } from './rules';
