
import { Rule } from "../types";

export class IntegerRule implements Rule<number> {
    data: number|null = null;

    constructor(
        public required: boolean = true,
        public min: number|null = null,
        public max: number|null = null
    ) {}

    validate(data: number|null): string|null {
        this.data = data;
        // @ts-ignore: Object is possibly 'null'.
        if (this.required && this.data === null) {
            return "Required";
        }
        if (this.data !== null && this.min !== null && this.data < this.min) {
            return `This field must be at least ${this.min}`;
        }
        // @ts-ignore: Object is possibly 'null'.
        if (this.data !== null && this.max !== null && this.data > this.max) {
            return `This field must be at most ${this.max}`;
        }
        return null;
    }

    cleanedData(): number|null {
        return this.data;
    }
}
