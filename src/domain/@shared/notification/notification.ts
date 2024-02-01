export type NotificationErrorProps = {
  message: string;
  context: string;
};

export class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  messages(context?: string): string {
    return this.errors
      .filter((error) => (context ? error.context === context : true))
      .map((error) => `${error.context}: ${error.message},`)
      .join("");
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors() {
    return this.errors;
  }
}
