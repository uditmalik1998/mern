const CustomAPIError = require('../error/custom-error');

const errorHandlerMiddleware = (err, req, res, next) => {
      console.log(err);
      if (err instanceof CustomAPIError) {
            return res.status(err.statusCode).json({ error: err.message })
      }
      if (err.errors) {
            const errorResponse = Object.values(err.errors).map((item) => item.message);
            return res.status(400).json({ error: errorResponse.join(", ") })
      }
      if (err.code === 11000) {
            return res.status(500).json({ error: "Email Addresss is Already Register..." });
      }
      return res
            .status(500)
            .json({ error:err })
}

module.exports = errorHandlerMiddleware