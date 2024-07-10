import Joi from 'joi'

const addCarSchema = Joi.object(
    {
        carModelId: Joi.string().required()
            .messages({ 'string.empty': 'Model is required' }),
        branchId: Joi.string().required()
            .messages({ 'string.empty': 'Branch is required' }),
        status: Joi.string().required()
            .messages({ 'string.empty': 'Status is required' }),
        useDate: Joi.string().required()
            .messages({ 'string.empty': 'UseDate is required' }),
        licensePlate: Joi.string().required().max(13)
            .messages(
                {
                    'string.empty': 'LicensePlate is required',
                    'string.max': 'LicensePlate must be 1-13 character',
                },
            )
    }
)

const validateAddCarsInfo = input => {
    const { value, error } = addCarSchema.validate(input, { abortEarly: false });
    if (error) {
        const result = error.details.reduce((acc, item) => {
            acc[item.path[0]] = item.message;
            return acc
        }, {})
        return result
    }
}

export default validateAddCarsInfo