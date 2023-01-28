import Joi from "joi";

export const option = {
    abortEarly:
      false /* means if there's an error in the first keys, it'll takecare of the error 
                                first before moving on to the next error  */,
    errors: {
      wrap: { label: "" },
    },
};

export const loginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export const registerSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required()
});

export const transferSchema = Joi.object().keys({
  amount: Joi.number().required(),
  walletId: Joi.string().length(9).required().pattern( new RegExp('^[0-9]+$')),
  description: Joi.string().required(),
});

export const fundorWithdrawalSchema = Joi.object().keys({
  amount: Joi.number().required(),
  description: Joi.string().required(),
});