export class EmailMustBeUniqueError extends Error {
  constructor(
    public value: string,
    message = `email '${value}' is already registered.`,
  ) {
    super(message);
    this.name = 'EmailMustBeUniqueError';
  }
}
