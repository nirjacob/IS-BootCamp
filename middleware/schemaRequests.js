function validateSchema (schema, paramsToValidate, res, next) {
  try {
    const { error } = schema.validate(paramsToValidate)
    if (error) throw error
    next()
  } catch (error) {
    console.error(`Error : ${error.stack}`)
    res.status(400).send(`${error.message}`)
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