interface Rule<T> {
	data?: T | null;
	required: boolean;

	validate(data: T | null): string | null;
	cleanedData(): T | null;
}

interface Dictionary<T> {
	[Key: string]: T;
}

export { Rule, Dictionary };
