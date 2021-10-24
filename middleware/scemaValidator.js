function validateSchema (schema, paramsToValidate, res, next) {
  try {
    const { error } = schema.validate(paramsToValidate)
    if (error) return res.status(400).send('Bad request, data contains illegal field')
    next()
  } catch (error) {
    next(error)
  }
}

function requestSchemeValidator (schema) {
  return (req, res, next) => {
    return validateSchema(schema, req.body, res, next)
  }
}

function urlParamsSchemeValidator (schema) {
  return (req, res, next) => {
    return validateSchema(schema, req.params, res, next)
  }
}

module.exports = {
  urlParamsSchemeValidator,
  requestSchemeValidator
}
