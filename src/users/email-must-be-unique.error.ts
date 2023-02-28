export class EmailMustBeUniqueError extends Error {
  constructor(
    public value: string,
    message: string = `email '${value}' is already registered.`,
  ) {
    super(message);
    this.name = 'EmailMustBeUniqueError';
  }
}
