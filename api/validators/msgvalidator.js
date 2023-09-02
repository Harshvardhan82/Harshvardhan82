const joi = require("joi");
const validatesendMsg = (req, res) => {
  const joischema = joi
    .object({
      Channel_id: joi.string().required(),
      phno: joi.array().required(),
      message: joi.string().required(),
    })
    .options({ abortEarly: false });
  const response = joischema.validate(req.body);
  if (response.error) {
    res.status(422).send(response.error);
  } else {
    return true;
  }
};
const validateviewMsg = (req, res) => {
  const joischema = joi
    .object({
      Channel_id: joi.string().required(),
      Ph_no: joi.string().required(),
    })
    .options({ abortEarly: false });
  const response = joischema.validate(req.body);
  if (response.error) {
    res.status(422).send(response.error);
  } else {
    return true;
  }
};
module.exports = { validatesendMsg, validateviewMsg };
