class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    console.log('AppError', statusCode);
    console.log('Stack', this.stack);

    switch (statusCode) {
      case 400:
        this.status = 'Bad Request';
        break;
      case 401:
        this.status = 'Unauthorized';
        break;
      case 404:
        this.status = 'Not found';
        break;
      case statusCode.startsWith('5'):
        this.status = 'Internal Server Error';
        break;
    }
    this.stackTrace = this.stack;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
