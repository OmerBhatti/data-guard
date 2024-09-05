
import { InvalidTypeError } from "../errors";
import { Rule } from "../types";

export class BooleanRule implements Rule<boolean> {

    data: boolean|null = null;

    constructor(
        public required: boolean = true,
    ) {}

    validate(data: boolean|null): string|null {
        this.data = data;
        if (this.required && this.data === null) {
            return "Required";
        }
        return null;
    }

    cleanedData(): boolean|null {
        if (this.data === null) {
            return null;
        }
        if (typeof this.data === "string") {
            return this.data === "true";
        }
        else if (typeof this.data === "number") {
            return this.data === 1;
        }
        else if (typeof this.data === "boolean") {
            return this.data;
        }
        else {
            throw new InvalidTypeError("Invalid data type expected \"boolean\"");
        }
    }
}
