
import { Rule } from "../types";

export class StringRule implements Rule<string> {

    data: string|null = null;

    constructor(
        public required: boolean = true,
        public min: number|null = null,
        public max: number|null = null,
        public pattern: RegExp|null = null,
        public choices: string[] = [],
    ) {}

    validate(data: string|null): string|null {
        this.data = data;
        if (this.required && this.data === null || this.data === "") {
            return "Required";
        }
        if (this.data !== null && this.min !== null && this.data.length < this.min) {
            return `This field must be at least ${this.min}`;
        }
        if (this.data !== null && this.max !== null && this.data.length > this.max) {
            return `This field must be at most ${this.max}`;
        }
        if (this.data !== null && this.pattern !== null && !this.pattern.test(this.data)) {
            return `This field must match ${this.pattern}`;
        }
        if (this.data !== null && this.choices.length > 0 && !this.choices.includes(this.data)) {
            return `This field must be one of ${this.choices.join(", ")}`;
        }
        return null;
    }

    cleanedData(): string|null {
        if (this.data === null) {
            return null;
        }
        return this.data;
    }
}
