import { Rule } from '../types';

export class FileRule implements Rule<File> {
	data: File | null = null;

	constructor(
		public required: boolean = true,
		public maxSize: number = 1024 * 1024 * 20, // 20 MB
		public accepts: string[] = [],
	) {}

	validate(data: File | null): string | null {
		this.data = data;
		if ((this.required && this.data === null)) {
			return 'Required';
		}
		if (this.data !== null && this.data.size > this.maxSize) {
			return `File size must be less than ${this.maxSize.toLocaleString()} bytes`;
		}
		if (this.data !== null && this.accepts.length > 0 && !this.accepts.includes(this.data.type)) {
			return `File type must be one of ${this.accepts.join(', ')}`;
		}
		return null;
	}

	cleanedData(): File | null {
		if (this.data === null) {
			return null;
		}
		return this.data;
	}
}
