module.exports = {
  sendError: (res, error, message = error.message) => {
    console.log(error)
    res.status(500).send({ error: message })
  },
}
