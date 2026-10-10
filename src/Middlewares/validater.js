import { AppError } from "../errors/AppError.js";

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      console.log("Received body:", req.body);
      console.log("Zod errors:", result.error.issues);
      return next(
        new AppError("Zod caught invalid error", 400)
      );
    }

    req.body = result.data;
    next();
  };
}
