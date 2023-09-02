const joi = require("joi");
const validateUser = (req, res) => {
  const joischema = joi
    .object({
      UserId: joi.string().required(),
      UserName: joi.string().required(),
      Password: joi
        .string()
        .required()
        .regex(/[ -~]*[a-z][ -~]*/)
        .regex(/[ -~]*[A-Z][ -~]*/)
        .regex(/[ -~]*[0-9][ -~]*/)
        .regex(/[ -~]*(?=[ -~])[^0-9a-zA-Z][ -~]*/)
        .min(8)
        .max(16),
    })
    .options({ abortEarly: false });
  const response = joischema.validate(req.body);
  if (response.error) {
    res.status(422).send(response.error);
  } else {
    return true;
  }
};
module.exports = { validateUser };
