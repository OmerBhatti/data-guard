import { Rule, Dictionary } from "./types";

export default class Validator {

    constructor(
        public data: Dictionary<any> = {},
        public rules: Dictionary<Rule<any>> = {},
    ) {}

    validate(): Dictionary<string> {
        const errors: Dictionary<string> = {};
        Object.keys(this.rules).forEach((key) => {
            const rule = this.rules[key];
            const value = this.data[key];
            if (!(key in this.data)) {
                if (rule.required) {
                    errors[key] = "Required";
                }
            }
            else {
                const error = rule.validate(value);
                if (error !== null) {
                    errors[key] = error;
                }
            }
        });
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
