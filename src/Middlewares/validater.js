import { AppError } from "../errors/AppError.js";

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError("What the hell was that??", 400)
      );
    }

    req.body = result.data;
    next();
  };
}