export class InvalidDataError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidDataError";
    }
}

export class DataAccessError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DataAccessError";
    }
}
