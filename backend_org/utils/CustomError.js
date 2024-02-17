// will handle operational errors -> errors that can be predicted

export class CustomError extends Error {
  //fail -> client side mistake hapenning
  //error -> server side error happening

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true;

    //capture the stacktrace using already existing method in Error class
    //takes the current obj and custom error class as parameters
    Error.captureStackTrace(this, this.constructor);
  }
}
